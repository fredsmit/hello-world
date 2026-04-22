import { queryRequiredElement } from "./pageUtils.js";
console.log("iframe: window === window.parent:", window === window.parent);

const p2 = queryRequiredElement(document.body, "p", "p2");

declare global {
    interface Window {
        structuredClone<T>(value: T, options?: { transfer?: Transferable[]; }): T;
    }
}

let port: MessagePort | null = null;
window.addEventListener("message", (e) => {
    console.log("iframe:window.message", e);
    const text = `timeStamp:${e.timeStamp.toFixed(1)}, type:${e.type}, data:${e.data}, lastEventId:${e.lastEventId}, origin:${e.origin}, ports:${e.ports}, source:${e.source}, target:${e.target}`;
    console.log(text);
    const msg = (typeof e.data === "string") ? e.data : JSON.stringify(e.data);
    console.log(msg);
    port = (e.ports?.length === 1) ? e.ports[0] : null;

    port?.addEventListener("message", (e) => {
        const div = document.createElement("div");
        div.textContent = String(e.data);
        p2.append(div);
    });
    port?.start();
});

window.parent.onload = async () => {
    console.log("iframe.parent:load");
    await new Promise(resolve => setTimeout(() => resolve(0), 1100));
    console.log("iframe.parent:load after wait");
};

export { };

