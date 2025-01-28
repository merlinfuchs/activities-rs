use std::fmt::Display;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub id: String,
    pub username: String,
    pub discriminator: String,
    #[serde(default)]
    pub avatar: Option<String>,
    #[serde(default)]
    pub public_flags: u64,
    #[serde(default)]
    pub flags: u64,
    #[serde(default)]
    pub premium_type: u8,
    #[serde(default)]
    pub global_name: Option<String>,
    #[serde(default)]
    pub bot: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Member {
    pub user_id: String,
    pub guild_id: String,
    #[serde(default)]
    pub nick: Option<String>,
    #[serde(default)]
    pub avatar: Option<String>,
    #[serde(default)]
    pub color_string: Option<String>,
    #[serde(default)]
    pub avatar_decoration_data: Option<MemberAvatarDecorationData>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MemberAvatarDecorationData {
    pub asset: String,
    #[serde(default)]
    pub sku_id: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Application {
    pub id: String,
    pub name: String,
    pub description: String,
    #[serde(default)]
    pub icon: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Channel {}

#[derive(Serialize, Deserialize, Debug)]
pub struct Activity {}

#[derive(Serialize, Deserialize, Debug)]
pub struct SdkConfiguration {
    #[serde(rename = "disableConsoleLogOverride")]
    pub disable_console_log_override: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthorizeArgs {
    pub client_id: String,
    pub response_type: String,
    pub state: String,
    pub prompt: String,
    pub scope: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthorizeRes {
    pub code: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthenticateArgs {
    pub access_token: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthenticateRes {
    pub access_token: String,
    pub scopes: Vec<String>,
    pub expires: String,
    pub user: User,
    pub application: Application,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CaputeLogArgs {
    pub level: String,
    pub message: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetChannelArgs {
    pub channel_id: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetChannelRes {
    #[serde(flatten)]
    pub channel: Channel,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetChannelPermissionsRes {
    #[serde(default)]
    pub permissions: u64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetInstanceConnectedParticipantsRes {
    pub participants: Vec<User>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetPlatformBehaviorsRes {
    #[serde(default, rename = "iosKeyboardResizesView")]
    pub ios_keyboard_resizes_view: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct InitiateImageUploadRes {
    pub image_url: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OpenExternalLinkArgs {
    pub url: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OpenExternalLinkRes {
    #[serde(default)]
    pub opened: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OpenShareMomentDialogArgs {
    #[serde(rename = "mediaUrl")]
    pub media_url: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SetActivityArgs {
    pub activity: Activity,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SetConfigArgs {
    pub user_interactive_pip: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SetOrientationLockStateArgs {
    pub lock_state: String,
    pub picture_in_picture_lock_state: String,
    pub grid_lock_state: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserSettingsGetLocaleRes {
    // TODO: Implement this struct
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ReadyEvent {
    pub v: u8,
    pub config: ReadyEventConfig,
}

impl EventPayload for ReadyEvent {
    fn event_type() -> EventType {
        EventType::Ready
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ReadyEventConfig {
    cdn_host: String,
    api_endpoint: String,
    environment: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ErrorEvent {
    pub code: u64,
    pub message: String,
}

impl EventPayload for ErrorEvent {
    fn event_type() -> EventType {
        EventType::Error
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct VoiceStateUpdateEvent {
    pub voice_state: VoiceState,
    pub user: User,
    #[serde(default)]
    pub nick: Option<String>,
    pub volume: u32,
    pub mute: bool,
    #[serde(default)]
    pub pan: Option<VoiceStateUpdatePan>,
}

impl EventPayload for VoiceStateUpdateEvent {
    fn event_type() -> EventType {
        EventType::VoiceStateUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct VoiceState {
    pub mute: bool,
    pub deaf: bool,
    pub self_mute: bool,
    pub self_deaf: bool,
    pub suppress: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct VoiceStateUpdatePan {
    pub left: f32,
    pub right: f32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SpeakingStartEvent {
    pub channel_id: String,
    pub user_id: String,
}

impl EventPayload for SpeakingStartEvent {
    fn event_type() -> EventType {
        EventType::SpeakingStart
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SpeakingStopEvent {
    pub channel_id: String,
    pub user_id: String,
}

impl EventPayload for SpeakingStopEvent {
    fn event_type() -> EventType {
        EventType::SpeakingStop
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ActivityLayoutModeUpdateEvent {
    pub layout_mode: u8,
}

impl EventPayload for ActivityLayoutModeUpdateEvent {
    fn event_type() -> EventType {
        EventType::ActivityLayoutModeUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OrientationUpdateEvent {
    pub screen_orientation: u8,
}

impl EventPayload for OrientationUpdateEvent {
    fn event_type() -> EventType {
        EventType::OrientationUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CurrentUserUpdateEvent {
    #[serde(flatten)]
    pub user: User,
}

impl EventPayload for CurrentUserUpdateEvent {
    fn event_type() -> EventType {
        EventType::CurrentUserUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CurrentGuildMemberUpdateEvent {
    #[serde(flatten)]
    pub member: Member,
}

impl EventPayload for CurrentGuildMemberUpdateEvent {
    fn event_type() -> EventType {
        EventType::CurrentGuildMemberUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ThermalStateUpdateEvent {
    pub thermal_state: u8,
}

impl EventPayload for ThermalStateUpdateEvent {
    fn event_type() -> EventType {
        EventType::ThermalStateUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ActivityInstanceParticipantsUpdateEvent {
    pub participants: Vec<User>,
}

impl EventPayload for ActivityInstanceParticipantsUpdateEvent {
    fn event_type() -> EventType {
        EventType::ActivityInstanceParticipantsUpdate
    }
}

pub enum EventType {
    Ready,
    Error,
    VoiceStateUpdate,
    SpeakingStart,
    SpeakingStop,
    ActivityLayoutModeUpdate,
    OrientationUpdate,
    CurrentUserUpdate,
    CurrentGuildMemberUpdate,
    ThermalStateUpdate,
    ActivityInstanceParticipantsUpdate,
}

impl EventType {
    pub fn as_str(&self) -> &str {
        match self {
            EventType::Ready => "READY",
            EventType::Error => "ERROR",
            EventType::VoiceStateUpdate => "VOICE_STATE_UPDATE",
            EventType::SpeakingStart => "SPEAKING_START",
            EventType::SpeakingStop => "SPEAKING_STOP",
            EventType::ActivityLayoutModeUpdate => "ACTIVITY_LAYOUT_MODE_UPDATE",
            EventType::OrientationUpdate => "ORIENTATION_UPDATE",
            EventType::CurrentUserUpdate => "CURRENT_USER_UPDATE",
            EventType::CurrentGuildMemberUpdate => "CURRENT_GUILD_MEMBER_UPDATE",
            EventType::ThermalStateUpdate => "THERMAL_STATE_UPDATE",
            EventType::ActivityInstanceParticipantsUpdate => {
                "ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE"
            }
        }
    }
}

impl Display for EventType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.as_str())
    }
}

pub trait EventPayload {
    fn event_type() -> EventType;
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SubscribeArgs {
    pub channel_id: String,
}

impl SubscribeArgs {
    pub fn channel_id<T>(channel_id: T) -> Self
    where
        T: Into<String>,
    {
        Self {
            channel_id: channel_id.into(),
        }
    }
}
