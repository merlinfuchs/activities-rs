// Taken from https://github.com/cloudflare/workers-rs/blob/main/worker-build/src/install.rs
// Credits to the original authors.

use std::{
    env::{self, VarError},
    ffi::OsStr,
    fs::{self, File},
    io::{Read, Write},
    path::{Path, PathBuf},
    process::{Command, Stdio},
};

use anyhow::Result;

const OUT_DIR: &str = "build";
const OUT_NAME: &str = "index";
const ACTIVITY_SUBDIR: &str = "activity";

const SDK_IMPORT: &str = "@discord/embedded-app-sdk";

const SDK_IMPORT_REPLACEMENT: &str = "./sdk";

mod install;

pub fn main() -> Result<()> {
    // Our tests build the bundle ourselves.
    if !cfg!(test) {
        install::ensure_wasm_pack()?;
        wasm_pack_build(env::args_os().skip(1))?;
    }

    let with_coredump = env::var("COREDUMP").is_ok();
    if with_coredump {
        println!("Adding wasm coredump");
        wasm_coredump()?;
    }

    let esbuild_path = install::ensure_esbuild()?;

    create_activity_dir()?;
    copy_generated_code_to_activity_dir()?;
    replace_sdk_import()?;

    write_string_to_file(activity_path("shim.js"), include_str!("./static/shim.js"))?;
    write_string_to_file(activity_path("sdk.js"), include_str!("./static/sdk.js"))?;
    write_string_to_file(
        activity_path("index.html"),
        include_str!("./static/index.html"),
    )?;

    bundle(&esbuild_path)?;

    remove_unused_js()?;

    Ok(())
}

const INSTALL_HELP: &str = "In case you are missing the binary, you can install it using: `cargo install wasm-coredump-rewriter`";

fn wasm_coredump() -> Result<()> {
    let coredump_flags = env::var("COREDUMP_FLAGS");
    let coredump_flags: Vec<&str> = if let Ok(flags) = &coredump_flags {
        flags.split(' ').collect()
    } else {
        vec![]
    };

    let mut child = Command::new("wasm-coredump-rewriter")
        .args(coredump_flags)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .spawn()
        .map_err(|err| {
            anyhow::anyhow!("failed to spawn wasm-coredump-rewriter: {err}\n\n{INSTALL_HELP}.")
        })?;

    let input_filename = output_path("index_bg.wasm");

    let input_bytes = {
        let mut input = File::open(input_filename.clone())
            .map_err(|err| anyhow::anyhow!("failed to open input file: {err}"))?;

        let mut input_bytes = Vec::new();
        input
            .read_to_end(&mut input_bytes)
            .map_err(|err| anyhow::anyhow!("failed to open input file: {err}"))?;

        input_bytes
    };

    {
        let child_stdin = child.stdin.as_mut().unwrap();
        child_stdin
            .write_all(&input_bytes)
            .map_err(|err| anyhow::anyhow!("failed to write input file to rewriter: {err}"))?;
        // Close stdin to finish and avoid indefinite blocking
    }

    let output = child
        .wait_with_output()
        .map_err(|err| anyhow::anyhow!("failed to get rewriter's status: {err}"))?;

    if output.status.success() {
        // Open the input file again with truncate to write the output
        let mut f = fs::OpenOptions::new()
            .truncate(true)
            .write(true)
            .open(input_filename)
            .map_err(|err| anyhow::anyhow!("failed to open output file: {err}"))?;
        f.write_all(&output.stdout)
            .map_err(|err| anyhow::anyhow!("failed to write output file: {err}"))?;

        Ok(())
    } else {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let stderr = String::from_utf8_lossy(&output.stderr);
        Err(anyhow::anyhow!(format!(
            "failed to run Wasm coredump rewriter: {stdout}\n{stderr}"
        )))
    }
}

fn wasm_pack_build<I, S>(args: I) -> Result<()>
where
    I: IntoIterator<Item = S>,
    S: AsRef<OsStr>,
{
    let exit_status = Command::new("wasm-pack")
        .arg("build")
        .arg("--no-typescript")
        .args(["--target", "web"])
        .args(["--out-dir", OUT_DIR])
        .args(["--out-name", OUT_NAME])
        .args(args)
        .spawn()?
        .wait()?;

    match exit_status.success() {
        true => Ok(()),
        false => anyhow::bail!("wasm-pack exited with status {}", exit_status),
    }
}

