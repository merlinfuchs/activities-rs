use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct AuthorizeCommandArgs {
    pub client_id: String,
    pub response_type: String,
    pub state: String,
    pub prompt: String,
    pub scope: Vec<String>
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
    pub public_flags: u64,
    #[serde(default)]
    pub global_name: Option<String>
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct Application {
    pub id: String,
    pub name: String,
    pub description: String,
    #[serde(default)]
    pub icon: Option<String>
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct Event {}