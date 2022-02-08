const thumbs = document.body.querySelectorAll<HTMLElement>("*.slider *.thumb");

for (const thumb of thumbs) {
    addDragListener(thumb);
}

function addDragListener(thumb: HTMLElement) {

    const slider = thumb.parentElement as HTMLElement;
    if (!slider)
        throw Error("Missing slider part 'slider'.");

    let shiftX: number;

    function get_onMouseMove() {

        const leftMax = slider.offsetWidth - thumb.offsetWidth;
        const shiftLeft = slider.offsetLeft + shiftX;

        return function (ev: MouseEvent): void {
            const left = Math.max(0, Math.min(leftMax, ev.pageX - shiftLeft));
            thumb.style.left = Math.round(left) + 'px';
        };
    }

    function get_onMouseUp(onMouseMove: (ev: MouseEvent) => void) {
        return function (this: Document, ev: MouseEvent): void {
            console.log("==> Drop");
            slider.removeEventListener("mousemove", onMouseMove);
        }
    }


    function onMouseDown(this: HTMLElement, ev: MouseEvent): void {
        thumb.style.zIndex = String(1000);
        const thumbRect = thumb.getBoundingClientRect();
        shiftX = ev.clientX - thumbRect.x;

        thumb.addEventListener("dragstart", (ev: DragEvent) => { ev.preventDefault(); }, { once: true });

        const onMouseMove = get_onMouseMove();
        slider.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", get_onMouseUp(onMouseMove), { once: true });
    }

    thumb.addEventListener("mousedown", onMouseDown);

}

export { };

