export const startBackPress = function (fn) {
    return function() {
        window.addEventListener("message", (ev) => {
            fn("backpress")();
        })
    }
}