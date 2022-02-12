import { getRequiredHTMLElements } from "./pageUtils.js";
const { mouse } = getRequiredHTMLElements("mouse");
mouse.tabIndex = 0;
mouse.style.position = "fixed";
mouse.addEventListener("pointerdown", getMouseHandler());
function getMouseHandler() {
    const arrows = [
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown"
    ];
    function arrowsHandler(ev) {
        if (arrows.includes(ev.code)) {
            switch (ev.code) {
                case "ArrowRight":
                    this.style.left = Math.round(this.offsetLeft + 10) + "px";
                    break;
                case "ArrowLeft":
                    this.style.left = Math.round(this.offsetLeft - 10) + "px";
                    break;
                case "ArrowUp":
                    this.style.top = Math.round(this.offsetTop - 10) + "px";
                    break;
                case "ArrowDown":
                    this.style.top = Math.round(this.offsetTop + 10) + "px";
                    break;
            }
        }
    }
    return function (ev) {
        if (ev.type === "pointerdown" && ev.target instanceof HTMLElement) {
            const target = ev.target;
            //ev.preventDefault();
            target.addEventListener("keydown", arrowsHandler);
            //setTimeout(() => { target.focus(); });
        }
    };
}
