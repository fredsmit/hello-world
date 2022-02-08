import { getRequiredHTMLElements } from "./pageUtils.js";
const { ul: list } = getRequiredHTMLElements("ul");
list.addEventListener("click", getHandler(list));
function getHandler(list) {
    const lis = Array.from(list.getElementsByTagName("li"));
    function preventDefault(ev) {
        ev.preventDefault();
    }
    lis.forEach(li => {
        li.addEventListener("selectstart", preventDefault);
        li.addEventListener("mouseenter", () => { li.classList.add("highlight"); });
        li.addEventListener("mouseleave", () => { li.classList.remove("highlight"); });
    });
    const className_selected = "selected";
    return function (ev) {
        if (ev.type === "click" && ev.target instanceof HTMLElement) {
            const target = ev.target;
            const li = target.closest("li");
            if (li instanceof HTMLLIElement && lis.includes(li)) {
                if (ev.ctrlKey || ev.metaKey) {
                    li.classList.toggle(className_selected);
                }
                else {
                    lis.filter(_ => _ !== li).forEach(li => li.classList.remove(className_selected));
                    li.classList.add(className_selected);
                }
            }
        }
    };
}
