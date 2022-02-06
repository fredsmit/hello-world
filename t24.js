import { getRequiredHTMLElements } from "./pageUtils.js";
const { dvTablo } = getRequiredHTMLElements("dvTablo");
function removePaneListener(ev) {
    if (this instanceof HTMLDivElement &&
        ev.target instanceof HTMLButtonElement &&
        ev.type === "click") {
        const pane = ev.target.closest("*.pane");
        if (pane) {
            pane.style.color = "gray";
            pane.style.backgroundColor = "silver";
            if (pane.dataset["keep"] === "1") {
                ev.target.remove();
            }
            else {
                setTimeout((pane) => {
                    pane.remove();
                }, 1500, pane);
            }
        }
    }
}
dvTablo.addEventListener("click", removePaneListener);
const cloneRemoveButton = get_cloneRemoveButton();
const paneCollection = dvTablo.querySelectorAll("*.pane");
for (const pane of paneCollection) {
    const removeButtonCopy = cloneRemoveButton();
    removeButtonCopy.style.float = "right";
    pane.prepend(removeButtonCopy);
}
function get_cloneRemoveButton() {
    const button = document.createElement("button");
    //button.textContent = "X";
    button.textContent = "Remove";
    button.className = "remove-button";
    const buttonListener = function (ev) {
        const color = ev.type === "mouseenter" ? "red" : "";
        this.style.color = color;
        this.style.borderColor = color;
    };
    return () => {
        const buttonCopy = button.cloneNode(true);
        buttonCopy.addEventListener("mouseenter", buttonListener);
        buttonCopy.addEventListener("mouseleave", buttonListener);
        return buttonCopy;
    };
}
