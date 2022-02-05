import { getRequiredHTMLElements } from "./pageUtils.js";
const { dvForm, dvDiv, dvP } = getRequiredHTMLElements("dvForm", "dvDiv", "dvP");
// document.onclick = function (this: unknown, ev: Event) {
//     alert("document");
// };
// dvP.onclick = onClickHandler;
// dvDiv.onclick = onClickHandler;
// dvForm.onclick = onClickHandler;
function onClickHandler(event) {
    if (this === dvForm)
        event.stopPropagation();
    if (event.target && event.target instanceof HTMLElement) {
        if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
            if (event.eventPhase === event.AT_TARGET) {
                event.currentTarget.style.backgroundColor = 'yellow';
            }
        }
        const target = event.target;
        console.log("target:" + target.tagName);
        if (this instanceof HTMLElement) {
            console.log("this:", this.tagName);
            console.log("currentTarget:", Object.prototype.toString.call(event.currentTarget));
        }
        // chrome needs some time to paint yellow
        setTimeout((target) => {
            target.style.backgroundColor = '';
            // if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
            //     event.currentTarget.style.backgroundColor = '';
            //     // if (event.eventPhase === event.AT_TARGET) {
            //     //     event.currentTarget.style.backgroundColor = '';
            //     // }
            // }
        }, 1000, target);
    }
}
;
function getHandler(msg, thisObject) {
    function handleEvent(ev) {
        const what = {
            msg: msg ?? "",
            eventPhase: ev.eventPhase,
            target: ev.target,
            currentTarget: ev.currentTarget
        };
        // event.eventPhase – the current phase (capturing=1, target=2, bubbling=3).
        // if (msg === "p c")
        //     ev.stopPropagation();
        console.log("what:", what, this);
    }
    const o = {
        msg,
        thisObject
    };
    return Object.assign(o, { handleEvent });
}
//const handler = getHandler();
// dvP.addEventListener("click", getHandler("p b"), { capture: false });
// dvDiv.addEventListener("click", getHandler("div b"), { capture: false });
// dvForm.addEventListener("click", getHandler("form b"), { capture: false });
// dvForm.addEventListener("click", getHandler("form c", dvForm), { capture: true });
// dvDiv.addEventListener("click", getHandler("div c"), { capture: true });
// dvP.addEventListener("click", getHandler("p c"), { capture: true });
dvP.addEventListener("click", getHandler("p b1"), { capture: false });
dvP.addEventListener("click", getHandler("p b2"), { capture: false });
dvP.addEventListener("click", getHandler("p c1"), { capture: true });
dvP.addEventListener("click", getHandler("p b3"), { capture: false });
dvP.addEventListener("click", getHandler("p c2"), { capture: true });
dvP.addEventListener("click", getHandler("p b4"), { capture: false });
