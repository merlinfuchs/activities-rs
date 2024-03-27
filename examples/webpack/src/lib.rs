use activity::*;
use std::option_env;
use wasm_bindgen::prelude::*;

#[activity]
pub async fn start() -> Result<(), JsValue> {
    console_log!("Starting activity...");

    let client_id = option_env!("CLIENT_ID").expect("CLIENT_ID environment variable must be set");
    let sdk = DiscordSDK::new(client_id)?;
    sdk.ready().await?;

    console_log!("Activity ready!");

    Ok(())
}
