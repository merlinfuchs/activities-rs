use std::fmt::Display;

use serde::{Deserialize, Deserializer, Serialize, Serializer};

fn null_as_default<'de, D, T>(deserializer: D) -> Result<T, D::Error>
where
    D: Deserializer<'de>,
    T: Default + Deserialize<'de>,
{
    Ok(Option::<T>::deserialize(deserializer)?.unwrap_or_default())
}

// The SDK returns permissions as either a BigInt or a string
fn u64_from_int_or_str<'de, D>(deserializer: D) -> Result<u64, D::Error>
where
    D: Deserializer<'de>,
{
    #[derive(Deserialize)]
    #[serde(untagged)]
    enum IntOrStr {
        Int(u64),
        Str(String),
    }

    match IntOrStr::deserialize(deserializer)? {
        IntOrStr::Int(v) => Ok(v),
        IntOrStr::Str(s) => s.parse().map_err(serde::de::Error::custom),
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub id: String,
    pub username: String,
    pub discriminator: String,
    #[serde(default)]
    pub avatar: Option<String>,
    #[serde(default, deserialize_with = "null_as_default")]
    pub public_flags: u64,
    #[serde(default, deserialize_with = "null_as_default")]
    pub flags: u64,
    #[serde(default, deserialize_with = "null_as_default")]
    pub premium_type: u8,
    #[serde(default)]
    pub global_name: Option<String>,
    #[serde(default)]
    pub bot: bool,
    #[serde(default)]
    pub nickname: Option<String>,
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
pub struct Channel {
    pub id: String,
    pub r#type: i32,
    #[serde(default)]
    pub guild_id: Option<String>,
    #[serde(default)]
    pub name: Option<String>,
    #[serde(default)]
    pub topic: Option<String>,
    #[serde(default)]
    pub bitrate: Option<u32>,
    #[serde(default)]
    pub user_limit: Option<u32>,
    #[serde(default)]
    pub position: Option<i32>,
    #[serde(default)]
    pub voice_states: Vec<UserVoiceState>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserVoiceState {
    pub user: User,
    pub nick: String,
    pub mute: bool,
    pub volume: f32,
    pub voice_state: VoiceState,
    #[serde(default)]
    pub pan: Option<VoiceStateUpdatePan>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct Activity {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub r#type: Option<u8>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub details: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub details_url: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub state: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub state_url: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub timestamps: Option<ActivityTimestamps>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub assets: Option<ActivityAssets>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub party: Option<ActivityParty>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub secrets: Option<ActivitySecrets>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub instance: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ActivityTimestamps {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub start: Option<u64>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub end: Option<u64>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ActivityAssets {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub large_image: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub large_text: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub large_url: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub small_image: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub small_text: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub small_url: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ActivityParty {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub id: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub size: Option<Vec<u32>>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ActivitySecrets {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub join: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub r#match: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct SdkConfiguration {
    #[serde(rename = "disableConsoleLogOverride")]
    pub disable_console_log_override: bool,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct AuthorizeArgs {
    pub client_id: String,
    pub scope: Vec<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub response_type: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub state: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub prompt: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub code_challenge: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub code_challenge_method: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthorizeRes {
    pub code: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthenticateArgs {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub access_token: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthenticateRes {
    pub access_token: String,
    pub scopes: Vec<String>,
    pub expires: String,
    pub user: User,
    pub application: Application,
}

#[deprecated(note = "use CaptureLogArgs")]
pub type CaputeLogArgs = CaptureLogArgs;

#[derive(Serialize, Deserialize, Debug)]
pub struct CaptureLogArgs {
    pub level: String,
    pub message: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct EncourageHardwareAccelerationRes {
    pub enabled: bool,
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
    #[serde(deserialize_with = "u64_from_int_or_str")]
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
    pub opened: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OpenShareMomentDialogArgs {
    #[serde(rename = "mediaUrl")]
    pub media_url: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SetActivityArgs {
    pub activity: Option<Activity>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SetConfigArgs {
    pub use_interactive_pip: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SetConfigRes {
    pub use_interactive_pip: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OrientationLockState {
    Unlocked = 1,
    Portrait = 2,
    Landscape = 3,
}

impl Serialize for OrientationLockState {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_u8(*self as u8)
    }
}

#[derive(Serialize, Debug)]
pub struct SetOrientationLockStateArgs {
    pub lock_state: OrientationLockState,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub picture_in_picture_lock_state: Option<OrientationLockState>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub grid_lock_state: Option<OrientationLockState>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserSettingsGetLocaleRes {
    pub locale: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Sku {
    pub id: String,
    pub name: String,
    pub r#type: i32,
    pub price: SkuPrice,
    pub application_id: String,
    pub flags: u64,
    #[serde(default)]
    pub release_date: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SkuPrice {
    pub amount: u64,
    pub currency: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Entitlement {
    pub id: String,
    pub sku_id: String,
    pub application_id: String,
    pub user_id: String,
    pub gift_code_flags: u64,
    pub r#type: i32,
    #[serde(default)]
    pub gifter_user_id: Option<String>,
    #[serde(default)]
    pub branches: Option<Vec<String>>,
    #[serde(default)]
    pub starts_at: Option<String>,
    #[serde(default)]
    pub ends_at: Option<String>,
    #[serde(default)]
    pub parent_id: Option<String>,
    #[serde(default)]
    pub consumed: Option<bool>,
    #[serde(default)]
    pub deleted: Option<bool>,
    #[serde(default)]
    pub gift_code_batch_id: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetSkusRes {
    pub skus: Vec<Sku>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetEntitlementsRes {
    pub entitlements: Vec<Entitlement>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct StartPurchaseArgs {
    pub sku_id: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub pid: Option<u32>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ShareLinkArgs {
    pub message: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub custom_id: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub link_id: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ShareLinkRes {
    pub success: bool,
    #[serde(rename = "didCopyLink")]
    pub did_copy_link: bool,
    #[serde(rename = "didSendMessage")]
    pub did_send_message: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetUserArgs {
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Relationship {
    pub r#type: i32,
    pub user: User,
    #[serde(default)]
    pub presence: Option<RelationshipPresence>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RelationshipPresence {
    pub status: String,
    #[serde(default)]
    pub activity: Option<Activity>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetRelationshipsRes {
    pub relationships: Vec<Relationship>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct InviteUserEmbeddedArgs {
    pub user_id: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ShareInteractionArgs {
    pub command: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub options: Option<Vec<ShareInteractionOption>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub require_launch_channel: Option<bool>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub preview_image: Option<ShareInteractionPreviewImage>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub components: Option<Vec<ShareInteractionActionRow>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub pid: Option<u32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ShareInteractionOption {
    pub name: String,
    pub value: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ShareInteractionPreviewImage {
    pub url: String,
    pub width: u32,
    pub height: u32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ShareInteractionActionRow {
    /// Always 1
    pub r#type: u8,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub components: Option<Vec<ShareInteractionButton>>,
}

impl ShareInteractionActionRow {
    pub fn new(components: Vec<ShareInteractionButton>) -> Self {
        Self {
            r#type: 1,
            components: Some(components),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ShareInteractionButton {
    /// Always 2
    pub r#type: u8,
    pub style: u8,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub label: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub custom_id: Option<String>,
}

impl ShareInteractionButton {
    pub fn new(style: u8, label: Option<String>, custom_id: Option<String>) -> Self {
        Self {
            r#type: 2,
            style,
            label,
            custom_id,
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ShareInteractionRes {
    pub success: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RequestProxyTicketRefreshRes {
    pub ticket: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetQuestRes {
    pub quest_id: String,
    pub external_cta_url: String,
    #[serde(default)]
    pub enrolled_at: Option<String>,
    #[serde(default)]
    pub completed_at: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct QuestArgs {
    pub quest_id: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetQuestEnrollmentStatusRes {
    pub quest_id: String,
    pub is_enrolled: bool,
    #[serde(default)]
    pub enrolled_at: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct QuestStartTimerRes {
    pub success: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UrlMapping {
    pub prefix: String,
    pub target: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct PatchUrlMappingsConfig {
    #[serde(rename = "patchFetch", skip_serializing_if = "Option::is_none")]
    pub patch_fetch: Option<bool>,
    #[serde(rename = "patchWebSocket", skip_serializing_if = "Option::is_none")]
    pub patch_web_socket: Option<bool>,
    #[serde(rename = "patchXhr", skip_serializing_if = "Option::is_none")]
    pub patch_xhr: Option<bool>,
    #[serde(rename = "patchSrcAttributes", skip_serializing_if = "Option::is_none")]
    pub patch_src_attributes: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ReadyEvent {
    pub v: u8,
    pub config: ReadyEventConfig,
    #[serde(default)]
    pub user: Option<ReadyEventUser>,
}

impl EventPayload for ReadyEvent {
    type Args = ();

    fn event_type() -> EventType {
        EventType::Ready
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ReadyEventConfig {
    #[serde(default)]
    pub cdn_host: Option<String>,
    pub api_endpoint: String,
    pub environment: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ReadyEventUser {
    pub id: String,
    pub username: String,
    pub discriminator: String,
    #[serde(default)]
    pub avatar: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ErrorEvent {
    pub code: u64,
    #[serde(default)]
    pub message: Option<String>,
}

impl EventPayload for ErrorEvent {
    type Args = ();

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
    type Args = SubscribeArgs;

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
    type Args = SpeakingSubscribeArgs;

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
    type Args = SpeakingSubscribeArgs;

    fn event_type() -> EventType {
        EventType::SpeakingStop
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ActivityLayoutModeUpdateEvent {
    pub layout_mode: i32,
}

impl EventPayload for ActivityLayoutModeUpdateEvent {
    type Args = ();

    fn event_type() -> EventType {
        EventType::ActivityLayoutModeUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OrientationUpdateEvent {
    pub screen_orientation: i32,
    #[serde(default)]
    pub orientation: Option<String>,
}

impl EventPayload for OrientationUpdateEvent {
    type Args = ();

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
    type Args = ();

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
    type Args = GuildSubscribeArgs;

    fn event_type() -> EventType {
        EventType::CurrentGuildMemberUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ThermalStateUpdateEvent {
    pub thermal_state: i32,
}

impl EventPayload for ThermalStateUpdateEvent {
    type Args = ();

    fn event_type() -> EventType {
        EventType::ThermalStateUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ActivityInstanceParticipantsUpdateEvent {
    pub participants: Vec<User>,
}

impl EventPayload for ActivityInstanceParticipantsUpdateEvent {
    type Args = ();

    fn event_type() -> EventType {
        EventType::ActivityInstanceParticipantsUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct EntitlementCreateEvent {
    pub entitlement: Entitlement,
}

impl EventPayload for EntitlementCreateEvent {
    type Args = ();

    fn event_type() -> EventType {
        EventType::EntitlementCreate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ActivityJoinEvent {
    #[serde(rename = "applicationId")]
    pub application_id: String,
    pub secret: String,
}

impl EventPayload for ActivityJoinEvent {
    type Args = ();

    fn event_type() -> EventType {
        EventType::ActivityJoin
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RelationshipUpdateEvent {
    #[serde(flatten)]
    pub relationship: Relationship,
}

impl EventPayload for RelationshipUpdateEvent {
    type Args = ();

    fn event_type() -> EventType {
        EventType::RelationshipUpdate
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct QuestEnrollmentStatusUpdateEvent {
    pub quest_id: String,
    pub is_enrolled: bool,
    pub enrolled_at: String,
}

impl EventPayload for QuestEnrollmentStatusUpdateEvent {
    type Args = ();

    fn event_type() -> EventType {
        EventType::QuestEnrollmentStatusUpdate
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
    EntitlementCreate,
    ActivityJoin,
    RelationshipUpdate,
    QuestEnrollmentStatusUpdate,
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
            EventType::EntitlementCreate => "ENTITLEMENT_CREATE",
            EventType::ActivityJoin => "ACTIVITY_JOIN",
            EventType::RelationshipUpdate => "RELATIONSHIP_UPDATE",
            EventType::QuestEnrollmentStatusUpdate => "QUEST_ENROLLMENT_STATUS_UPDATE",
        }
    }
}

impl Display for EventType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.as_str())
    }
}

pub trait EventPayload {
    /// Arguments passed when subscribing, `()` for events that take none
    type Args: Serialize;

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

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct SpeakingSubscribeArgs {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub channel_id: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub lobby_id: Option<String>,
}

impl SpeakingSubscribeArgs {
    pub fn channel_id<T>(channel_id: T) -> Self
    where
        T: Into<String>,
    {
        Self {
            channel_id: Some(channel_id.into()),
            lobby_id: None,
        }
    }

    pub fn lobby_id<T>(lobby_id: T) -> Self
    where
        T: Into<String>,
    {
        Self {
            channel_id: None,
            lobby_id: Some(lobby_id.into()),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GuildSubscribeArgs {
    pub guild_id: String,
}

impl GuildSubscribeArgs {
    pub fn guild_id<T>(guild_id: T) -> Self
    where
        T: Into<String>,
    {
        Self {
            guild_id: guild_id.into(),
        }
    }
}
