use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, punctuated::Punctuated, token::Comma, Ident, ItemFn};

pub fn expand_macro(attr: TokenStream, item: TokenStream) -> TokenStream {
    let attrs: Punctuated<Ident, Comma> =
        parse_macro_input!(attr with Punctuated::parse_terminated);

    enum HandlerType {
        Init,
        Ready,
        Error,
        VoiceStateUpdate,
    }

    let mut handler_type = None;

    for attr in attrs {
        match attr.to_string().as_str() {
            "init" => handler_type = Some(HandlerType::Init),
            "ready" => handler_type = Some(HandlerType::Ready),
            "error" => handler_type = Some(HandlerType::Error),
            "voice_state_update" => handler_type = Some(HandlerType::VoiceStateUpdate),
            _ => panic!("Invalid attribute: {}", attr),
        }
    }

    let handler_type =
        handler_type.expect("must have either 'init' attribute, e.g. #[event(init)]");

    let mut input_fn = parse_macro_input!(item as ItemFn);

    match handler_type {
        HandlerType::Init => {
            let input_fn_ident = Ident::new(
                &(input_fn.sig.ident.to_string() + "_init_glue"),
                input_fn.sig.ident.span(),
            );
            let wrapper_fn_ident = Ident::new("init", input_fn.sig.ident.span());
            // rename the original attributed fn
            input_fn.sig.ident = input_fn_ident.clone();

            // create a new "main" function that calls the original attributed function
            let wrapper_fn = quote! {
                pub async fn #wrapper_fn_ident() -> Result<(), ::activity::wasm_bindgen::JsValue> {
                    #input_fn_ident().await
                }
            };

            let wasm_bindgen_code =
                wasm_bindgen_macro_support::expand(TokenStream::new().into(), wrapper_fn)
                    .expect("wasm_bindgen macro failed to expand");

            let output = quote! {
                #input_fn

                mod _activity_on_init {
                    use ::activity::{wasm_bindgen, wasm_bindgen_futures};
                    use super::#input_fn_ident;
                    #wasm_bindgen_code
                }
            };

            TokenStream::from(output)
        }
        HandlerType::Ready => {
            let input_fn_ident = Ident::new(
                &(input_fn.sig.ident.to_string() + "_ready_glue"),
                input_fn.sig.ident.span(),
            );
            let wrapper_fn_ident = Ident::new("on_ready", input_fn.sig.ident.span());
            // rename the original attributed fn
            input_fn.sig.ident = input_fn_ident.clone();

            // create a new "main" function that calls the original attributed function
            let wrapper_fn = quote! {
                pub async fn #wrapper_fn_ident(v: ::activity::wasm_bindgen::JsValue) -> Result<(), ::activity::wasm_bindgen::JsValue> {
                    let e: ::activity::ReadyEvent = ::activity::serde_wasm_bindgen::from_value(v)?;

                    #input_fn_ident(e).await
                }
            };

            let wasm_bindgen_code =
                wasm_bindgen_macro_support::expand(TokenStream::new().into(), wrapper_fn)
                    .expect("wasm_bindgen macro failed to expand");

            let output = quote! {
                #input_fn

                mod _activity_on_ready {
                    use ::activity::{wasm_bindgen, wasm_bindgen_futures};
                    use super::#input_fn_ident;
                    #wasm_bindgen_code
                }
            };

            TokenStream::from(output)
        }
        HandlerType::Error => {
            let input_fn_ident = Ident::new(
                &(input_fn.sig.ident.to_string() + "_error_glue"),
                input_fn.sig.ident.span(),
            );
            let wrapper_fn_ident = Ident::new("on_error", input_fn.sig.ident.span());
            // rename the original attributed fn
            input_fn.sig.ident = input_fn_ident.clone();

            // create a new "main" function that calls the original attributed function
            let wrapper_fn = quote! {
                pub async fn #wrapper_fn_ident(v: ::activity::wasm_bindgen::JsValue) -> Result<(), ::activity::wasm_bindgen::JsValue> {
                    let e: ::activity::ErrorEvent = ::activity::serde_wasm_bindgen::from_value(v)?;

                    #input_fn_ident(e).await
                }
            };

            let wasm_bindgen_code =
                wasm_bindgen_macro_support::expand(TokenStream::new().into(), wrapper_fn)
                    .expect("wasm_bindgen macro failed to expand");

            let output = quote! {
                #input_fn

                mod _activity_on_error {
                    use ::activity::{wasm_bindgen, wasm_bindgen_futures};
                    use super::#input_fn_ident;
                    #wasm_bindgen_code
                }
            };

            TokenStream::from(output)
        }
        HandlerType::VoiceStateUpdate => {
            let input_fn_ident = Ident::new(
                &(input_fn.sig.ident.to_string() + "_voice_state_update_glue"),
                input_fn.sig.ident.span(),
            );
            let wrapper_fn_ident = Ident::new("on_voice_state_update", input_fn.sig.ident.span());
            // rename the original attributed fn
            input_fn.sig.ident = input_fn_ident.clone();

            // create a new "main" function that calls the original attributed function
            let wrapper_fn = quote! {
                pub async fn #wrapper_fn_ident(v: ::activity::wasm_bindgen::JsValue) -> Result<(), ::activity::wasm_bindgen::JsValue> {
                    let e: ::activity::VoiceStateUpdateEvent = ::activity::serde_wasm_bindgen::from_value(v)?;

                    #input_fn_ident(e).await
                }
            };

            let wasm_bindgen_code =
                wasm_bindgen_macro_support::expand(TokenStream::new().into(), wrapper_fn)
                    .expect("wasm_bindgen macro failed to expand");

            let output = quote! {
                #input_fn

                mod _activity_on_voice_state_update {
                    use ::activity::{wasm_bindgen, wasm_bindgen_futures};
                    use super::#input_fn_ident;
                    #wasm_bindgen_code
                }
            };

            TokenStream::from(output)
        }
    }
}
