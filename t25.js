import { getRequiredHTMLElements } from "./pageUtils.js";
const { tree } = getRequiredHTMLElements("tree");
tree.addEventListener("mouseenter", getHandler());
tree.addEventListener("mouseleave", getHandler());
tree.addEventListener("click", getHandler());
function getHandler() {
    return function (ev) {
        if (ev.type === "mouseenter") {
            this.style.border = "1px solid green";
        }
        else if (ev.type === "mouseleave") {
            this.style.border = "1px solid silver";
        }
        else if (ev.type === "click") {
            const target = ev.target;
            if (target instanceof HTMLLIElement) {
                const uls = Array.from(target.children)
                    .filter(_ => _ instanceof HTMLUListElement);
                uls.forEach(ul => {
                    ul.hidden = !ul.hidden;
                    target.style.textDecoration = ul.hidden ? "underline dashed dimgray" : "none";
                });
            }
        }
    };
}
