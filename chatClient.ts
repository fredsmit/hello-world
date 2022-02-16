import {
    getRequiredNamedForm, getRequiredNamedFormControl,
    getRequiredHTMLElements
} from "./pageUtils.js"

const chatUrl = "ws://localhost:8080/chat";
let webSocket = new WebSocket(chatUrl);
//webSocket.binaryType = "arraybuffer";

const publishForm = getRequiredNamedForm("publish");
const messageControl = getRequiredNamedFormControl(
    publishForm, "message", (c): c is HTMLInputElement => c instanceof HTMLInputElement
);
const { messages: messagesEl } = getRequiredHTMLElements("messages");

webSocket.onopen = function (this: WebSocket, ev: Event): void {
    //console.log("Allow submit:", this.extensions);
    console.log("Allow submit");
    // setTimeout(() => {
    //     if (confirm("Close chart client?")) {
    //         webSocket.close(); // Closed 1005, reason: , wasClean: true
    //         // webSocket.close(1000); // Closed 1000, reason: , wasClean: true
    //         // 1000	Normal Closure
    //         // 1005 No Status Rcvd
    //         // Closed 1006, reason: , wasClean: false
    //         // 1006 Abnormal Closure
    //     } else {
    //         //webSocket = new WebSocket(chatUrl);
    //         //webSocket = null as unknown as WebSocket;
    //     }
    // }, 5000);

    setTimeout(() => {
        if (confirm("Close chart client?")) {
            webSocket.close(1000, "KUKU"); // connection closed 1000 KUKU
        } else {
            //webSocket = new WebSocket(chatUrl);
            //webSocket = null as unknown as WebSocket;
        }
    }, 5000);

    // send message from the form
    publishForm.onsubmit = function (ev: SubmitEvent) {
        const outgoingMessage = (messageControl.value ?? "").trim();
        webSocket.send(outgoingMessage);
        return false;
    };
};

// handle incoming messages
webSocket.onmessage = async function (this: WebSocket, ev: MessageEvent) {
    console.log("binaryType, bufferedAmount:", this.binaryType, this.bufferedAmount);
    if (ev.data instanceof Blob) {
        const incomingMessage = await ev.data.text();
        showMessage(incomingMessage);
    } else if (ev.data instanceof ArrayBuffer) {
        const incomingMessage = new TextDecoder().decode(ev.data);
        showMessage(incomingMessage);
    } else {
        showMessage(Object.prototype.toString.call(ev.data));
    }
};

webSocket.onclose = (ev: CloseEvent) => console.log(`Closed ${ev.code}, reason: ${ev.reason}, wasClean: ${ev.wasClean}`);

// show message in div#messages
function showMessage(message: any) {
    const messageElem = document.createElement('div');
    messageElem.textContent = message;
    messagesEl.prepend(messageElem);
}

export { };
