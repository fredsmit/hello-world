import { queryRequiredElement } from "./pageUtils.js";

// console.log("iframe: window === window.parent:", window === window.parent);
// console.log("iframe.window:", window);
// console.log("iframe.window.parent:", window.parent);

const lastMessageView = queryRequiredElement(document.body, "p", "lastMessageView");
const iframe_port_transfer = queryRequiredElement(document.body, "p", "iframe_port_transfer");
const iframe_desk = queryRequiredElement(document.body, "ul", "iframe_desk");
const iframe_btnStart = queryRequiredElement(document.body, "button", "iframe_btnStart");

let started = false;
iframe_btnStart.addEventListener("click", (e: PointerEvent) => {
    if (started) {
        console.warn("t71::iframe_btnStart clicked.", "already started:", started);
    } else {
        console.log("t71::iframe_btnStart clicked.", e.target, "started:", started);
    }
    port?.start();
    started = true;
    iframe_btnStart.disabled = true;
}, { once: false });

window.addEventListener("load", (e: Event) => {
    console.log("t71::window.load:", e);
});

console.log("t71::window.addEventListener('message', onWindowMessage):");
window.addEventListener('message', onWindowMessage);

let port: MessagePort;

function onWindowMessage(this: Window, ev: MessageEvent) {
    const text = `timeStamp:${ev.timeStamp.toFixed(1)}, type:${ev.type}, data:${ev.data}, lastEventId:${ev.lastEventId}, origin:${ev.origin}, ports:${ev.ports}, source:${ev.source}, target:${ev.target}`;
    if (ev.ports === null || ev.ports.length === 0) {
        console.warn("t71::iframe_port_transfer: No ports received", ev);
        return;
    }
    port = ev.ports[0];
    console.log("t71::iframe_port_transfer:", ev, "ev.ports[0]:", port);

    const li = document.createElement("li");
    li.style.border = "1px solid red";
    li.textContent = text
    iframe_port_transfer.append(li);

    port.addEventListener("message", (e) => {
        const li = document.createElement("li");
        li.style.border = "1px solid red";
        li.textContent = String(e.data);
        iframe_desk.append(li);
        lastMessageView.textContent = String(e.data);
    });

    // port.addEventListener("message", (e) => {
    //     lastMessageView.textContent = String(e.data);
    // });

    port.postMessage('First Message (back) from the IFrame');

    let n = 0;
    window.setInterval(() => {
        const msg = 'Message (back) from the IFrame ' + n++;
        //console.log(msg);
        port.postMessage(msg);
    }, 1000);
}

export { };
