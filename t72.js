import { queryRequiredElement } from "./pageUtils.js";
const channel = new MessageChannel();
const f1 = queryRequiredElement(document.body, "iframe", "f1");
const p1 = queryRequiredElement(document.body, "p", "p1");
channel.port1.onmessage = onMessage;
f1.addEventListener("load", onIFrameLoad);
async function onIFrameLoad(ev) {
    console.log("main:iframe.load");
    // Transfer port2 to the iframe
    const contentWindow = f1.contentWindow;
    if (contentWindow) {
        channel.port2.onmessage = function XXX(e) {
            console.log("XXX:", e.data);
        };
        console.log("channel.port2 before  transfer:", channel.port2, channel);
        channel.port1.postMessage('xxxxxx1');
        await new Promise(resolve => setTimeout(() => resolve(0), 1000));
        //const port2Clone = window.structuredClone(channel.port2, { transfer: [channel.port2] });
        const port2Clone = window.structuredClone(channel.port2, { transfer: [] });
        console.log("channel.port2 after transfer:", channel.port2, channel);
        channel.port1.postMessage('xxxxxxxxxxxxxxx2');
        // port2Clone.onmessage = function XXX(e) {
        //     console.log("XXX-clone", e.data);
        // };
        contentWindow["A1"] = port2Clone;
        console.log("main.window:", window);
        //contentWindow.postMessage('Hello from the main page!', '*', [channel.port2]);
    }
}
window.addEventListener("load", () => {
    console.log("main:load");
    console.log("postMessage");
    channel.port1.postMessage('Hello from the main page!');
    setTimeout(() => {
        console.log("postMessage2");
        channel.port1.postMessage('Hi from the main page!');
    }, 100);
});
function onMessage(ev) {
    const text = `timeStamp:${ev.timeStamp.toFixed(1)}, ev.type:${ev.type}, data:${ev.data}, lastEventId:${ev.lastEventId}, origin:${ev.origin}, ports:${ev.ports}, source:${ev.source}`;
    const div = document.createElement("div");
    div.innerText = text;
    p1.append(div);
    console.log("main:", ev);
}
