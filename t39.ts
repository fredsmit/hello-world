const thumbs = document.body.querySelectorAll<HTMLElement>("*.slider *.thumb");

for (const thumb of thumbs) {
    addDragListener(thumb);
}

function addDragListener(thumb: HTMLElement) {

    const slider = thumb.parentElement as HTMLElement;
    if (!slider)
        throw Error("Missing slider part 'slider'.");

    let shiftX: number;

    function get_onPointerMove() {

        const leftMax = slider.clientWidth - thumb.offsetWidth;
        const shiftLeft = slider.offsetLeft + slider.clientLeft + shiftX;

        return function (ev: PointerEvent): void {
            const left = Math.max(0, Math.min(leftMax, ev.pageX - shiftLeft));
            thumb.style.left = Math.round(left) + 'px';
        };
    }

    function get_onPointerUp(onPointerMove: (ev: PointerEvent) => void) {
        return function (this: HTMLElement, ev: PointerEvent): void {
            console.log("==> Drop");
            slider.removeEventListener("pointermove", onPointerMove);
        }
    }


    function onPointerDown(this: HTMLElement, ev: PointerEvent): void {
        ev.preventDefault();
        thumb.setPointerCapture(ev.pointerId);

        thumb.style.zIndex = String(1000);
        shiftX = ev.clientX - thumb.getBoundingClientRect().x;

        // thumb.addEventListener("dragstart", (ev: DragEvent) => {
        //     //console.log("default.dragstart");
        //     ev.preventDefault();
        // }, { once: true });

        // document.addEventListener("selectstart", (ev: Event) => {
        //     //console.log("document.default.selectstart");
        //     ev.preventDefault();
        // }, { once: true });

        const onPointerMove = get_onPointerMove();
        slider.addEventListener("pointermove", onPointerMove);
        slider.addEventListener("pointerup", get_onPointerUp(onPointerMove), { once: true });
    }

    thumb.addEventListener("pointerdown", onPointerDown);

}

export { };

