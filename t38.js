import { findClosestTarget, getRequiredHTMLElements } from "./pageUtils.js";
const { dvClear } = getRequiredHTMLElements("dvClear");
let isDragging = false;
let zIndex = 999;
document.addEventListener('mousedown', function (ev) {
    if (isDragging) {
        return;
    }
    const dragElement = findClosestTarget(ev.target, "*.draggable");
    if (!dragElement)
        return;
    ev.preventDefault();
    dragElement.ondragstart = function () { return false; };
    startDrag(dragElement, ev.clientX, ev.clientY);
    // on drag start:
    //   remember the initial shift
    //   move the element position:fixed and a direct child of body
    function startDrag(dragElement, clientX, clientY) {
        isDragging = true;
        dragElement.addEventListener('mouseup', onMouseUp, { once: true });
        document.addEventListener('mousemove', onMouseMove);
        const dragElementClientRect = dragElement.getBoundingClientRect();
        const shiftX = clientX - dragElementClientRect.left;
        const shiftY = clientY - dragElementClientRect.top;
        dragElement.style.position = 'fixed';
        dragElement.style.zIndex = String(++zIndex);
        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
        }
        moveAt(clientX, clientY);
        function moveAt(clientX, clientY) {
            // new window-relative coordinates
            let newX = clientX - shiftX;
            let newY = clientY - shiftY;
            // check if the new coordinates are below the bottom window edge
            const newBottom = newY + dragElement.offsetHeight; // new bottom
            //const bottomLimit = dvClear.getBoundingClientRect().top;
            const bottomLimit = dvClear.getBoundingClientRect().bottom;
            //const bottomLimit = document.documentElement.clientHeight;
            // console.log("bottomLimit:", bottomLimit);
            //console.log("bottomLimit.bottom:", dvClear.getBoundingClientRect().bottom);
            //console.log("document.documentElement.clientHeight:", document.documentElement.clientHeight);
            //console.log("document.documentElement.getBoundingClientRect()", document.documentElement.getBoundingClientRect());
            // below the window? let's scroll the page
            if (newBottom > bottomLimit) {
                // window-relative coordinate of document end
                let docBottom = document.documentElement.getBoundingClientRect().bottom;
                // scroll the document down by 10px has a problem
                // it can scroll beyond the end of the document
                // Math.min(how much left to the end, 10)
                // calculations are imprecise, there may be rounding errors that lead to scrolling up
                // that should be impossible, fix that here
                const scrollByY = Math.max(0, Math.min(docBottom - newBottom, 10));
                const scrollByX = 0;
                window.scrollBy(scrollByX, scrollByY);
                // a swift mouse move make put the cursor beyond the document end
                // if that happens -
                // limit the new Y by the maximally possible (right at the bottom of the document)
                //newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
                newY = Math.min(newY, bottomLimit - dragElement.offsetHeight);
            }
            // check if the new coordinates are above the top window edge (similar logic)
            if (newY < 0) {
                // scroll up
                let scrollY = Math.min(-newY, 10);
                if (scrollY < 0)
                    scrollY = 0; // check precision errors
                window.scrollBy(0, -scrollY);
                // a swift mouse move can put the cursor beyond the document start
                newY = Math.max(newY, 0); // newY may not be below 0
            }
            // limit the new X within the window boundaries
            // there's no scroll here so it's simple
            if (newX < 0)
                newX = 0;
            if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
                newX = document.documentElement.clientWidth - dragElement.offsetWidth;
            }
            dragElement.style.left = newX + 'px';
            dragElement.style.top = newY + 'px';
        }
        function onMouseUp(event) {
            finishDrag();
        }
        ;
        // switch to absolute coordinates at the end, to fix the element in the document
        function finishDrag() {
            isDragging = false;
            if (dragElement.style.position === "absolute") {
                console.log("==> Drop:", dragElement.style.position);
            }
            else if (dragElement.style.position === "fixed") {
                console.log("==> Drop:", "fixed => absolute");
                // const top = dragElement.style.top;
                // const absTop = Math.round(parseFloat(top) + window.scrollY);
                // console.log("top + window.scrollY = absTop:", Math.round(parseFloat(top)), " + " + Math.round(window.scrollY), " = ", absTop);
                const fixedY = dragElement.getBoundingClientRect().y;
                const absTop = Math.round(window.scrollY + fixedY);
                //console.log("window.scrollY + clientRect.y = absTop:", window.scrollY, " + " + dragElement.getBoundingClientRect().y, " = ", absTop);
                dragElement.style.top = absTop + 'px';
                dragElement.style.position = 'absolute';
            }
            else {
                console.log("dragElement.style.position:", dragElement.style.position, "not supported");
            }
            dragElement.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    }
    ;
});
