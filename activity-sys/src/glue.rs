use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

#[wasm_bindgen(js_namespace = ["window", "activity"])]
extern "C" {
    #[wasm_bindgen(catch)]
    pub async fn create(client_id: &str) -> Result<(), JsValue>;
}

#[wasm_bindgen(js_namespace = ["window", "activity", "instance"])]
extern "C" {
    #[wasm_bindgen(catch, js_name = ready)]
    pub async fn sdk_ready() -> Result<(), JsValue>;
}

#[wasm_bindgen(js_namespace = ["window", "activity", "instance", "commands"])]
extern "C" {
    #[wasm_bindgen(catch, js_name = authorize)]
    pub async fn sdk_commands_authorize(v: JsValue) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(catch, js_name = authenticate)]
    pub async fn sdk_commands_authenticate(v: JsValue) -> Result<JsValue, JsValue>;
}
