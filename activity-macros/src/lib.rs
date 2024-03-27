use proc_macro::TokenStream;

mod activity;

#[proc_macro_attribute]
pub fn activity(attr: TokenStream, item: TokenStream) -> TokenStream {
    activity::expand_macro(attr, item)
}
