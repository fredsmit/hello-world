import { getRequiredHTMLElements } from "./pageUtils.js";
const { tbl1 } = getRequiredHTMLElements("tbl1");
function getHandler(src, msg) {
    let selectedCell;
    function handleEvent(ev) {
        // if (ev.eventPhase === Event.AT_TARGET) {
        //     // console.log("Event.AT_TARGET");
        //     return;
        // }
        const what = {
            msg: msg ?? "",
            eventPhase: ev.eventPhase,
            target: ev.target,
            currentTarget: ev.currentTarget,
            this: this
        };
        console.log("what:", what);
        //console.log("capturing, target, bubbling, eventPhase:", Event.CAPTURING_PHASE, Event.AT_TARGET, Event.BUBBLING_PHASE, ev.eventPhase);
        if (ev.type === "click") {
            if (ev.eventPhase === Event.CAPTURING_PHASE) {
                if (ev.target instanceof HTMLElement) {
                    if (ev.target instanceof HTMLTableCellElement && ev.target.tagName === "TD") {
                        highlight(ev.target);
                    }
                    else {
                        let td = ev.target.closest('td'); // (1)
                        if (td) {
                            highlight(td);
                            console.log("closest");
                        }
                    }
                }
            }
        }
    }
    const o = {
        msg,
        src
    };
    function highlight(td) {
        console.log("highlight");
        if (selectedCell) { // remove the existing highlight if any
            selectedCell.classList.remove('highlight');
        }
        selectedCell = td;
        selectedCell.classList.add('highlight'); // highlight the new td
    }
    return Object.assign(o, { handleEvent });
}
tbl1.addEventListener("click", getHandler(tbl1, "tbl1-c"), true);
tbl1.addEventListener("click", getHandler(tbl1, "tbl1-b"));
