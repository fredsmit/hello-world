import { getRequiredHTMLElements } from "./pageUtils.js"

const { menu: menuElement } = getRequiredHTMLElements("menu");

class Menu {

    constructor(private readonly htmlElement: HTMLElement) {
        const eventListenerObject = this.getEventListenerObject();
        htmlElement.addEventListener("click", eventListenerObject);
        htmlElement.addEventListener("click", eventListenerObject, true);
    }

    private getEventListenerObject(this: Menu): EventListenerObject {
        const handleEvent = (ev: Event) => {
            if (ev instanceof MouseEvent && ev.target instanceof HTMLElement) {
                this.handleEvent(ev, ev.target);
            }
        }
        return { handleEvent };
    }

    private async handleEvent(ev: MouseEvent, target: HTMLElement): Promise<void> {
        const button = target.closest("button[data-action]") as HTMLElement;
        if (button === null)
            return;

        const action = button.dataset["action"];
        const capturingPhase = ev.eventPhase === Event.CAPTURING_PHASE;
        switch (action) {
            case "save":
                if (capturingPhase) {
                    button.style.backgroundColor = "silver";
                } else {
                    await this.save();
                    button.style.backgroundColor = "";
                }
                break;
            case "load":
                if (capturingPhase) {
                    button.style.backgroundColor = "silver";
                } else {
                    await this.load();
                    button.style.backgroundColor = "";
                }
                break;
            case "search":
                if (capturingPhase) {
                    button.style.backgroundColor = "silver";
                } else {
                    await this.search();
                    button.style.backgroundColor = "";
                }
                break;
            default:
                if (capturingPhase) {
                    button.style.backgroundColor = "coral";
                } else {
                    setTimeout(() => {
                        button.style.backgroundColor = "";
                    }, 500);
                }
                break;

        }
    }


    save(): Promise<boolean> {
        console.log('saving...');
        return new Promise(resolve => {
            setTimeout(() => resolve(true), 500);
        });
    }

    load() {
        console.log('loading...');
        return new Promise(resolve => {
            setTimeout(() => resolve(true), 500);
        });
    }

    search() {
        console.log('searching...');
        return new Promise(resolve => {
            setTimeout(() => resolve(true), 500);
        });
    }
}

const menu = new Menu(menuElement);
await menu.load();

export { };
