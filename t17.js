import { getRequiredHTMLElements } from "./pageUtils.js";
const ballSrc = "./img/ball.svg";
try {
    const ball = document.createElement("img");
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
    field.addEventListener("dblclick", fieldEventListenerObject);
}
catch (error) {
    console.error("Error:", error);
}
function getFieldEventListenerObject(field, ball) {
    let extendedField = false;
    function getPageCoords(elem) {
        const rect = elem.getBoundingClientRect();
        return new DOMRectReadOnly(Math.round(rect.x + window.pageXOffset), Math.round(rect.y + window.pageYOffset), Math.round(rect.width), Math.round(rect.height));
    }
    // function getTranslatedCoords(elemRect: DOMRectReadOnly, anchorRect: DOMRectReadOnly): DOMRectReadOnly {
    //     return new DOMRectReadOnly(
    //         elemRect.x - anchorRect.x,
    //         elemRect.y - anchorRect.y,
    //         elemRect.width,
    //         elemRect.height
    //     );
    // }
    function onDblClick(ev) {
        extendedField = !extendedField;
        const fieldBorderColor = extendedField ? "darkgreen" : "";
        field.style.borderColor = fieldBorderColor;
        field.style.color = fieldBorderColor;
    }
    async function onClick(ev) {
        await canMove();
        const pageOffsetX = Math.round(window.pageXOffset);
        const pageOffsetY = Math.round(window.pageYOffset);
        // const anchorRect: DOMRectReadOnly = getPageCoords(field);
        // const fieldRect: DOMRectReadOnly = getTranslatedCoords(anchorRect, anchorRect);
        // const ballRect = getTranslatedCoords(getPageCoords(ball), anchorRect);
        //console.log("ball (left,top):", ballRect.left, ballRect.top);
        const fieldRect = getPageCoords(field);
        const ballRect = getPageCoords(ball);
        const borderTop = field.clientTop;
        const borderRight = fieldRect.width - field.clientLeft - field.clientWidth;
        const borderBottom = fieldRect.height - field.clientTop - field.clientHeight;
        const borderLeft = field.clientLeft;
        // console.log("borderTop:", borderTop);
        // console.log("borderRight:", borderRight);
        // console.log("borderBottom:", borderBottom);
        // console.log("borderLeft:", borderLeft);
        const ax = ballRect.x - (extendedField ? 0 : borderLeft);
        const ay = ballRect.y - (extendedField ? 0 : borderTop);
        //console.log(ax, ay, extendedField);
        // const pointX = ev.clientX - anchorRect.x - borderLeft + pageOffsetX;
        // const pointY = ev.clientY - anchorRect.y - borderTop + pageOffsetY;
        const pointX = ev.clientX - borderLeft + pageOffsetX;
        const pointY = ev.clientY - borderTop + pageOffsetY;
        // console.log("pointX, pointY:", pointX, pointY);
        const ballLeft = Math.round(pointX - ballRect.width / 2);
        const ballTop = Math.round(pointY - ballRect.height / 2);
        // console.log("ballLeft, ballTop:", ballLeft, ballTop);
        const ballLeftMin = extendedField ? -borderLeft : 0;
        const ballLeftMax = Math.round(field.clientWidth - ballRect.width + (extendedField ? borderRight : 0));
        const ballTopMin = extendedField ? -borderTop : 0;
        const ballTopMax = Math.round(field.clientHeight - ballRect.height + (extendedField ? borderBottom : 0));
        const bx = Math.max(ballLeftMin, Math.min(ballLeft, ballLeftMax));
        const by = Math.max(ballTopMin, Math.min(ballTop, ballTopMax));
        await moveBall(ball, ax, ay, bx, by);
    }
    function canMove() {
        return new Promise(resolve => {
            isStopping = true;
            const timerId = setInterval(() => {
                if (!isMoving) {
                    isStopping = false;
                    clearInterval(timerId);
                    resolve(true);
                }
            }, 20);
        });
    }
    let isStopping = false;
    let isMoving = false;
    async function moveBall(ball, ax, ay, bx, by) {
        isMoving = true;
        const dx = bx - ax;
        const dy = by - ay;
        const len = Math.sqrt(dx * dx + dy * dy);
        const stepCount = Math.floor(len * 0.573);
        //console.log("move", ax, ay, " --> ", bx, by, "{dx, dy, len}:", dx, dy, len);
        if (stepCount < 20) {
            ball.style.left = bx + "px";
            ball.style.top = by + "px";
        }
        else {
            for (let n = 1; n <= stepCount; ++n) {
                await step(ball, Math.round(ax + dx * n / stepCount), Math.round(ay + dy * n / stepCount));
                if (isStopping) {
                    break;
                }
            }
        }
        isMoving = false;
    }
    function step(ball, bx, by) {
        return new Promise(resolve => {
            ball.style.left = bx + "px";
            ball.style.top = by + "px";
            setTimeout(() => resolve(void 0), 8);
        });
    }
    const fieldClickObject = {
        handleEvent: function (ev) {
            if (ev instanceof MouseEvent) {
                switch (ev.type) {
                    case "click":
                        onClick(ev);
                        break;
                    case "dblclick":
                        onDblClick(ev);
                        break;
                }
            }
        }
    };
    return fieldClickObject;
}
;
