use std::fmt::Display;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct SdkConfiguration {
    #[serde(rename = "disableConsoleLogOverride")]
    pub disable_console_log_override: bool,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct AuthorizeCommandArgs {
    pub client_id: String,
    pub response_type: String,
    pub state: String,
    pub prompt: String,
    pub scope: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct AuthorizeCommandRes {
    pub code: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct AuthenticateCommandArgs {
    pub access_token: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct AuthenticateCommandRes {
    pub access_token: String,
    pub scopes: Vec<String>,
    pub expires: String,
    pub user: User,
    pub application: Application,
}

#[derive(Serialize, Deserialize, Debug, Default)]
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

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct Application {
    pub id: String,
    pub name: String,
    pub description: String,
    #[serde(default)]
    pub icon: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ReadyEvent {
    pub v: u8,
    pub config: ReadyEventConfig,
}

impl EventPayload for ReadyEvent {
    fn event_type() -> EventType {
        EventType::Ready
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ReadyEventConfig {
    cdn_host: String,
    api_endpoint: String,
    environment: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ErrorEvent {
    pub code: u64,
    pub message: String,
}

impl EventPayload for ErrorEvent {
    fn event_type() -> EventType {
        EventType::Error
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
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

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct VoiceState {
    pub mute: bool,
    pub deaf: bool,
    pub self_mute: bool,
    pub self_deaf: bool,
    pub suppress: bool,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct VoiceStateUpdatePan {
    pub left: f32,
    pub right: f32,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct SpeakingStartEvent {
    pub channel_id: String,
    pub user_id: String,
}

impl EventPayload for SpeakingStartEvent {
    fn event_type() -> EventType {
        EventType::SpeakingStart
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct SpeakingStopEvent {
    pub channel_id: String,
    pub user_id: String,
}

impl EventPayload for SpeakingStopEvent {
    fn event_type() -> EventType {
        EventType::SpeakingStop
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ActivityLayoutModeUpdateEvent {
    pub layout_mode: u8,
}

impl EventPayload for ActivityLayoutModeUpdateEvent {
    fn event_type() -> EventType {
        EventType::ActivityLayoutModeUpdate
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct OrientationUpdateEvent {
    pub screen_orientation: u8,
}

impl EventPayload for OrientationUpdateEvent {
    fn event_type() -> EventType {
        EventType::OrientationUpdate
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct CurrentUserUpdateEvent {
    #[serde(flatten)]
    pub user: User,
}

impl EventPayload for CurrentUserUpdateEvent {
    fn event_type() -> EventType {
        EventType::CurrentUserUpdate
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ThermalStateUpdateEvent {
    pub thermal_state: u8,
}

impl EventPayload for ThermalStateUpdateEvent {
    fn event_type() -> EventType {
        EventType::ThermalStateUpdate
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
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

#[derive(Serialize, Deserialize, Debug, Default)]
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
