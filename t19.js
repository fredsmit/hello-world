const cloneRemoveButton = get_cloneRemoveButton();
if (cloneRemoveButton === null)
    throw Error("Required 'remove-button' not found.");
const paneHeaderCollection = document.body.querySelectorAll("div.pane h3");
for (const paneHeader of paneHeaderCollection) {
    const removeButtonCopy = cloneRemoveButton();
    removeButtonCopy.addEventListener("click", clickHandler);
    paneHeader.append(removeButtonCopy);
    const pane = paneHeader.parentElement;
    if (pane) {
        const removeButtonCopy2 = cloneRemoveButton();
        removeButtonCopy2.style.float = "right";
        removeButtonCopy2.addEventListener("click", clickHandler);
        pane.prepend(removeButtonCopy2);
    }
}
function clickHandler(ev) {
    for (const el of ev.composedPath()) {
        if (el instanceof Element && el.classList.contains("pane")) {
            el.remove();
            break;
        }
    }
}
;
function get_cloneRemoveButton() {
    const removeButtonCollection = document.body.getElementsByClassName("remove-button");
    if (removeButtonCollection.length > 0) {
        const removeButton = removeButtonCollection[0];
        if (removeButton instanceof HTMLElement) {
            removeButton.remove();
            return () => {
                return removeButton.cloneNode(true);
            };
        }
    }
    return null;
}
export {};