fn create_activity_dir() -> Result<()> {
    // create a directory for our activity to live in
    let activity_dir = PathBuf::from(OUT_DIR).join(ACTIVITY_SUBDIR);

    // remove anything that already exists
    if activity_dir.is_dir() {
        fs::remove_dir_all(&activity_dir)?
    } else if activity_dir.is_file() {
        fs::remove_file(&activity_dir)?
    };

    // create an output dir
    fs::create_dir(activity_dir)?;

    Ok(())
}

fn copy_generated_code_to_activity_dir() -> Result<()> {
    let glue_src = output_path(format!("{OUT_NAME}.js"));
    let glue_dest = activity_path(format!("{OUT_NAME}_bg.js"));

    let wasm_src = output_path(format!("{OUT_NAME}_bg.wasm"));
    let wasm_dest = activity_path(format!("{OUT_NAME}_bg.wasm"));

    // wasm-bindgen supports adding arbitrary JavaScript for a library, so we need to move that as well.
    // https://rustwasm.github.io/wasm-bindgen/reference/js-snippets.html
    let snippets_src = output_path("snippets");
    let snippets_dest = activity_path("snippets");

    for (src, dest) in [
        (glue_src, glue_dest),
        (wasm_src, wasm_dest),
        (snippets_src, snippets_dest),
    ] {
        if !src.exists() {
            continue;
        }

        fs::rename(src, dest)?;
    }

    Ok(())
}

// Replaces the import of the official SDK with the local one.
fn replace_sdk_import() -> Result<()> {
    let bindgen_glue_path = activity_path(format!("{OUT_NAME}_bg.js"));
    let old_bindgen_glue = read_file_to_string(&bindgen_glue_path)?;
    let fixed_bindgen_glue = old_bindgen_glue.replace(SDK_IMPORT, SDK_IMPORT_REPLACEMENT);
    write_string_to_file(bindgen_glue_path, fixed_bindgen_glue)?;
    Ok(())
}

// Bundles the snippets and activity-related code into a single file.
fn bundle(esbuild_path: &Path) -> Result<()> {
    let no_minify = !matches!(env::var("NO_MINIFY"), Err(VarError::NotPresent));
    let path = PathBuf::from(OUT_DIR)
        .join(ACTIVITY_SUBDIR)
        .canonicalize()?;
    let esbuild_path = esbuild_path.canonicalize()?;
    let mut command = Command::new(esbuild_path);
    command.args([
        "--format=iife",
        "--bundle",
        "./shim.js",
        "--outfile=index.js",
    ]);

    if !no_minify {
        command.arg("--minify");
    }

    let exit_status = command.current_dir(path).spawn()?.wait()?;

    match exit_status.success() {
        true => Ok(()),
        false => anyhow::bail!("esbuild exited with status {}", exit_status),
    }
}

// After bundling there's no reason why we'd want to upload our now un-used JavaScript so we'll
// delete it.
fn remove_unused_js() -> Result<()> {
    let snippets_dir = activity_path("snippets");

    if snippets_dir.exists() {
        std::fs::remove_dir_all(&snippets_dir)?;
    }

    for to_remove in [
        format!("{OUT_NAME}_bg.js"),
        "shim.js".into(),
        "sdk.js".into(),
    ] {
        std::fs::remove_file(activity_path(to_remove))?;
    }

    Ok(())
}

fn read_file_to_string<P: AsRef<Path>>(path: P) -> Result<String> {
    let file_size = path.as_ref().metadata()?.len().try_into()?;
    let mut file = File::open(path)?;
    let mut buf = Vec::with_capacity(file_size);
    file.read_to_end(&mut buf)?;
    String::from_utf8(buf).map_err(anyhow::Error::from)
}

fn write_string_to_file<P: AsRef<Path>>(path: P, contents: impl AsRef<str>) -> Result<()> {
    let mut file = File::create(path)?;
    file.write_all(contents.as_ref().as_bytes())?;

    Ok(())
}

pub fn activity_path(name: impl AsRef<str>) -> PathBuf {
    PathBuf::from(OUT_DIR)
        .join(ACTIVITY_SUBDIR)
        .join(name.as_ref())
}

pub fn output_path(name: impl AsRef<str>) -> PathBuf {
    PathBuf::from(OUT_DIR).join(name.as_ref())
}
