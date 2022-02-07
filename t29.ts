import { getRequiredHTMLElements } from "./pageUtils.js";

const { contents, btnAddContent } = getRequiredHTMLElements("contents", "btnAddContent");

contents.addEventListener("click", getContentsHandler())
btnAddContent.addEventListener("click", getAddContentHandler(contents));

function getContentsHandler(): EventListenerObject {
    return {
        handleEvent(ev: MouseEvent): void {
            if (ev.type === "click" && ev.target instanceof HTMLElement) {
                //console.log("handleEvent:", ev.target);
                const a = ev.target.closest("a");
                if (a) {
                    console.log(ev.target.textContent, a.href);
                    const prompt = `

Click "OK" to visit this site, otherwise click "Cancel".
Site: ${ev.target.textContent}  @  ${a.href}

`;
                    if (!window.confirm(prompt)) {
                        ev.preventDefault();
                    }
                }
            }

        }
    };
}

function getAddContentHandler(container: HTMLElement): EventListenerObject {

    const handlerData = {
        container,
        links: [
            "link1", "link2", "link3",
            "https://javascript.info/default-browser-action",
            "https://deno.land/"
        ]
    };

    let clickCount = 0;
    const contentLength = handlerData.links.length;

    function getLinkElement(link: string, n: number): HTMLDivElement {
        const div = document.createElement("div");

        const span = document.createElement("span");
        span.textContent = String(n) + ".\xA0"
        div.append(span);

        const a = document.createElement("a");
        a.href = link;
        a.textContent = `Visit: ${link}`;
        div.append(a);

        return div;
    }

    return {
        handleEvent(ev: MouseEvent): void {
            if (ev.type === "click" && ev.target instanceof HTMLElement) {
                ++clickCount;
                const randomIndex = Math.floor(Math.random() * contentLength);
                const link = handlerData.links[randomIndex];
                const newContentElement = getLinkElement(link, clickCount);
                handlerData.container.append(newContentElement);
            }
        }
    };
}

export { };

