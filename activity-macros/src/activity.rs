use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, Ident, ItemFn};

pub fn expand_macro(_attr: TokenStream, item: TokenStream) -> TokenStream {
    let mut input_fn = parse_macro_input!(item as ItemFn);

    let input_fn_ident = Ident::new(
        &(input_fn.sig.ident.to_string() + "_start_glue"),
        input_fn.sig.ident.span(),
    );
    let wrapper_fn_ident = Ident::new("start", input_fn.sig.ident.span());
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

        mod _activity_start {
            use ::activity::{wasm_bindgen, wasm_bindgen_futures};
            use super::#input_fn_ident;
            #wasm_bindgen_code
        }
    };

    TokenStream::from(output)
}
