import { getCommonColorNames } from "./commonColors.js"
//import { getRequiredHTMLElements } from "./pageUtils.js"
//const { ball, ball2 } = getRequiredHTMLElements("ball", "ball2");

const fields = document.body.querySelectorAll("*[data-field]");

for (const field of fields) {
    const ball = await createBall(field);
    addMouseDownListener(ball);
    field.append(ball);
}

async function createBall(field: HTMLElement): Promise<HTMLImageElement> {
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

function addMouseDownListener(ball: HTMLElement) {

    const ballParent = ball.parentElement ?? document.body;

    ball.addEventListener("mousedown", mouseDownListener);

    function onMouseMove(this: Document, ev: MouseEvent): void {
        ball.style.left = ev.pageX - ball.offsetWidth / 2 + 'px';
        ball.style.top = ev.pageY - ball.offsetHeight / 2 + 'px';
    }

    function onMouseUp(this: HTMLElement, ev: MouseEvent) {
        document.removeEventListener("mousemove", onMouseMove);
        ball.remove();

        const elUnderBall = document.elementFromPoint(ev.pageX, ev.pageY);
        if (elUnderBall) {
            //const field = elUnderBall.closest("*[data-field]") ?? ballParent;
            const field = elUnderBall.closest("*[data-field]") ?? document.body;
            field.append(ball);
        } else {
            ballParent.append(ball);
        }
    }

    function mouseDownListener(this: HTMLElement, ev: MouseEvent): void {
        ball.style.position = 'absolute';
        ball.style.zIndex = String(1000);
        document.body.append(ball);

        ball.addEventListener("dragstart", (ev: DragEvent) => { ev.preventDefault(); }, { once: true });
        document.addEventListener("mousemove", onMouseMove);
        ball.addEventListener("mouseup", onMouseUp, { once: true });
    }
}

// ball.onmousedown = function (event) {

//     ball.addEventListener("dragstart", (ev: DragEvent) => { ev.preventDefault(); });

//     // (1) prepare to moving: make absolute and on top by z-index
//     ball.style.position = 'absolute';
//     ball.style.zIndex = String(1000);

//     // move it out of any current parents directly into body
//     // to make it positioned relative to the body
//     const ballParent = ball.parentElement ?? document.body;
//     document.body.append(ball);

//     // centers the ball at (pageX, pageY) coordinates
//     function moveAt(pageX: number, pageY: number) {
//         ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
//         ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
//     }

//     // move our absolutely positioned ball under the pointer
//     moveAt(event.pageX, event.pageY);

//     function onMouseMove(event: MouseEvent) {
//         moveAt(event.pageX, event.pageY);
//     }

//     // (2) move the ball on mousemove
//     document.addEventListener('mousemove', onMouseMove);

//     // (3) drop the ball, remove unneeded handlers
//     console.log("add mouseup");
//     ball.onmouseup = function () {
//         console.log("remove mousemove");
//         document.removeEventListener('mousemove', onMouseMove);
//         ball.onmouseup = null;
//         ballParent.append(ball);
//     };

// };

export { };

