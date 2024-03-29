import { getRequiredHTMLElements } from "./pageUtils.js";
const ballSrc = "./img/ball.svg";
//const ballSrc = "https://en.js.cx/clipart/ball.svg";
//const ballSrc = "https://clipground.com/images/orange-free-clipart-8.jpg";
//const ballSrc = "https://th.bing.com/th/id/R.54908073bcefe489e355d83d7c32ed0b?rik=G%2fTRm1VuAYk8Pw&riu=http%3a%2f%2fclipground.com%2fimages%2fgirasole-clipart-4.jpg&ehk=7YW5jpTWXiyRRP9%2b6z11u7sN80nEBvZOd8cjFNU4W9o%3d&risl=&pid=ImgRaw&r=0";
//const ballSrc = "https://www.google.lt/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
//const { field, ball } = getRequiredHTMLElements("field", "ball");
(async () => {
    try {
        const ball = document.createElement("img");
        ball.src = ballSrc;
        const { field } = getRequiredHTMLElements("field");
        const fw = field.clientWidth;
        const fh = field.clientHeight;
        await ball.decode();
        field.prepend(ball);
        const bw = ball.clientWidth;
        const bh = ball.clientHeight;
        console.log("field:w,h:", fw, fh, "offset:w,h:", field.offsetWidth, field.offsetHeight);
        console.log("ball:w,h:", bw, bh, "offset:left,top:", ball.offsetLeft, ball.offsetTop);
        const top = Math.round((fh - bh) / 2) + "px";
        const left = Math.round((fw - bw) / 2) + "px";
        console.log("ball:top,left:", top, left);
        ball.style.position = "absolute";
        ball.style.top = top;
        ball.style.left = left;
        console.log("document.body.scrollHeight:", document.body.scrollHeight);
        console.log("document.documentElement.scrollHeight:", document.documentElement.scrollHeight);
        console.log("document.body.offsetHeight:", document.body.offsetHeight);
        console.log("document.documentElement.offsetHeight:", document.documentElement.offsetHeight);
        console.log("document.body.clientHeight:", document.body.clientHeight);
        console.log("document.documentElement.clientHeight:", document.documentElement.clientHeight);
        const message = createMessageUnder(ball, "Ball");
        document.body.append(message);
        setTimeout(() => message.remove(), 5000);
    }
    catch (error) {
        console.error("Error:", error);
    }
})();
function createMessageUnder(elem, text) {
    const message = document.createElement('div');
    // better to use a css class for the style here
    message.style.cssText = "position:fixed; color: red";
    const coords = elem.getBoundingClientRect();
    message.style.left = coords.left + "px";
    message.style.top = coords.bottom + "px";
    message.textContent = text;
    return message;
}
