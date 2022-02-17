import { getRequiredHTMLElements, queryRequiredElement, queryRequiredElementByClassSelector } from "./pageUtils.js";

customElements.define('user-card', class extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
            shadowRoot.innerHTML = `
<div>
    <span>Name:</span>
    <slot name="username"></slot>
</div>
<div>
    <span>Birthday:</span>
    <slot name="birthday"></slot>
</div>
<fieldset>
  <legend>Other information</legend>
  <slot></slot>
</fieldset>
`;
        }
    }
});


window.customElements.define('custom-menu', class extends HTMLElement {

    private menuTemplate: HTMLTemplateElement;

    constructor() {
        super();
        this.menuTemplate = queryRequiredElement(document.body, "template", "menu-template");
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "closed" });

        // tmpl is the shadow DOM template (above)
        shadowRoot.append(this.menuTemplate.content.cloneNode(true));
        const divMenu = queryRequiredElementByClassSelector(shadowRoot, "div", "menu");

        // we can't select light DOM nodes, so let's handle clicks on the slot
        const el = shadowRoot.querySelector('slot[name="title"]');
        if (el) {
            el.addEventListener("click", function (ev: Event): void {
                divMenu.classList.toggle('closed');
            });
        }

        divMenu.addEventListener('slotchange', function (ev: Event): void {
            // slotchange, [object HTMLSlotElement] [object Event]
            console.log(`${ev.type}, ${ev.target} ${Object.prototype.toString.call(ev)}`);
        });

        divMenu.addEventListener('slotchange', (ev: Event) => {
            const slot = ev.target;
            if (slot instanceof HTMLSlotElement) {
                if (slot.name == 'item') {
                    slot.assignedElements().map(elem => elem.textContent).forEach(item => {
                        console.log("item:", item);
                    });
                }
            }
        });

    }
});


const { oldMenu } = getRequiredHTMLElements("oldMenu");
setTimeout(() => {
    oldMenu.insertAdjacentHTML('beforeend', '<li slot="item">Lollipop 2</li>')
}, 1000);

setTimeout(() => {
    const titleSlot = oldMenu.querySelector('[slot="title"]');
    if (titleSlot) {
        titleSlot.innerHTML = "New menu";
    }
}, 2000);

export { };
