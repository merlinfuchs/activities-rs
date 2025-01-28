# activities-rs

Ergonomic Rust bindings to the [Discord Embedded App SDK](https://github.com/discord/embedded-app-sdk).

## Features

Currently bundled SDK version: `1.9.0`.

- [x] Support for all commands
- [x] Support for all events
- [x] No JS required

## Example Usage

```rust
use activity::*;
use std::{mem::forget, option_env};

#[activity]
pub async fn start() -> Result<(), JsValue> {
    console_log!("Starting activity...");

    let client_id = option_env!("CLIENT_ID").expect("CLIENT_ID environment variable must be set");
    let sdk = DiscordSDK::new(client_id)?;
    sdk.ready().await?;

    console_log!("Activity ready!");

    authenticate_user(&sdk).await?;

    let s = sdk
        .subscribe(
            |e: VoiceStateUpdateEvent| {
                console_log!("Voice state update: {:?}", e);
                Ok(())
            },
            SubscribeArgs::channel_id(sdk.channel_id().unwrap()),
        )
        .await?;

    // When the subscription is dropped, the event will be unsubscribed
    forget(s);

    Ok(())
}

async fn authenticate_user(sdk: &DiscordSDK) -> Result<(), JsValue> {
    let res = sdk
        .authorize(AuthorizeCommandArgs {
            client_id: sdk.client_id(),
            response_type: "code".to_string(),
            state: "".to_string(),
            prompt: "none".to_string(),
            scope: vec![
                "identify".to_string(),
                "guilds".to_string(),
                "rpc.voice.read".to_string(),
            ],
        })
        .await?;

    // The token exchange must happen through your own server. Implement this yourself!
    let access_token = exchange_token(&res.code).await?;

    let res = sdk
        .authenticate(AuthenticateCommandArgs { access_token })
        .await?;

    console_log!("Authenticated user: {:?}", res.user);

    Ok(())
}
```

## Compiling an Activity

There is a build tool that makes it really easy to compile and bundle Rust activities. The finished bundle will be located in `build/activity`.

Alternatively you can also use webpack with the wasm-pack plugin. See the [webpack example](examples/webpack).

```shell
# Install the build tool
cargo install activity-build

# Set env vars
export CLIENT_ID=1234567890

# Run it in the directory where your `Cargo.toml` is located
activity-build --release
```
