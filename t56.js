import { queryRequiredElement } from "./pageUtils.js";
const canvasElem = queryRequiredElement(document.body, "canvas", "canvasElem");
const btnSubmit = queryRequiredElement(document.body, "button", "btnSubmit");
const btnGetUsers = queryRequiredElement(document.body, "button", "btnGetUsers");
canvasElem.onmousemove = function (e) {
    const ctx = canvasElem.getContext('2d');
    if (ctx) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
};
btnSubmit.addEventListener("click", async function (ev) {
    const blob = await new Promise(resolve => canvasElem.toBlob(resolve));
    console.log("blob?.type:", blob?.type); // image/png
    const response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
    });
    // the server responds with confirmation and the image size
    const result = await response.json();
    console.log(result.message);
});
btnGetUsers.addEventListener("click", async function (ev) {
    const url = "https://api.github.com/users/fredsmit";
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
});
