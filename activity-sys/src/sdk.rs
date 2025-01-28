use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

#[wasm_bindgen(module = "@discord/embedded-app-sdk")]
extern "C" {
    #[wasm_bindgen(extends=js_sys::Object)]
    pub type DiscordSDK;

    #[wasm_bindgen(constructor, catch)]
    pub fn new(clientId: &str) -> Result<DiscordSDK, JsValue>;

    #[wasm_bindgen(method, getter, js_name = clientId)]
    pub fn client_id(this: &DiscordSDK) -> String;

    #[wasm_bindgen(method, getter, js_name = instanceId)]
    pub fn instance_id(this: &DiscordSDK) -> String;

    #[wasm_bindgen(method, getter, js_name = customId)]
    pub fn custom_id(this: &DiscordSDK) -> Option<String>;

    #[wasm_bindgen(method, getter, js_name = referrerId)]
    pub fn referrer_id(this: &DiscordSDK) -> Option<String>;

    #[wasm_bindgen(method, getter)]
    pub fn platform(this: &DiscordSDK) -> String;

    #[wasm_bindgen(method, getter, js_name = guildId)]
    pub fn guild_id(this: &DiscordSDK) -> Option<String>;

    #[wasm_bindgen(method, getter, js_name = channelId)]
    pub fn channel_id(this: &DiscordSDK) -> Option<String>;

    #[wasm_bindgen(method, getter, js_name = sourceOrigin)]
    pub fn source_origin(this: &DiscordSDK) -> Option<String>;

    #[wasm_bindgen(method, getter)]
    pub fn configuration(this: &DiscordSDK) -> JsValue;

    #[wasm_bindgen(method, getter)]
    pub fn commands(this: &DiscordSDK) -> DiscordSDKCommands;

    #[wasm_bindgen(method, catch)]
    pub async fn ready(this: &DiscordSDK) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch)]
    pub async fn subscribe(
        this: &DiscordSDK,
        event: &str,
        f: &Closure<dyn FnMut(JsValue) -> Result<(), JsValue>>,
        args: JsValue,
    ) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch)]
    pub async fn unsubscribe(this: &DiscordSDK, event: &str) -> Result<(), JsValue>;

    #[wasm_bindgen(method, js_name = unsubscribe)]
    pub fn unsubscribe_nowait(this: &DiscordSDK, event: &str);
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(extends=js_sys::Object)]
    pub type DiscordSDKCommands;

    #[wasm_bindgen(method, catch)]
    pub async fn authorize(this: &DiscordSDKCommands, args: JsValue) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch)]
    pub async fn authenticate(this: &DiscordSDKCommands, args: JsValue)
        -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch, js_name = captureLog)]
    pub async fn capture_log(this: &DiscordSDKCommands, args: JsValue) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch, js_name = encourageHardwareAcceleration)]
    pub async fn encourage_hardware_acceleration(this: &DiscordSDKCommands) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch, js_name = getChannel)]
    pub async fn get_channel(this: &DiscordSDKCommands, args: JsValue) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch, js_name = getChannelPermissions)]
    pub async fn get_channel_permissions(this: &DiscordSDKCommands) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch, js_name = getInstanceConnectedParticipants)]
    pub async fn get_instance_connected_participants(
        this: &DiscordSDKCommands,
    ) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch, js_name = getPlatformBehaviors)]
    pub async fn get_platform_behaviors(this: &DiscordSDKCommands) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch, js_name = initiateImageUpload)]
    pub async fn initiate_image_upload(this: &DiscordSDKCommands) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch, js_name = openExternalLink)]
    pub async fn open_external_link(
        this: &DiscordSDKCommands,
        args: JsValue,
    ) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(method, catch, js_name = openInviteDialog)]
    pub async fn open_invite_dialog(this: &DiscordSDKCommands) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch, js_name = openShareMomentDialog)]
    pub async fn open_share_moment_dialog(
        this: &DiscordSDKCommands,
        args: JsValue,
    ) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch, js_name = setActivity)]
    pub async fn set_activity(this: &DiscordSDKCommands, args: JsValue) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch, js_name = setConfig)]
    pub async fn set_config(this: &DiscordSDKCommands, args: JsValue) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch, js_name = setOrientationLockState)]
    pub async fn set_orientation_lock_state(
        this: &DiscordSDKCommands,
        args: JsValue,
    ) -> Result<(), JsValue>;

    #[wasm_bindgen(method, catch, js_name = userSettingsGetLocale)]
    pub async fn user_settings_get_locale(this: &DiscordSDKCommands) -> Result<JsValue, JsValue>;
}
