use wasm_bindgen::JsValue;

pub struct Error {}

impl From<JsValue> for Error {
    fn from(_value: JsValue) -> Self {
        Error {}
    }
}

impl From<Error> for JsValue {
    fn from(_value: Error) -> Self {
        JsValue::NULL
    }
}
