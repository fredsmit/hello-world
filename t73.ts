import { queryRequiredElement } from "./pageUtils.js";

const p2 = queryRequiredElement(document.body, "p", "p2");

declare global {
    interface Window {
        structuredClone<T>(value: T, options?: { transfer?: Transferable[]; }): T;
    }
}

window.parent.onload = async () => {
    console.log("iframe.parent:load");
    await new Promise(resolve => setTimeout(() => resolve(0), 1100));
    console.log("iframe.parent:load after wait");

    const port2Clone: MessagePort = (window as any)["A1"];
    console.log("iframe.port2Clone:", window, port2Clone);

    console.log("port2Clone.onmessage:", port2Clone.onmessage === null);

    //console.dir(port2Clone);

    setTimeout(() => {
        port2Clone.start();

    }, 1000);

    //port2Clone.onmessage = null;
    port2Clone.addEventListener('message', onMessage2);

    //port2Clone.onmessage = () => { };


    // port2Clone.onmessage = onMessage;
    // port2Clone.onmessage = null;

    console.log("port2Clone:", port2Clone);

    function onMessage(this: MessagePort, ev: MessageEvent<unknown>) {
        const text = `timeStamp:${ev.timeStamp.toFixed(1)}, ev.type:${ev.type}, data:${ev.data}, lastEventId:${ev.lastEventId}, origin:${ev.origin}, ports:${ev.ports}, source:${ev.source}`;

        const div = document.createElement("div");
        div.innerText = text;
        p2.append(div);
        console.log("iframe:", ev);

        port2Clone.postMessage("Back");
    }
    function onMessage2(this: MessagePort, ev: MessageEvent<unknown>) {
        const text = `timeStamp:${ev.timeStamp.toFixed(1)}, ev.type:${ev.type}, data:${ev.data}, lastEventId:${ev.lastEventId}, origin:${ev.origin}, ports:${ev.ports}, source:${ev.source}`;

        const div = document.createElement("div");
        div.innerText = "???" + text;
        p2.append(div);
        console.log("iframe:", ev);

        port2Clone.postMessage("Back");
    }
};


export { };

