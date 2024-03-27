# activities-rs

Ergonomic Rust bindings to the [Discord Embedded App SDK](https://github.com/discord/embedded-app-sdk).

## Work in Progress

- [x] Basic bindings
- [x] Authorization flow
- [ ] Event handlers
- [ ] Other Commands
- [ ] Macros to reduce need for boilerplate

## Example Usage

```rust
use activity::*;
use std::mem::forget;

#[activity]
pub async fn start() -> Result<(), JsValue> {
    console_log!("Starting activity...");

    let sdk = DiscordSDK::new("914869961279819796")?;
    sdk.ready().await?;

    console_log!("Activity ready!");

    authenticate_user(&sdk).await?;

    let s = sdk
        .subscribe(
            "VOICE_STATE_UPDATE",
            |e: VoiceStateUpdateEvent| {
                console_log!("Voice state update: {:?}", e);
                Ok(())
            },
            SubscribeArgs::channel_id("1139202528517558332"),
        )
        .await?;

    // When the subscription is dropped, the event will be unsubscribed
    forget(s);

    Ok(())
}

async fn authenticate_user(sdk: &DiscordSDK) -> Result<(), JsValue> {
    let res = sdk
        .authorize(AuthorizeCommandArgs {
            client_id: "914869961279819796".to_string(),
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
