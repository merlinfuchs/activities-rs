# activities-rs

Eronomic Rust bindings to the [Discord Embedded App SDK](https://github.com/discord/embedded-app-sdk). Not a single line of JavaScript needed!

## Example Usage

```rust
use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

use activity::{console_log, AuthenticateCommandArgs, AuthorizeCommandArgs, DiscordSDK};

#[wasm_bindgen(start)]
pub async fn start() -> Result<(), JsValue> {
    let sdk = DiscordSDK::new("...")?;

    sdk.ready().await?;
    console_log!("Ready!");

    let res = sdk.authorize(AuthorizeCommandArgs{
        client_id: "...".to_string(),
        response_type: "code".to_string(),
        state: "".to_string(),
        prompt: "none".to_string(),
        scope: vec!["identify".to_string(), "guilds".to_string()],
    }).await?;

    let access_token = exchange_token(&res.code).await?;

    let res = sdk.authenticate(AuthenticateCommandArgs{
        access_token,
    }).await?;

    console_log!("Authenticated user: {:?}", res.user);

    Ok(())
}
```
