import { queryRequiredElement } from "./pageUtils.js";
console.log("main: window === window.parent:", window === window.parent);
const { port1, port2 } = new MessageChannel();
//const { port1: port1, port2: port2 } = new MessageChannel();
//const { port1: port2, port2: port1 } = new MessageChannel();
const f1 = queryRequiredElement(document.body, "iframe", "f1");
const dv_lastMessage = queryRequiredElement(document.body, "div", "dv-lastMessage");
port2.onmessage = onMessage;
f1.addEventListener("load", onIFrameLoad);
async function onIFrameLoad(ev) {
    console.log("main:iframe.load");
    // Transfer port2 to the iframe
    const contentWindow = f1.contentWindow;
    contentWindow?.postMessage({ op: "start", time: new Date().toISOString() }, 
    // Failed to execute 'postMessage' on 'DOMWindow':
    // The target origin provided ('https://localhost:55011')
    // does not match the recipient window's origin ('https://localhost:5501').
    // "https://localhost:55011", 
    (new URL(window.document.baseURI)).origin, []);
    contentWindow?.postMessage("start", "*", [port1]);
    //const port2Clone = window.structuredClone(channel.port2, { transfer: [channel.port2] });
    //console.log("channel.port2 after transfer:", channel.port2, channel);
    port2.postMessage('Xx2');
    // port2Clone.onmessage = function XXX(e) {
    //     console.log("XXX-clone", e.data);
    // };
    //(contentWindow as any)["A1"] = port2Clone;
    //contentWindow.postMessage('Hello from the main page!', '*', [channel.port2]);
}
window.addEventListener("load", () => {
    console.log("main.load");
});
function onMessage(ev) {
    const text = `timeStamp:${ev.timeStamp.toFixed(1)}, ev.type:${ev.type}, data:${ev.data}, lastEventId:${ev.lastEventId}, origin:${ev.origin}, ports:${ev.ports}, source:${ev.source}`;
    const div = document.createElement("div");
    div.className = "message";
    div.append("<-- ", text, " -->");
    //div.textContent = text;
    const div2 = document.createElement("div");
    div2.className = "message-red";
    div2.append("<-- ", text, " -->");
    dv_lastMessage.append(div, div2);
}
window.addEventListener("message", (ev) => {
    console.log("main:window.message", ev);
});
