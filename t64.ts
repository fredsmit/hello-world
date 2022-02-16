import { getRequiredHTMLElements, queryRequiredElement } from "./pageUtils.js";


const text = window.localStorage.getItem("text");
const area = queryRequiredElement(document.body, "textarea", "area");
const btnSave = queryRequiredElement(document.body, "button", "btnSave");

btnSave.addEventListener("click", function (this: HTMLButtonElement, ev: MouseEvent): void {
    // const newText = area.value ?? "";
    // window.localStorage.setItem("text", newText);
    area.dispatchEvent(new Event("input"));
});

area.addEventListener("input", function (this: HTMLTextAreaElement, ev: Event): void {
    const newText = this.value ?? "";
    window.localStorage.setItem("text", newText);
});

if (text) {
    area.value = text;
}

for (const entry of Object.entries(window.localStorage)) {
    const div = document.createElement("div");
    div.innerText = `${entry[0]} = ${entry[1]}`;
    document.body.append(div);
}

window.addEventListener("storage", function (this: Window, ev: StorageEvent): void {
    console.log("key:", ev.key, "oldValue:", ev.oldValue, "oldValue:", ev.newValue, "url:", ev.url);

    const div = document.createElement("div");
    div.innerText = `${ev.key} = ${ev.newValue}`;
    document.body.append(div);

});

export { };
