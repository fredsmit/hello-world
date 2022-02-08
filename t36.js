import { getCommonColorNames } from "./commonColors.js";
//import { getRequiredHTMLElements } from "./pageUtils.js"
//const { ball, ball2 } = getRequiredHTMLElements("ball", "ball2");
const fields = document.body.querySelectorAll("*[data-field]");
for (const field of fields) {
    const ball = await createBall(field);
    field.append(ball);
    addMouseDownListener(ball);
}
async function createBall(field) {
    const img = document.createElement("img");
    img.alt = "";
    img.style.borderWidth = "9px";
    img.style.borderStyle = "dotted";
    img.style.borderColor = getCommonColorNames()[Math.floor(Math.random() * 16)];
    img.dataset["ball"] = field.dataset["field"];
    img.src = "./img/ball.svg";
    await img.decode();
    return img;
}
function addMouseDownListener(ball) {
    const ballParent = ball.parentElement ?? document.body;
    const { top: ballParentTop, left: ballParentLeft } = ballParent.getBoundingClientRect();
    //const { width: ballRectWidth, height: ballRectHeight } = ball.getBoundingClientRect();
    //console.log("ballParentTop, ballParentLeft, ballRectWidth, ballRectHeight:", ballParentTop, ballParentLeft, ballRectWidth, ballRectHeight);
    ball.addEventListener("mousedown", mouseDownListener);
    function onMouseMove(ev) {
        // ball.style.left = ev.pageX - ball.offsetWidth / 2 + 'px';
        // ball.style.top = ev.pageY - ball.offsetHeight / 2 + 'px';
        ball.style.left = ev.pageX - shiftX + 'px';
        ball.style.top = ev.pageY - shiftY + 'px';
    }
    function onMouseUp(ev) {
        document.removeEventListener("mousemove", onMouseMove);
        ball.remove();
        //const elUnderBall = document.elementFromPoint(ev.pageX, ev.pageY);
        //console.log("pageX, pageY, clientX, clientY:", ev.pageX, ev.pageY, ev.clientX, ev.clientY);
        const elUnderBall = document.elementFromPoint(ev.clientX, ev.clientY);
        if (elUnderBall) {
            const maybeGate = elUnderBall.closest("*.droppable");
            if (maybeGate) {
                maybeGate.style.borderColor = "crimson";
                setTimeout(() => {
                    maybeGate.style.borderColor = "white";
                    ball.style.top = Math.round(ballParentTop) + "px";
                    ball.style.left = Math.round(ballParentLeft) + "px";
                }, 1000);
            }
            const field = elUnderBall.closest("*[data-field]") ?? document.body;
            field.append(ball);
        }
        else {
            ballParent.append(ball);
        }
    }
    let shiftX;
    let shiftY;
    function mouseDownListener(ev) {
        ball.style.position = 'absolute';
        ball.style.zIndex = String(1000);
        const ballRect = ball.getBoundingClientRect();
        shiftX = ev.clientX - ballRect.left;
        shiftY = ev.clientY - ballRect.top;
        document.body.append(ball);
        onMouseMove.bind(document)(ev);
        ball.addEventListener("dragstart", (ev) => { ev.preventDefault(); }, { once: true });
        document.addEventListener("mousemove", onMouseMove);
        ball.addEventListener("mouseup", onMouseUp, { once: true });
    }
}
