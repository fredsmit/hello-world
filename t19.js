const removeButton = getRemoveButton();
if (removeButton === null)
    throw Error("Required 'remove-button' not found.");
const paneHeaderCollection = document.body.querySelectorAll("div.pane h3");
for (const paneHeader of paneHeaderCollection) {
    const removeButtonCopy = removeButton.cloneNode(true);
    removeButtonCopy.addEventListener("click", clickHandler);
    paneHeader.append(removeButtonCopy);
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
function getRemoveButton() {
    const removeButtonCollection = document.body.getElementsByClassName("remove-button");
    if (removeButtonCollection.length > 0) {
        const removeButton = removeButtonCollection[0];
        removeButton.remove();
        return removeButton;
    }
    return null;
}
export {};
