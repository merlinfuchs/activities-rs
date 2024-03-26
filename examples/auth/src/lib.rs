use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

use activity::{console_log, AuthenticateCommandArgs, AuthorizeCommandArgs, DiscordSDK};
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, Response};

#[wasm_bindgen(start)]
pub async fn start() -> Result<(), JsValue> {
    let sdk = DiscordSDK::new("914869961279819796")?;

    sdk.ready().await?;

    console_log!("Ready!");

    let res = sdk.authorize(AuthorizeCommandArgs{
        client_id: "914869961279819796".to_string(),
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

async fn exchange_token(code: &str) -> Result<String, JsValue> {
    let req_value = serde_json::to_string(&TokenExchangeReq{
        code: code.to_string(),
    }).unwrap();

    let mut opts = RequestInit::new();
    opts
        .method("POST")
        .body(Some(&JsValue::from_str(&req_value)));

    let req = Request::new_with_str_and_init("/api/auth/exchange", &opts)?;
    req.headers()
        .set("Content-Type", "application/json")?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&req)).await?;

    let resp: Response = resp_value.dyn_into().unwrap();

    let json = JsFuture::from(resp.json()?).await?;

    let resp: TokenExchangeResp = serde_wasm_bindgen::from_value(json)?;
    if !resp.success {
        return Err(JsValue::from_str("Failed to exchange token"));
    }

    return Ok(resp.data.access_token)
}

#[derive(Serialize, Deserialize, Debug, Default)]
struct TokenExchangeReq {
    code: String
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