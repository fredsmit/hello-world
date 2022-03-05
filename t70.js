import { queryRequiredElement } from "./pageUtils.js";
console.log("main: window === window.parent:", window === window.parent);
window["A1"] = "aa-window-" + Date.now();
console.log("main.window:", window);
const channel = new MessageChannel();
//const output = document.querySelector('.output');
//const iframe = document.querySelector('iframe');
const f1 = queryRequiredElement(document.body, "iframe", "f1");
const p1 = queryRequiredElement(document.body, "p", "p1");
// Listen for messages on port1
channel.port1.onmessage = onMessage;
// Wait for the iframe to load
f1.addEventListener("load", onIFrameLoad);
function onIFrameLoad(ev) {
    // Transfer port2 to the iframe
    const contentWindow = f1.contentWindow;
    if (contentWindow) {
        contentWindow["A1"] = "aa-contentWindow-" + Date.now();
        Object.assign(channel.port2, { kuku: 123 });
        channel.port2.onmessage = (ev) => {
            console.log("channel.port2.onmessage::KUKU:", ev);
            const div = document.createElement("div");
            div.style.border = "1px solid green";
            div.innerText = String(ev.data);
            p1.append(div);
        };
        console.log("before transfer:: channel.port2:", channel.port2);
        channel.port1.postMessage("1-KUKU from channel.port1");
        console.log("f1.contentWindow:", contentWindow);
        console.log("after transfer:: channel.port2:", channel.port2);
        contentWindow.postMessage('Hello Again', '*');
        channel.port1.postMessage("70-2-KUKU from channel.port1");
        contentWindow.postMessage('Hello from the main page!', '*', [channel.port2]);
        setTimeout(() => {
            channel.port1.postMessage("70-3-KUKU from channel.port1");
            channel.port1.postMessage("70-4-KUKU from channel.port1");
        }, 1000);
    }
}
// Handle messages received on port1
function onMessage(ev) {
    //ev.data;
    /** Returns the last event ID string, for server-sent events. */
    //ev.lastEventId: string;
    /** Returns the origin of the message, for server-sent events and cross-document messaging. */
    //ev.origin: string;
    /** Returns the MessagePort array sent with the message, for cross-document messaging and channel messaging. */
    //ev.ports: ReadonlyArray<MessagePort>;
    /** Returns the WindowProxy of the source window, for cross-document messaging, and the MessagePort being attached, in the connect event fired at SharedWorkerGlobalScope objects. */
    //ev.source: MessageEventSource | null;
    const text = `timeStamp:${ev.timeStamp.toFixed(1)}, ev.type:${ev.type}, data:${ev.data}, lastEventId:${ev.lastEventId}, origin:${ev.origin}, ports:${ev.ports}, source:${ev.source}`;
    const div = document.createElement("div");
    div.innerText = text;
    p1.append(div);
    console.log("main:", ev);
    console.log("2: after transfer:: channel.port2:", channel.port2);
}
