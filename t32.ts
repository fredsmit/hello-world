import { getRequiredHTMLElements } from "./pageUtils.js"

const {
    rabbit, btnHide, btnShow
} = getRequiredHTMLElements("rabbit", "btnHide", "btnShow");

btnHide.addEventListener("click", getClickHandler(rabbit))
btnShow.addEventListener("click", function (this: HTMLElement, ev: MouseEvent) {
    rabbit.hidden = false;
});

function getClickHandler(rabbit: HTMLElement) {

    rabbit.addEventListener('hide', getHideHandler());

    return function (this: HTMLElement, ev: MouseEvent) {
        const hideEvent = new CustomEvent("hide", {
            cancelable: true // without that flag preventDefault doesn't work
        });
        const notPrevented = rabbit.dispatchEvent(hideEvent);
        if (notPrevented) {
            rabbit.hidden = true;
        } else {
            alert("The action was prevented by the 'hide' handler");
        }

    };
}

function getHideHandler(): EventListenerObject {

    function handleEvent(ev: Event): void {
        console.log("handleEvent:", ev);

        if (confirm("Call preventDefault?")) {
            ev.preventDefault();
        }
    }

    const eventListenerObject: EventListenerObject = {
        handleEvent
    };

    return eventListenerObject;
}

// interface CustomEvent<T = any> extends Event {
//     /** Returns any custom data event was created with. Typically used for synthetic events. */
//     readonly detail: T;
//     /** @deprecated */
//     initCustomEvent(type: string, bubbles?: boolean, cancelable?: boolean, detail?: T): void;
// }

// declare var CustomEvent: {
//     prototype: CustomEvent;
//     new<T>(type: string, eventInitDict?: CustomEventInit<T>): CustomEvent<T>;
// };


export { };

