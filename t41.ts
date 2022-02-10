import { getRequiredHTMLElements } from "./pageUtils.js"

const { arrowTop } = getRequiredHTMLElements("arrowTop");

arrowTop.style.visibility = window.scrollY < window.innerHeight ? "hidden" : "visible";

window.addEventListener("scroll", function (ev: Event): void {
    if (window.scrollY > window.innerHeight) {
        arrowTop.style.visibility = "visible";
    } else {
        arrowTop.style.visibility = "hidden";
    }
});

arrowTop.addEventListener("click", function (ev: MouseEvent): void {
    window.scrollTo({ top: 0 });
});

export { };
