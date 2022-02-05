import { getRequiredHTMLElements } from "./pageUtils.js";

const { carousel } = getRequiredHTMLElements("carousel");

let i = 1;
for (const li of document.body.querySelectorAll("li")) {
    for (const img of li.getElementsByTagName("img")) {
        img.title = String(i);
    }
    i++;
}


const arrawHandler = getArrowHandler();

for (const arrow of document.body.querySelectorAll(".arrow")) {
    arrow.addEventListener("click", arrawHandler);
}

function getArrowHandler(ribbonLength: number = 3): EventListenerObject {

    let currentVisible = 0;

    function display() {
        const lis = carousel.querySelectorAll("li");
        currentVisible = Math.max(0, Math.min(currentVisible, lis.length - ribbonLength));

        let i = 0;
        for (const li of lis) {
            const display = i < currentVisible || i >= currentVisible + ribbonLength ? "none" : "";
            li.style.display = display;
            i++;
        }
    }

    display();

    return {
        handleEvent: function (ev: Event): void {
            const target = ev.target;
            if (target instanceof HTMLElement) {
                const textContent = target.textContent ?? "";
                if (textContent.includes("⇦")) {
                    currentVisible--;
                } else if (textContent.includes("⇨")) {
                    currentVisible++;
                }

                display();
            }
        }
    }
}

export { };

