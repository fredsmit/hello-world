import { getRequiredHTMLElements, getRequiredNamedForm, getRequiredNamedFormControl } from "./pageUtils.js";

const form = getRequiredNamedForm("calculator");
// console.log(form);

// const money = getRequiredNamedFormControl(form, "money", (c): c is HTMLInputElement => c instanceof HTMLInputElement);
// const months = getRequiredNamedFormControl(form, "months", (c): c is HTMLSelectElement => c instanceof HTMLSelectElement);
// const interest = getRequiredNamedFormControl(form, "interest", (c): c is HTMLInputElement => c instanceof HTMLInputElement);

interface IsOfTypeTagNameMap {
    "a": (control: unknown) => control is HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}

function ofType<T extends keyof HTMLElementTagNameMap>(tagName: T): (e: unknown) => e is HTMLElementTagNameMap[T] {
    const f = {
        "input": (e: unknown): e is HTMLElementTagNameMap[T] => e instanceof HTMLInputElement,
        //"RadioNodeList": (e: unknown): e is RadioNodeList => e instanceof RadioNodeList
    };
    return f.input;
}

const money2 = getRequiredNamedFormControl(form, "money", ofType("RadioNodeList"));

function isInputFormControl(control: Element | RadioNodeList | null | undefined): control is HTMLInputElement {
    return control instanceof HTMLInputElement;
}

function isSelectFormControl(control: Element | RadioNodeList | null | undefined): control is HTMLSelectElement {
    return control instanceof HTMLSelectElement;
}

const money = getRequiredNamedFormControl(form, "money", isInputFormControl);
const months = getRequiredNamedFormControl(form, "months", isSelectFormControl);
const interest = getRequiredNamedFormControl(form, "interest", isInputFormControl);

// console.log(money, months, interest);

// console.log(money instanceof HTMLInputElement);
// console.log(months instanceof HTMLSelectElement);
// console.log(interest instanceof HTMLInputElement);


const { "height-after": heightAfter } = getRequiredHTMLElements("height-after");
// console.log(heightAfter);
calcHeight();

// money.addEventListener("input", function (this: HTMLInputElement, ev: Event): void {
//     calcHeight();
// });

// months.addEventListener("input", function (this: HTMLSelectElement, ev: Event): void {
//     calcHeight();
// });

// interest.addEventListener("input", function (this: HTMLInputElement, ev: Event): void {
//     calcHeight();
// });

form.addEventListener("input", calcHeight);

function calcHeight() {
    const initial = window.parseFloat(money.value);
    const years = window.parseFloat(months.value) / 12;
    const interestPerYear = window.parseFloat(interest.value);
    const result = Math.round(initial * (1 + interestPerYear / 100) ** years);
    console.log(initial, years, interestPerYear, result);
    heightAfter.style.height = Math.round(100 * result / initial) + "px";
}


export { };

