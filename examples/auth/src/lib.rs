use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

use activity::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, Response};

#[activity]
pub async fn start() -> Result<(), JsValue> {
    console_log!("Initializing");
    // activity::create("914869961279819796").await?;
    Ok(())
}

/*#[event(ready)]
pub async fn on_ready(e: ReadyEvent) -> Result<(), JsValue> {
    console_log!("Ready: {:?}", e);

    let res = activity::commands::authorize(AuthorizeCommandArgs {
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

    let access_token = exchange_token(&res.code).await?;

    let res = activity::commands::authenticate(AuthenticateCommandArgs { access_token }).await?;

    console_log!("Authenticated user: {:?}", res.user);

    return Ok(());
}

#[event(error)]
pub async fn on_error(e: ErrorEvent) -> Result<(), JsValue> {
    console_log!("Error: {:?}", e);
    Ok(())
}

#[event(voice_state_update)]
pub async fn on_voice_state_update(e: VoiceStateUpdateEvent) -> Result<(), JsValue> {
    console_log!("Voice state update: {:?}", e);
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
*/
