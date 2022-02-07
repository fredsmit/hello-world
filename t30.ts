import { getRequiredHTMLElements } from "./pageUtils.js";

const { largeImg, thumbs } = getRequiredHTMLElements("largeImg", "thumbs");

thumbs.addEventListener("click", getClickHandler());
addFocusHandler(thumbs, largeImg);

function getClickHandler() {
    return function (this: HTMLElement, ev: MouseEvent): void {
        if (ev.type === "click" && ev.target instanceof HTMLElement) {
            const a = ev.target.closest<HTMLElementTagNameMap["a"]>("a[href]");
            if (a) {
                ev.preventDefault();
            }
        }
    };
}

function addFocusHandler(form: HTMLElement, display: HTMLElement) {
    // "focus": FocusEvent;    bubbles:false
    // "focusin": FocusEvent;  bubbles:true
    // "focusout": FocusEvent; bubbles:true

    if (!(display instanceof HTMLImageElement))
        throw Error("Display must be of type: img.");

    const anchors: HTMLAnchorElement[] = Array.from(
        form.querySelectorAll<HTMLElementTagNameMap["a"]>("a[href]")
    );

    let currentHref: string | null | undefined;

    anchors.forEach(anchor => {
        anchor.addEventListener("focus", function (this: HTMLElement, ev: FocusEvent) {
            if (ev.type === "focus" && ev.target instanceof HTMLAnchorElement) {
                const target = ev.target;
                if (currentHref !== target.href) {
                    currentHref = target.href;
                    console.log("changeTo:", currentHref);
                    display.src = currentHref;
                    display.title = target.title;
                } else {
                    console.log("currentHref:", currentHref);
                }
            }
        });
    });
}

export { };
