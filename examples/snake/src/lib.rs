use activity::*;
use game_grid::GameGridComponent;
use wasm_bindgen::JsValue;
use yew::Renderer;

mod game_grid;

#[activity]
pub async fn start() -> Result<(), JsValue> {
    Renderer::<GameGridComponent>::new().render();

    let activity = DiscordSDK::new(env!("CLIENT_ID"))?;
    activity.ready().await?;

    // TODO: implement multiplier
    Ok(())
}
