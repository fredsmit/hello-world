import { getRequiredHTMLElements } from "./pageUtils.js";
const { largeImg, thumbs } = getRequiredHTMLElements("largeImg", "thumbs");
//thumbs.addEventListener("click", getClickHandler());
addFocusHandler(thumbs, largeImg);
function getClickHandler() {
    return function (ev) {
        if (ev.type === "click" && ev.target instanceof HTMLElement) {
            const a = ev.target.closest("a[href]");
            if (a) {
                ev.preventDefault();
            }
        }
    };
}
function addFocusHandler(form, display) {
    // "focus": FocusEvent;    bubbles:false
    // "focusin": FocusEvent;  bubbles:true
    // "focusout": FocusEvent; bubbles:true
    if (!(display instanceof HTMLImageElement))
        throw Error("Display must be of type: img.");
    const anchors = Array.from(form.querySelectorAll("a[href]"));
    let currentHref;
    anchors.forEach(anchor => {
        anchor.addEventListener("focus", function (ev) {
            if (ev.type === "focus" && ev.target instanceof HTMLAnchorElement) {
                const target = ev.target;
                if (currentHref !== target.href) {
                    currentHref = target.href;
                    console.log("changeTo:", currentHref);
                    display.src = currentHref;
                    display.title = target.title;
                }
                else {
                    console.log("currentHref:", currentHref);
                }
            }
        });
    });
}
