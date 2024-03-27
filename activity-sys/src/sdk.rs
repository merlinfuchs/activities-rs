use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

#[wasm_bindgen(module = "@discord/embedded-app-sdk")]
extern "C" {
    #[wasm_bindgen(extends=js_sys::Object)]
    pub type DiscordSDK;

    #[wasm_bindgen(constructor, catch)]
    pub fn new(clientId: &str) -> Result<DiscordSDK, JsValue>;

    #[wasm_bindgen(method, getter)]
    pub fn commands(this: &DiscordSDK) -> DiscordSDKCommands;

    #[wasm_bindgen(method, catch)]
    pub async fn ready(this: &DiscordSDK) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch)]
    pub async fn subscribe(this: &DiscordSDK, event: &str, f: &Closure<dyn FnMut(JsValue)>) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch)]
    pub async fn unsubscribe(this: &DiscordSDK, event: &str) -> Result<(), JsValue>;
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(extends=js_sys::Object)]
    pub type DiscordSDKCommands;

    #[wasm_bindgen(method, catch)]
    pub async fn authorize(this: &DiscordSDKCommands, args: JsValue) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch)]
    pub async fn authenticate(this: &DiscordSDKCommands, args: JsValue) -> Result<JsValue, JsValue>;
}