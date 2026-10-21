use std::sync::Arc;

use activity_sys::console_debug;
use serde::{de::DeserializeOwned, Serialize};
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

    pub fn new_with_configuration(
        client_id: &str,
        configuration: SdkConfiguration,
    ) -> Result<Self, JsValue> {
        let configuration = serde_wasm_bindgen::to_value(&configuration)?;
        let internal =
            activity_sys::sdk::DiscordSDK::new_with_configuration(client_id, configuration)?;

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

    pub fn custom_id(&self) -> Option<String> {
        self.internal.custom_id()
    }

    pub fn referrer_id(&self) -> Option<String> {
        self.internal.referrer_id()
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

    pub fn location_id(&self) -> Option<String> {
        self.internal.location_id()
    }

    pub fn sdk_version(&self) -> String {
        self.internal.sdk_version()
    }

    pub fn mobile_app_version(&self) -> Option<String> {
        self.internal.mobile_app_version()
    }

    pub fn source_origin(&self) -> Option<String> {
        self.internal.source_origin()
    }

    pub fn close(&self, code: u16, message: &str) {
        self.internal.close(code, message)
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
            .subscribe(event_type.as_str(), &closure, args_value.clone())
            .await?;

        Ok(EventSubscription {
            sdk: self.clone(),
            event_type,
            args: args_value,
            closure: Some(closure),
        })
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

    pub async fn capture_log(&self, args: CaptureLogArgs) -> Result<(), JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal.commands().capture_log(args_value).await
    }

    pub async fn encourage_hardware_acceleration(
        &self,
    ) -> Result<EncourageHardwareAccelerationRes, JsValue> {
        let res = self
            .internal
            .commands()
            .encourage_hardware_acceleration()
            .await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_channel(&self, args: GetChannelArgs) -> Result<GetChannelRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().get_channel(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_channel_permissions(&self) -> Result<GetChannelPermissionsRes, JsValue> {
        let res = self.internal.commands().get_channel_permissions().await?;

        // The SDK returns either a string or a BigInt, toString() handles both
        let permissions = js_sys::Reflect::get(&res, &"permissions".into())?;
        let permissions = String::from(permissions.unchecked_ref::<js_sys::Object>().to_string())
            .parse()
            .map_err(|_| JsValue::from_str("invalid permissions value"))?;

        Ok(GetChannelPermissionsRes { permissions })
    }

    #[deprecated(note = "use get_activity_instance_connected_participants")]
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

    pub async fn get_activity_instance_connected_participants(
        &self,
    ) -> Result<GetInstanceConnectedParticipantsRes, JsValue> {
        let res = self
            .internal
            .commands()
            .get_activity_instance_connected_participants()
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

    pub async fn open_external_link(
        &self,
        args: OpenExternalLinkArgs,
    ) -> Result<OpenExternalLinkRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self
            .internal
            .commands()
            .open_external_link(args_value)
            .await?;

        Ok(serde_wasm_bindgen::from_value(res)?)
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

    pub async fn set_activity(&self, args: SetActivityArgs) -> Result<Activity, JsValue> {
        // Discord expects `activity: null` to clear the activity
        let serializer = serde_wasm_bindgen::Serializer::new().serialize_missing_as_null(true);
        let args_value = args.serialize(&serializer)?;

        let res = self.internal.commands().set_activity(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn set_config(&self, args: SetConfigArgs) -> Result<SetConfigRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().set_config(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
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

    pub async fn get_skus(&self) -> Result<GetSkusRes, JsValue> {
        let res = self.internal.commands().get_skus().await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_entitlements(&self) -> Result<GetEntitlementsRes, JsValue> {
        let res = self.internal.commands().get_entitlements().await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn start_purchase(
        &self,
        args: StartPurchaseArgs,
    ) -> Result<Option<Vec<Entitlement>>, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().start_purchase(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn share_link(&self, args: ShareLinkArgs) -> Result<ShareLinkRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().share_link(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_user(&self, args: GetUserArgs) -> Result<Option<User>, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self.internal.commands().get_user(args_value).await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_relationships(&self) -> Result<GetRelationshipsRes, JsValue> {
        let res = self.internal.commands().get_relationships().await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn invite_user_embedded(&self, args: InviteUserEmbeddedArgs) -> Result<(), JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        self.internal
            .commands()
            .invite_user_embedded(args_value)
            .await
    }

    pub async fn share_interaction(
        &self,
        args: ShareInteractionArgs,
    ) -> Result<ShareInteractionRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self
            .internal
            .commands()
            .share_interaction(args_value)
            .await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn request_proxy_ticket_refresh(
        &self,
    ) -> Result<RequestProxyTicketRefreshRes, JsValue> {
        let res = self
            .internal
            .commands()
            .request_proxy_ticket_refresh()
            .await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_quest(&self) -> Result<GetQuestRes, JsValue> {
        let res = self.internal.commands().get_quest().await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn get_quest_enrollment_status(
        &self,
        args: QuestArgs,
    ) -> Result<GetQuestEnrollmentStatusRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self
            .internal
            .commands()
            .get_quest_enrollment_status(args_value)
            .await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }

    pub async fn quest_start_timer(&self, args: QuestArgs) -> Result<QuestStartTimerRes, JsValue> {
        let args_value = serde_wasm_bindgen::to_value(&args)?;

        let res = self
            .internal
            .commands()
            .quest_start_timer(args_value)
            .await?;
        Ok(serde_wasm_bindgen::from_value(res)?)
    }
}

pub fn patch_url_mappings(
    mappings: &[UrlMapping],
    config: PatchUrlMappingsConfig,
) -> Result<(), JsValue> {
    let mappings = serde_wasm_bindgen::to_value(mappings)?;
    let config = serde_wasm_bindgen::to_value(&config)?;

    activity_sys::sdk::patch_url_mappings(mappings, config);
    Ok(())
}

pub struct EventSubscription {
    sdk: DiscordSDK,
    event_type: EventType,
    args: JsValue,
    closure: Option<Closure<dyn FnMut(JsValue) -> Result<(), JsValue>>>,
}

impl EventSubscription {
    pub async fn unsubscribe(mut self) -> Result<(), JsValue> {
        let Some(closure) = self.closure.take() else {
            return Ok(());
        };

        self.sdk
            .internal
            .unsubscribe(self.event_type.as_str(), &closure, self.args.clone())
            .await
    }
}

impl Drop for EventSubscription {
    fn drop(&mut self) {
        let Some(closure) = self.closure.take() else {
            return;
        };

        console_debug!(
            "EventSubscription dropped, unsubscribing from event: {}",
            self.event_type
        );

        // The closure must outlive the unsubscribe call, the SDK only removes the listener after it resolves
        let internal = self.sdk.internal.clone();
        let event = self.event_type.as_str().to_string();
        let args = self.args.clone();
        wasm_bindgen_futures::spawn_local(async move {
            let _ = internal.unsubscribe(&event, &closure, args).await;
            drop(closure);
        });
    }
}
