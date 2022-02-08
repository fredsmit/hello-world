import { getRequiredHTMLElements } from "./pageUtils.js"

const { container, table } = getRequiredHTMLElements("container", "table");

container.onmouseover = container.onmouseout = handler;

function handler(event: MouseEvent) {
    console.log(event.target, event.relatedTarget);
    if (event.target instanceof HTMLElement) {
        if (event.type === 'mouseover') {
            event.target.style.background = 'pink'
        } else if (event.type === 'mouseout') {
            event.target.style.background = ''
        }
    }
}

addMouseEnterLeaveHandler(table);

function addMouseEnterLeaveHandler(table: HTMLElement) {

    if (!(table instanceof HTMLTableElement))
        throw Error("Argument 'table' must be of HTMLTableElement type.");

    const cells = Array.from(table.querySelectorAll("td"));

    cells.forEach(cell => {
        cell.addEventListener("mouseenter", mouseEnterLeaveHandler);
        cell.addEventListener("mouseleave", mouseEnterLeaveHandler);
    });

    function mouseEnterLeaveHandler(this: HTMLElement, ev: MouseEvent): void {
        //if (ev.target instanceof HTMLTableCellElement && cells.includes(ev.target)) {
        if (ev.target instanceof HTMLTableCellElement) {
            if (ev.type === "mouseenter") {
                ev.target.style.background = "pink";
            } else if (ev.type === "mouseleave") {
                ev.target.style.background = "";
            }
        }
    }
}

export { };

