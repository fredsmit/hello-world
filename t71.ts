import { queryRequiredElement } from "./pageUtils.js";

console.log("iframe: window === window.parent:", window === window.parent);

console.log("iframe.window:", window);
console.log("iframe.window.parent:", window.parent);

const p2 = queryRequiredElement(document.body, "p", "p2");

declare global {
    interface Window {
        //structuredClone<T>(value: T, transfer?: Transferable[]): T;
        //structuredClone<T>(value: T, options?: StructuredSerializeOptions): T;
        structuredClone<T>(value: T, options?: { transfer?: Transferable[]; }): T;
    }
}


window.addEventListener('message', onMessage);

let port1: MessagePort;

function onMessage(this: Window, ev: MessageEvent<unknown>) {
    const text = `timeStamp:${ev.timeStamp.toFixed(1)}, ev.type:${ev.type}, data:${ev.data}, lastEventId:${ev.lastEventId}, origin:${ev.origin}, ports:${ev.ports}, source:${ev.source}`;

    const div = document.createElement("div");
    div.innerText = text;
    p2.append(div);

    console.log("iframe:", ev);

    // Use the transfered port to post a message back to the main frame
    if (ev.ports[0]) {
        ev.ports[0].addEventListener("message", function (ev) {
            const div = document.createElement("div");
            div.style.border = "1px solid red";
            div.innerText = text;
            p2.append(div);
        });
        port1 = ev.ports[0];

        const o = Uint16Array.of(1, 2, 3, 4, 5);
        const o2 = Uint16Array.of(11, 12, 13, 14, 17, 18, 19);

        console.log("port2Clone.o:", o);
        console.log("port2Clone.o2:", o2);
        // const port2Clone = window.structuredClone({ x: 123 }, { transfer: [o2.buffer, o.buffer] });
        // console.log("==> port2Clone.o:", o);
        // console.log("==> port2Clone.o2:", o2);
        // console.log("==> port2Clone:", port2Clone);

        port1.postMessage('1 Message back from the IFrame');
        port1.postMessage('2 Clone Message back from the IFrame');
        port1.postMessage('3 Clone Message back from the IFrame');
        port1.postMessage('4 Clone Message back from the IFrame');
        port1.postMessage('5 Clone Message back from the IFrame');

        const port2Clone = window.structuredClone(port1, { transfer: [port1, o2.buffer, o.buffer] });
        //const port2Clone = window.structuredClone(port1, [port1, o2.buffer, o.buffer]);
        console.log("==> port2Clone.o:", o);
        console.log("==> port2Clone.o2:", o2);
        port2Clone.onmessage = (ev: any) => {
            console.log("channel.port2.onmessage::KUKU:", ev);
            const div = document.createElement("div");
            div.style.border = "1px solid blue";
            div.innerText = String(ev.data);
            p2.append(div);
        };

        port1.postMessage('11 Message back from the IFrame');
        port1.postMessage('22 Clone Message back from the IFrame');
        port1.postMessage('33 Clone Message back from the IFrame');
        port1.postMessage('44 Clone Message back from the IFrame');
        port1.postMessage('55 Clone Message back from the IFrame');
    }
}

export { };
