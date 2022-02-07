import { getRequiredHTMLElements } from "./pageUtils.js";
const { rabbit, btnHide, btnShow } = getRequiredHTMLElements("rabbit", "btnHide", "btnShow");
btnHide.addEventListener("click", getClickHandler(rabbit));
btnShow.addEventListener("click", function (ev) {
    rabbit.hidden = false;
});
function getClickHandler(rabbit) {
    rabbit.addEventListener('hide', getHideHandler());
    return function (ev) {
        const hideEvent = new CustomEvent("hide", {
            cancelable: true // without that flag preventDefault doesn't work
        });
        const notPrevented = rabbit.dispatchEvent(hideEvent);
        if (notPrevented) {
            rabbit.hidden = true;
        }
        else {
            alert("The action was prevented by the 'hide' handler");
        }
    };
}
function getHideHandler() {
    function handleEvent(ev) {
        console.log("handleEvent:", ev);
        if (confirm("Call preventDefault?")) {
            ev.preventDefault();
        }
    }
    const eventListenerObject = {
        handleEvent
    };
    return eventListenerObject;
}
