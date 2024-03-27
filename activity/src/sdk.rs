use std::sync::Arc;

use activity_sys::console_debug;
use serde::de::DeserializeOwned;
use wasm_bindgen::prelude::*;

use crate::types::*;

#[derive(Clone)]
pub struct DiscordSDK {
    internal: Arc<activity_sys::sdk::DiscordSDK>,
}

impl DiscordSDK {
    pub fn new(client_id: &str) -> Result<Self, JsValue> {
        let internal = activity_sys::sdk::DiscordSDK::new(client_id)?;

        Ok(Self {
            internal: Arc::new(internal),
        })
    }

    pub async fn ready(&self) -> Result<(), JsValue> {
        self.internal.ready().await
    }

    pub async fn subscribe<F: 'static, T>(
        &self,
        event: &str,
        mut f: F,
        args: SubscribeArgs,
    ) -> Result<EventSubscription, JsValue>
    where
        T: DeserializeOwned,
        F: FnMut(T) -> Result<(), JsValue>,
    {
        let closure = Closure::new(move |v: JsValue| {
            let event: T = serde_wasm_bindgen::from_value(v)?;
            f(event)
        });

        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal.subscribe(event, &closure, args_value).await?;
        Ok(EventSubscription {
            sdk: self.clone(),
            event: event.to_string(),
            _closure: closure,
        })
    }

    pub async fn unsubscribe(&self, event: &str) -> Result<(), JsValue> {
        self.internal.unsubscribe(event).await
    }

    pub fn unsubscribe_nowait(&self, event: &str) {
        self.internal.unsubscribe_nowait(event)
    }

    pub async fn authenticate(
        &self,
        args: AuthenticateCommandArgs,
    ) -> Result<AuthenticateCommandRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().authenticate(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn authorize(
        &self,
        args: AuthorizeCommandArgs,
    ) -> Result<AuthorizeCommandRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().authorize(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }
}

pub struct EventSubscription {
    sdk: DiscordSDK,
    event: String,
    _closure: Closure<dyn FnMut(JsValue) -> Result<(), JsValue>>,
}

impl Drop for EventSubscription {
    fn drop(&mut self) {
        console_debug!(
            "EventSubscription dropped, unsubscribing from event: {}",
            self.event
        );
        let _ = self.sdk.unsubscribe_nowait(&self.event);
    }
}
