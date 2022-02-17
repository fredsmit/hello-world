import { queryRequiredElement } from "./pageUtils.js";
const tmpl = queryRequiredElement(document.body, "template", "tmpl");
customElements.define('custom-dialog', class extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'closed' }).append(tmpl.content.cloneNode(true));
    }
});
customElements.define('user-card', class extends HTMLElement {
    connectedCallback() {
        // event path for open
        // [span, document-fragment, user-card, body, html, document, Window]
        // [div, slot, document-fragment, user-card, body, html, document, Window]
        // event path for closed
        // [user-card, body, html, document, Window]
        // [div, user-card, body, html, document, Window]
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
        <style>
          <!-- span { background: red; } -->
          slot[name="username"] { font-weight: bold; }
          ::slotted(div) { border: 1px solid red; }
        </style>
        <span>Name:</span> <slot name="username"></slot>
      `;
        // shadowRoot.addEventListener("click", function (ev: Event): void {
        //     console.log(
        //         "ev:", ev, "type:", ev.type, "target:", ev.target, "instanceof:", Object.prototype.toString.call(ev)
        //     );
        // });
    }
});
document.addEventListener("click", function (ev) {
    console.log("document ==> ", "ev:", ev, "type:", ev.type, "target:", ev.target, "instanceof:", Object.prototype.toString.call(ev));
    console.log(ev.composedPath());
});
