// KeyboardEvent
document["checkPhoneKey"] = function (key) {
    console.log(key);
    return (key >= '0' && key <= '9') || ['+', '(', ')', '-', ' '].includes(key) ||
        ["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(key);
};
const keyboardListener = getKeyboardListener();
document.addEventListener("keydown", keyboardListener);
document.addEventListener("keyup", keyboardListener);
function getKeyboardListener() {
    let prevCodes = new Set();
    // const keyQ = "KeyQ";
    // const keyW = "KeyW";
    const codes = ["KeyQ", "KeyW"];
    function action() {
        if (codes.every(code => prevCodes.has(code))) {
            alert(`OK: ${Array.from(prevCodes).join(", ")}`);
            prevCodes.clear();
        }
        // if (prevCodes.has(keyQ) && prevCodes.has(keyW)) {
        //     prevCodes.clear();
        //     alert("OK");
        // }
    }
    // "KeyW"
    return function (ev) {
        if (ev.type === "keydown") {
            if (!ev.repeat) {
                prevCodes.add(ev.code);
                action();
            }
        }
        else if (ev.type === "keyup") {
            prevCodes.delete(ev.code);
        }
        else {
        }
    };
}
function _getKeyDownListener() {
    let prevCode;
    const keyQ = "KeyQ";
    const keyW = "KeyW";
    // "KeyW"
    return function (ev) {
        switch (ev.code) {
            case keyQ:
                if (prevCode === keyW) {
                    prevCode = null;
                    alert("WQ");
                }
                else {
                    prevCode = ev.code;
                }
                break;
            case keyW:
                if (prevCode === keyQ) {
                    prevCode = null;
                    alert("QW");
                }
                else {
                    prevCode = ev.code;
                }
                break;
            default:
                prevCode = null;
                break;
        }
    };
}
export {};
