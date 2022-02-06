import { getRequiredHTMLElements } from "./pageUtils.js"

const { tree } = getRequiredHTMLElements("tree");

normalizeTree(tree);
tree.addEventListener("mouseenter", getHandler());
tree.addEventListener("mouseleave", getHandler());
tree.addEventListener("click", getHandler());

function normalizeTree(tree: HTMLElement) {
    for (const li of tree.querySelectorAll('li')) {
        const uls = li.getElementsByTagName("ul");
        if (uls.length > 0) {

            const textNodes = [] as Text[];
            for (const textNode of li.childNodes) {
                if (textNode instanceof Text) {
                    textNodes.push(textNode);
                } else if (textNode instanceof HTMLUListElement) {
                    break;
                }
            }

            const textBeforeList = textNodes.reduce((sum, textNode) => {
                const normText = (textNode.textContent ?? "").trim();
                if (normText) {
                    sum.push(normText);
                }
                return sum;
            }, [] as string[]).join(" ");

            textNodes.forEach(textNode => {
                textNode.remove();
            });

            if (textBeforeList) {
                const ulFirst = uls[0];
                let span = document.createElement('span');
                span.append(textBeforeList);
                ulFirst.before(span);
            }

            // li.prepend(span);
            // const text = span.nextSibling;
            // if (text instanceof Text) {
            //     span.append((text.textContent ?? "").trim()); // move the text node into span
            //     text.remove();
            // }
        }

    }
}

function getHandler() {
    return function (this: HTMLElement, ev: MouseEvent): void {
        if (ev.type === "mouseenter") {
            this.style.border = "1px solid green";
        } else if (ev.type === "mouseleave") {
            this.style.border = "1px solid silver";
        } else if (ev.type === "click") {
            const target = ev.target;

            if (target instanceof HTMLSpanElement &&
                target.parentElement instanceof HTMLElement &&
                target.nextSibling instanceof HTMLUListElement
            ) {
                const uls = Array.from(target.parentElement.children)
                    .filter(_ => _ instanceof HTMLUListElement) as HTMLUListElement[];
                uls.forEach(ul => {
                    ul.hidden = !ul.hidden;
                    target.style.textDecoration = ul.hidden ? "underline dashed dimgray" : "none";
                });
            }
        }
    };
}


export { };

