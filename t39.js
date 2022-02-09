const thumbs = document.body.querySelectorAll("*.slider *.thumb");
for (const thumb of thumbs) {
    addDragListener(thumb);
}
function addDragListener(thumb) {
    const slider = thumb.parentElement;
    if (!slider)
        throw Error("Missing slider part 'slider'.");
    let shiftX;
    function get_onPointerMove() {
        const leftMax = slider.clientWidth - thumb.offsetWidth;
        const shiftLeft = slider.offsetLeft + slider.clientLeft + shiftX;
        return function (ev) {
            const left = Math.max(0, Math.min(leftMax, ev.pageX - shiftLeft));
            thumb.style.left = Math.round(left) + 'px';
        };
    }
    function get_onPointerUp(onPointerMove) {
        return function (ev) {
            console.log("==> Drop");
            slider.removeEventListener("pointermove", onPointerMove);
        };
    }
    function onPointerDown(ev) {
        thumb.style.zIndex = String(1000);
        shiftX = ev.clientX - thumb.getBoundingClientRect().x;
        thumb.setPointerCapture(ev.pointerId);
        thumb.addEventListener("dragstart", (ev) => {
            //console.log("default.dragstart");
            ev.preventDefault();
        }, { once: true });
        document.addEventListener("selectstart", (ev) => {
            //console.log("document.default.selectstart");
            ev.preventDefault();
        }, { once: true });
        const onPointerMove = get_onPointerMove();
        slider.addEventListener("pointermove", onPointerMove);
        slider.addEventListener("pointerup", get_onPointerUp(onPointerMove), { once: true });
    }
    thumb.addEventListener("pointerdown", onPointerDown);
}
export {};
