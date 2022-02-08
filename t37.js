const thumbs = document.body.querySelectorAll("*.slider *.thumb");
for (const thumb of thumbs) {
    addDragListener(thumb);
}
function addDragListener(thumb) {
    const slider = thumb.parentElement;
    if (!slider)
        throw Error("Missing slider part 'slider'.");
    let shiftX;
    function get_onMouseMove() {
        const leftMax = slider.offsetWidth - thumb.offsetWidth;
        const shiftLeft = slider.offsetLeft + shiftX;
        return function (ev) {
            const left = Math.max(0, Math.min(leftMax, ev.pageX - shiftLeft));
            thumb.style.left = Math.round(left) + 'px';
        };
    }
    function get_onMouseUp(onMouseMove) {
        return function (ev) {
            console.log("==> Drop");
            slider.removeEventListener("mousemove", onMouseMove);
        };
    }
    function onMouseDown(ev) {
        thumb.style.zIndex = String(1000);
        const thumbRect = thumb.getBoundingClientRect();
        shiftX = ev.clientX - thumbRect.x;
        thumb.addEventListener("dragstart", (ev) => { ev.preventDefault(); }, { once: true });
        const onMouseMove = get_onMouseMove();
        slider.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", get_onMouseUp(onMouseMove), { once: true });
    }
    thumb.addEventListener("mousedown", onMouseDown);
}
export {};
