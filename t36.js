import { getCommonColorNames } from "./commonColors.js";
//import { getRequiredHTMLElements } from "./pageUtils.js"
//const { ball, ball2 } = getRequiredHTMLElements("ball", "ball2");
const fields = document.body.querySelectorAll("*[data-field]");
for (const field of fields) {
    const ball = await createBall(field);
    addMouseDownListener(ball);
    field.append(ball);
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
    ball.addEventListener("mousedown", mouseDownListener);
    function onMouseMove(ev) {
        ball.style.left = ev.pageX - ball.offsetWidth / 2 + 'px';
        ball.style.top = ev.pageY - ball.offsetHeight / 2 + 'px';
    }
    function onMouseUp(ev) {
        document.removeEventListener("mousemove", onMouseMove);
        ball.remove();
        const elUnderBall = document.elementFromPoint(ev.pageX, ev.pageY);
        if (elUnderBall) {
            //const field = elUnderBall.closest("*[data-field]") ?? ballParent;
            const field = elUnderBall.closest("*[data-field]") ?? document.body;
            field.append(ball);
        }
        else {
            ballParent.append(ball);
        }
    }
    function mouseDownListener(ev) {
        ball.style.position = 'absolute';
        ball.style.zIndex = String(1000);
        document.body.append(ball);
        ball.addEventListener("dragstart", (ev) => { ev.preventDefault(); }, { once: true });
        document.addEventListener("mousemove", onMouseMove);
        ball.addEventListener("mouseup", onMouseUp, { once: true });
    }
}
