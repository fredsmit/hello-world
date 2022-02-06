import { getRequiredHTMLElements } from "./pageUtils.js"

const { dvTablo } = getRequiredHTMLElements("dvTablo");

dvTablo.addEventListener("click", removePaneListener);

const createRemoveButton = get_createRemoveButton();

const paneCollection = dvTablo.querySelectorAll("*.pane");
for (const pane of paneCollection) {
    const removeButton = createRemoveButton();
    removeButton.style.float = "right";
    pane.prepend(removeButton);
}

function removePaneListener(this: unknown, ev: MouseEvent) {
    if (this instanceof HTMLDivElement &&
        ev.target instanceof HTMLButtonElement &&
        ev.type === "click"
    ) {
        const pane = ev.target.closest("*.pane") as HTMLElement;
        if (pane) {
            pane.style.color = "gray";
            pane.style.backgroundColor = "silver";
            if (pane.dataset["keep"] === "1") {
                ev.target.remove();
            } else {
                setTimeout((pane: Element) => {
                    pane.remove();
                }, 1500, pane);

            }
        }
    }
}

function get_createRemoveButton(): () => HTMLButtonElement {
    const button = document.createElement("button");
    //button.textContent = "X";
    button.textContent = "Remove";
    button.className = "remove-button";

    const buttonListener = function (this: HTMLButtonElement, ev: MouseEvent): void {
        const color = ev.type === "mouseenter" ? "red" : "";
        this.style.color = color;
        this.style.borderColor = color;
    };

    return () => {
        const buttonCopy = button.cloneNode(true) as HTMLButtonElement;
        buttonCopy.addEventListener("mouseenter", buttonListener);
        buttonCopy.addEventListener("mouseleave", buttonListener);
        return buttonCopy;
    }
}

export { };
