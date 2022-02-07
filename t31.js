import { getRequiredHTMLElements } from "./pageUtils.js";
const { btnAuto, btnGenerate } = getRequiredHTMLElements("btnAuto", "btnGenerate");
document.body.addEventListener("kuku", function (ev) {
    console.log("document.body:", ev);
});
btnAuto.addEventListener("kuku", function (ev) {
    console.log("btnAuto:", ev);
});
btnGenerate.addEventListener("click", function (ev) {
    const kukuEvent = new Event("kuku", { bubbles: true });
    console.log("btnGenerate:", kukuEvent);
    btnAuto.dispatchEvent(kukuEvent);
    const mouseEventInit = {
        bubbles: true,
        clientX: 10,
        clientY: 20
    };
    const mouseEvent = new MouseEvent("kuku", mouseEventInit);
    console.log("btnGenerate:", mouseEvent);
    btnAuto.dispatchEvent(mouseEvent);
});
