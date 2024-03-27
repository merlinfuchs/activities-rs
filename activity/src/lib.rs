pub mod commands;
mod errors;
mod types;

pub use activity_sys;
pub use serde_wasm_bindgen;
pub use wasm_bindgen;
pub use wasm_bindgen_futures;

pub use activity_macros::*;
pub use activity_sys::console_log;

pub use errors::*;
pub use types::*;

pub async fn create(client_id: &str) -> Result<(), wasm_bindgen::JsValue> {
    activity_sys::glue::create(client_id)
        .await
        .map_err(|e| e.into())
}

pub async fn ready() -> Result<(), wasm_bindgen::JsValue> {
    activity_sys::glue::sdk_ready().await.map_err(|e| e.into())
}
