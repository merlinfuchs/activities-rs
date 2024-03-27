use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

use crate::types::*;

pub struct DiscordSDK {
    internal: activity_sys::sdk::DiscordSDK,
}

impl DiscordSDK {
    pub fn new(client_id: &str) -> Result<Self, JsValue> {
        let internal = activity_sys::sdk::DiscordSDK::new(client_id)?;

        Ok(Self { internal })
    }

    pub async fn ready(&self) -> Result<(), JsValue> {
        self.internal.ready().await
    }

    pub async fn subscribe<F: 'static>(&self, event: &str, mut f: F) -> Result<Closure<dyn FnMut(JsValue)>, JsValue> where F: FnMut(Event)  {
        let closure = Closure::new(move |v: JsValue| {
            let event: Event = serde_wasm_bindgen::from_value(v).unwrap();
            f(event);
        });

        self.internal.subscribe(event, &closure).await?;
        Ok(closure)
    }

    pub async fn unsubscribe(&self, event: &str) -> Result<(), JsValue>  {
        self.internal.unsubscribe(event).await
    }

    pub async fn authenticate(&self, args: AuthenticateCommandArgs) -> Result<AuthenticateCommandRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().authenticate(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn authorize(&self, args: AuthorizeCommandArgs) -> Result<AuthorizeCommandRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().authorize(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }
}