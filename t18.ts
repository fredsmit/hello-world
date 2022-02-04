const expandArrow = "▶";
const collapseArrow = "▼";

const ul = document.body.querySelector("ul");
const textNodes = [] as [Text, string][];

if (ul) {
    for (const node of document.body.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node instanceof Text) {
            const text = (node.textContent ?? "").trim();
            if (text.includes(expandArrow) && text.includes(collapseArrow)) {
                textNodes.push([node, text]);
            }
        }
        if (node === ul) {
            break;
        }
    }

    const toggleNodeAndText: [Text, string] | null = (textNodes.length > 0)
        ? textNodes[textNodes.length - 1]
        : null;

    if (toggleNodeAndText) {
        const [toggleNode, toggleText] = toggleNodeAndText;
        //console.log(toggleText);
        //console.log(toggleNode);
        const idx = Math.max(toggleText.lastIndexOf(expandArrow), toggleText.lastIndexOf(collapseArrow));

        const text = toggleText.slice(idx + 1).trim();
        //console.log(text);

        const span = document.createElement("div");
        //span.classList.add("expander");
        span.dataset["expanded"] = "true";
        span.textContent = collapseArrow + "\xA0" + text;

        document.body.removeChild(toggleNode);
        ul!.before(span);

        span.addEventListener("click", (ev: MouseEvent) => {
            let isExpanded = span.dataset["expanded"] === "1"
            isExpanded = !isExpanded;
            span.dataset["expanded"] = isExpanded ? "1" : "0";
            span.textContent = (isExpanded ? collapseArrow : expandArrow) + "\xA0" + text;
            //ul.hidden = !isExpanded;
            ul.style.visibility = isExpanded ? "visible" : "hidden";
        });
    }
}

const menu = document.body.querySelector("div.menu");
if (menu) {
    const className_open = "open";
    menu.addEventListener("click", () => {
        const classList = menu.classList;
        if (classList.contains(className_open)) {
            classList.remove(className_open);
        } else {
            classList.add(className_open);
        }
    });
}

export { };
