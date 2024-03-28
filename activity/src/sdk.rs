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

    pub fn client_id(&self) -> String {
        self.internal.client_id()
    }

    pub fn instance_id(&self) -> String {
        self.internal.instance_id()
    }

    pub fn platform(&self) -> String {
        self.internal.platform()
    }

    pub fn guild_id(&self) -> Option<String> {
        self.internal.guild_id()
    }

    pub fn channel_id(&self) -> Option<String> {
        self.internal.channel_id()
    }

    pub fn configuration(&self) -> SdkConfiguration {
        serde_wasm_bindgen::from_value(self.internal.configuration())
            .expect("Failed to deserialize SdkConfiguration")
    }

    pub async fn ready(&self) -> Result<(), JsValue> {
        self.internal.ready().await
    }

    pub async fn subscribe<F: 'static, T>(
        &self,
        mut f: F,
        args: SubscribeArgs,
    ) -> Result<EventSubscription, JsValue>
    where
        T: DeserializeOwned + EventPayload,
        F: FnMut(T) -> Result<(), JsValue>,
    {
        let closure = Closure::new(move |v: JsValue| {
            let event: T = serde_wasm_bindgen::from_value(v)?;
            f(event)
        });

        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let event_type = T::event_type();

        self.internal
            .subscribe(event_type.as_str(), &closure, args_value)
            .await?;

        Ok(EventSubscription {
            sdk: self.clone(),
            event_type: event_type,
            _closure: closure,
        })
    }

    pub async fn unsubscribe(&self, event: &str) -> Result<(), JsValue> {
        self.internal.unsubscribe(event).await
    }

    pub fn unsubscribe_nowait(&self, event: &str) {
        self.internal.unsubscribe_nowait(event)
    }

    pub async fn authenticate(&self, args: AuthenticateArgs) -> Result<AuthenticateRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().authenticate(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn authorize(&self, args: AuthorizeArgs) -> Result<AuthorizeRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().authorize(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn capture_log(&self, args: CaputeLogArgs) -> Result<(), JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal.commands().capture_log(args_value).await
    }

    pub async fn encourage_hardware_acceleration(&self) -> Result<(), JsValue> {
        self.internal
            .commands()
            .encourage_hardware_acceleration()
            .await
    }

    pub async fn get_channel(&self, args: GetChannelArgs) -> Result<GetChannelRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().get_channel(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_channel_permissions(&self) -> Result<GetChannelPermissionsRes, JsValue> {
        let res = self.internal.commands().get_channel_permissions().await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_instance_connected_participants(
        &self,
    ) -> Result<GetInstanceConnectedParticipantsRes, JsValue> {
        let res = self
            .internal
            .commands()
            .get_instance_connected_participants()
            .await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_platform_behaviors(&self) -> Result<GetPlatformBehaviorsRes, JsValue> {
        let res = self.internal.commands().get_platform_behaviors().await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn initiate_image_upload(&self) -> Result<InitiateImageUploadRes, JsValue> {
        let res = self.internal.commands().initiate_image_upload().await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn open_external_link(&self, args: OpenExternalLinkArgs) -> Result<(), JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal
            .commands()
            .open_external_link(args_value)
            .await
    }

    pub async fn open_invite_dialog(&self) -> Result<(), JsValue> {
        self.internal.commands().open_invite_dialog().await
    }

    pub async fn open_share_moment_dialog(
        &self,
        args: OpenShareMomentDialogArgs,
    ) -> Result<(), JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal
            .commands()
            .open_share_moment_dialog(args_value)
            .await
    }

    pub async fn set_activity(&self, args: SetActivityArgs) -> Result<(), JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal.commands().set_activity(args_value).await
    }

    pub async fn set_config(&self, args: SetConfigArgs) -> Result<(), JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal.commands().set_config(args_value).await
    }

    pub async fn set_orientation_lock_state(
        &self,
        args: SetOrientationLockStateArgs,
    ) -> Result<(), JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal
            .commands()
            .set_orientation_lock_state(args_value)
            .await
    }

    pub async fn user_settings_get_locale(&self) -> Result<UserSettingsGetLocaleRes, JsValue> {
        let res = self.internal.commands().user_settings_get_locale().await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }
}

pub struct EventSubscription {
    sdk: DiscordSDK,
    event_type: EventType,
    _closure: Closure<dyn FnMut(JsValue) -> Result<(), JsValue>>,
}

impl Drop for EventSubscription {
    fn drop(&mut self) {
        console_debug!(
            "EventSubscription dropped, unsubscribing from event: {}",
            self.event_type
        );
        let _ = self.sdk.unsubscribe_nowait(self.event_type.as_str());
    }
}
