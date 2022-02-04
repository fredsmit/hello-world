import { getRequiredHTMLElements } from "./pageUtils.js";

const ballSrc = "./img/ball.svg";

try {

    const ball: HTMLImageElement = document.createElement("img");
    ball.alt = "";
    ball.src = ballSrc;

    const { field } = getRequiredHTMLElements("field");
    field.addEventListener("selectstart", ev => ev.preventDefault());

    const fieldEventListenerObject = getFieldEventListenerObject(field, ball);

    const fw = field.clientWidth;
    const fh = field.clientHeight;

    await ball.decode();
    field.prepend(ball);

    const bw = ball.clientWidth;
    const bh = ball.clientHeight;

    const top = Math.round((fh - bh) / 2) + "px";
    const left = Math.round((fw - bw) / 2) + "px";

    ball.style.position = "absolute";
    ball.style.top = top;
    ball.style.left = left;

    field.addEventListener("click", fieldEventListenerObject);

} catch (error) {
    console.error("Error:", error);
}

function getFieldEventListenerObject(field: HTMLElement, ball: HTMLElement): EventListenerObject {

    function getPageCoords(elem: HTMLElement): DOMRectReadOnly {
        const rect = elem.getBoundingClientRect();
        return new DOMRectReadOnly(
            Math.round(rect.x + window.pageXOffset),
            Math.round(rect.y + window.pageYOffset),
            Math.round(rect.width),
            Math.round(rect.height)
        );
    }

    function getTranslatedCoords(elemRect: DOMRectReadOnly, anchorRect: DOMRectReadOnly): DOMRectReadOnly {
        return new DOMRectReadOnly(
            elemRect.x - anchorRect.x,
            elemRect.y - anchorRect.y,
            elemRect.width,
            elemRect.height
        );
    }

    const fieldClickObject: EventListenerObject = {
        handleEvent: function (this: any, ev: Event): void {
            if (ev.type === "click" && ev instanceof PointerEvent) {

                const pageOffsetX = Math.round(window.pageXOffset);
                const pageOffsetY = Math.round(window.pageYOffset);

                const anchorRect: DOMRectReadOnly = getPageCoords(field);

                const fieldRect: DOMRectReadOnly = getTranslatedCoords(anchorRect, anchorRect);
                const ballRect = getTranslatedCoords(getPageCoords(ball), anchorRect);
                const horizontalBorderThickness = Math.round((fieldRect.height - field.clientHeight) / 2);
                const verticalBorderThickness = Math.round((fieldRect.width - field.clientWidth) / 2);

                const pointX = ev.clientX - anchorRect.x - verticalBorderThickness + pageOffsetX;
                const pointY = ev.clientY - anchorRect.y - horizontalBorderThickness + pageOffsetY;

                const ballLeft = Math.round(pointX - ballRect.width / 2);
                const ballTop = Math.round(pointY - ballRect.height / 2);

                const ballLeftMin = 0;
                const ballLeftMax = Math.round(field.clientWidth - ballRect.width);

                const ballTopMin = 0;
                const ballTopMax = Math.round(field.clientHeight - ballRect.height);

                ball.style.left = Math.max(ballLeftMin, Math.min(ballLeft, ballLeftMax)) + "px";
                ball.style.top = Math.max(ballTopMin, Math.min(ballTop, ballTopMax)) + "px";
            }
        }
    };

    return fieldClickObject;
}


export { };

