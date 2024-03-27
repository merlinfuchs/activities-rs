pub use web_sys;

pub mod sdk;

#[macro_export]
macro_rules! console_debug {
    ($($t:tt)*) => {
        $crate::web_sys::console::debug_1(&format_args!($($t)*).to_string().into())
    }
}

#[macro_export]
macro_rules! console_log {
    ($($t:tt)*) => {
        $crate::web_sys::console::log_1(&format_args!($($t)*).to_string().into())
    }
}

#[macro_export]
macro_rules! console_warn {
    ($($t:tt)*) => {
        $crate::web_sys::console::warn_1(&format_args!($($t)*).to_string().into())
    }
}

#[macro_export]
macro_rules! console_error {
    ($($t:tt)*) => {
        $crate::web_sys::console::error_1(&format_args!($($t)*).to_string().into())
    }
}
