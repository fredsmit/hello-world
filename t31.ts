import { getRequiredHTMLElements } from "./pageUtils.js"

const { btnAuto, btnGenerate } = getRequiredHTMLElements("btnAuto", "btnGenerate");


document.body.addEventListener("kuku", function (this: HTMLElement, ev: Event) {
    console.log("document.body:", ev);
});

btnAuto.addEventListener("kuku", function (this: HTMLElement, ev: Event) {
    console.log("btnAuto:", ev);
});

btnGenerate.addEventListener("click", function (this: HTMLElement, ev: MouseEvent) {
    const kukuEvent = new Event("kuku", { bubbles: true } as EventInit);
    console.log("btnGenerate:", kukuEvent);
    btnAuto.dispatchEvent(kukuEvent);

    const mouseEventInit: MouseEventInit = {
        bubbles: true,
        clientX: 10,
        clientY: 20
    };
    const mouseEvent = new MouseEvent("kuku", mouseEventInit);
    console.log("btnGenerate:", mouseEvent);
    btnAuto.dispatchEvent(mouseEvent);

});

// MouseEventInit extends EventModifierInit {
//     button?: number;
//     buttons?: number;
//     clientX?: number;
//     clientY?: number;
//     movementX?: number;
//     movementY?: number;
//     relatedTarget?: EventTarget | null;
//     screenX?: number;
//     screenY?: number;
// }

// interface EventModifierInit extends UIEventInit {
//     altKey?: boolean;
//     ctrlKey?: boolean;
//     metaKey?: boolean;
//     modifierAltGraph?: boolean;
//     modifierCapsLock?: boolean;
//     modifierFn?: boolean;
//     modifierFnLock?: boolean;
//     modifierHyper?: boolean;
//     modifierNumLock?: boolean;
//     modifierScrollLock?: boolean;
//     modifierSuper?: boolean;
//     modifierSymbol?: boolean;
//     modifierSymbolLock?: boolean;
//     shiftKey?: boolean;
// }

// interface UIEventInit extends EventInit {
//     detail?: number;
//     view?: Window | null;
//     /** @deprecated */
//     which?: number;
// }

// interface CustomEventInit<T = any> extends EventInit {
//     detail?: T;
// }

// interface EventInit {
//     bubbles?: boolean;
//     cancelable?: boolean;
//     composed?: boolean;
// }



export { };

