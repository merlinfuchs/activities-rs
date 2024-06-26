use std::{mem::forget, option_env};

use serde::{Deserialize, Serialize};

use activity::*;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, Response};

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

    // When the closure is dropped, the event will be unsubscribed
    forget(s);

    let s = sdk
        .subscribe(
            |e: SpeakingStartEvent| {
                console_log!("Speaking start: {:?}", e);
                Ok(())
            },
            SubscribeArgs::channel_id(sdk.channel_id().unwrap()),
        )
        .await?;

    forget(s);

    let s = sdk
        .subscribe(
            |e: SpeakingStopEvent| {
                console_log!("Speaking stop: {:?}", e);
                Ok(())
            },
            SubscribeArgs::channel_id(sdk.channel_id().unwrap()),
        )
        .await?;

    forget(s);

    Ok(())
}

async fn authenticate_user(sdk: &DiscordSDK) -> Result<(), JsValue> {
    let res = sdk
        .authorize(AuthorizeArgs {
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

    let access_token = exchange_token(&res.code).await?;

    let res = sdk.authenticate(AuthenticateArgs { access_token }).await?;

    console_log!("Authenticated user: {:?}", res.user);

    Ok(())
}

async fn exchange_token(code: &str) -> Result<String, JsValue> {
    let req_value = serde_json::to_string(&TokenExchangeReq {
        code: code.to_string(),
    })
    .unwrap();

    let mut opts = RequestInit::new();
    opts.method("POST")
        .body(Some(&JsValue::from_str(&req_value)));

    // You must host this endpoint yourself
    let req = Request::new_with_str_and_init("/api/auth/exchange", &opts)?;
    req.headers().set("Content-Type", "application/json")?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&req)).await?;

    let resp: Response = resp_value.dyn_into().unwrap();

    let json = JsFuture::from(resp.json()?).await?;

    let resp: TokenExchangeResp = serde_wasm_bindgen::from_value(json)?;
    if !resp.success {
        return Err(JsValue::from_str("Failed to exchange token"));
    }

    return Ok(resp.data.access_token);
}

#[derive(Serialize, Deserialize, Debug, Default)]
struct TokenExchangeReq {
    code: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
struct TokenExchangeResp {
    success: bool,
    data: TokenExchangeRespData,
}

#[derive(Serialize, Deserialize, Debug, Default)]
struct TokenExchangeRespData {
    access_token: String,
}
