import { queryRequiredElement } from "./pageUtils.js";
const lastMessageView = queryRequiredElement(document.body, "p", "lastMessageView");
const desk = queryRequiredElement(document.body, "ul", "desk");
const iframe = queryRequiredElement(document.body, "iframe", "f1");
const btnStart = queryRequiredElement(document.body, "button", "btnStart");

btnStart.addEventListener("click", (e: PointerEvent) => {
    console.log("t70::btnStart clicked.", e.target);
    port1.start();
    btnStart.disabled = true;
    let n = 0;
    window.setInterval(() => {
        port1.postMessage('X*Message ' + n++);
    }, 1000);
}, { once: true });

const channel = new MessageChannel();
const port1 = channel.port1;
const port2 = channel.port2;

console.log("t70::Listening for messages on port1...");
port1.addEventListener("message", (e: MessageEvent) => {
    const li = document.createElement("li");
    li.style.border = "1px solid green";
    li.textContent = String(e.data);
    desk.appendChild(li);
});
//port1.start();

window.addEventListener("load", (e: Event) => {
    console.log("t70::window.load:", e);
    //port2.postMessage('Message from the t70.html page on window.onload');
});

// Wait for the iframe to load
iframe.addEventListener("load", frameLoad);

function frameLoad(e: Event) {
    console.log("t70::iframe.load:", e);

    // Listen for messages on port1
    // port1.onmessage = onMessage;
    // port1.onmessage = null; // Remove the onmessage handler to demonstrate addEventListener working 
    //    console.log("t70::Listening for messages on port1...");
    port1.addEventListener("message", lastMessage);

    // Transfer port2 to the iframe
    console.log("t70::Transferring port2 to the iframe...");
    iframe.contentWindow?.postMessage(
        //"iframe.contentWindow?.postMessage::A message from the t70.html page!",
        "xstart",
        "*",
        [port2]
    );

    //port1.start(); // Start the port to send messages
    port1.postMessage('start*Message');
    let n = 0;
    window.setInterval(() => {
        port1.postMessage('Y*Message ' + n++);
    }, 1000);
}

// Handle messages received on port1
function lastMessage(e: MessageEvent) {
    //console.log("message:", e.type);
    lastMessageView.textContent = String(e.data);
}

export { };

/*
t70::Listening for messages on port1...

t71::window.addEventListener('message', onWindowMessage):
t71::window.load: Event {type: 'load', target: document,

t70::iframe.load: Event {type: 'load', target: iframe#f1,
t70::Transferring port2 to the iframe...
t70::window.load: Event {type: 'load', target: document,

t71::iframe_port_transfer: MessageEvent {data: 'xstart', ev.ports[0]:
port = ev.ports[0];

t70::btnStart clicked.
t71::iframe_btnStart clicked. ==> port?.start();
*/
