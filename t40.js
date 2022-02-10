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
    const prevCodes = new Set();
    const codes = ["KeyQ", "KeyW"];
    function action() {
        if (codes.every(code => prevCodes.has(code))) {
            alert(`OK: ${Array.from(prevCodes).join(", ")}`);
            prevCodes.clear();
        }
    }
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
while (true) {
    const scrollBottom = getScrollBottom();
    if (scrollBottom > 0)
        break;
    appendDiv("clack");
}
window.addEventListener('scroll', function () {
    const scrollBottom = getScrollBottom();
    //console.log("scrollBottom:", scrollBottom);
    if (scrollBottom < 10) {
        appendDiv("blue");
        window.setTimeout(() => {
            console.log("scrollBottom => scrollBottom:", scrollBottom, getScrollBottom());
        });
    }
});
function getScrollBottom() {
    return document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);
}
function appendDiv(color) {
    const div = document.createElement("div");
    div.style.color = color;
    div.textContent = "1:" + new Date().toString();
    document.body.append(div);
    const div2 = document.createElement("div");
    div2.style.color = color;
    div2.textContent = "2:" + new Date().toString();
    document.body.append(div2);
    const div3 = document.createElement("div");
    div3.style.color = color;
    div3.textContent = "\xA0";
    document.body.append(div3);
}
export {};
