use serde::{Deserialize, Serialize};

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
pub struct SubscribeArgs {
    pub channel_id: String,
}

impl SubscribeArgs {
    pub fn channel_id(channel_id: &str) -> Self {
        Self {
            channel_id: channel_id.to_string(),
        }
    }
}
