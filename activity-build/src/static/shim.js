import init, { start } from "./index_bg.js";

async function main() {
  await init("/index_bg.wasm");
  start();
}

main();
