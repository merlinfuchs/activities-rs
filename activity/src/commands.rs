use wasm_bindgen::JsValue;

use crate::{
    AuthenticateCommandArgs, AuthenticateCommandRes, AuthorizeCommandArgs, AuthorizeCommandRes,
};

pub async fn authorize(args: AuthorizeCommandArgs) -> Result<AuthorizeCommandRes, JsValue> {
    let args_value = serde_wasm_bindgen::to_value(&args)?;

    activity_sys::glue::sdk_commands_authorize(args_value)
        .await
        .map_err(|e| e.into())
        .map(|res| serde_wasm_bindgen::from_value(res).unwrap())
}

pub async fn authenticate(
    args: AuthenticateCommandArgs,
) -> Result<AuthenticateCommandRes, JsValue> {
    let args_value = serde_wasm_bindgen::to_value(&args)?;

    activity_sys::glue::sdk_commands_authenticate(args_value)
        .await
        .map_err(|e| e.into())
        .map(|res| serde_wasm_bindgen::from_value(res).unwrap())
}
