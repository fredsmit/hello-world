import { getRequiredHTMLElements, getRequiredNamedForm, getRequiredNamedFormControl } from "./pageUtils.js";

const form = getRequiredNamedForm("calculator");
// console.log(form);

// const money = getRequiredNamedFormControl(form, "money", (c): c is HTMLInputElement => c instanceof HTMLInputElement);
// const months = getRequiredNamedFormControl(form, "months", (c): c is HTMLSelectElement => c instanceof HTMLSelectElement);
// const interest = getRequiredNamedFormControl(form, "interest", (c): c is HTMLInputElement => c instanceof HTMLInputElement);

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

money.addEventListener("input", function (this: HTMLInputElement, ev: Event): void {
    calcHeight();
});

months.addEventListener("input", function (this: HTMLSelectElement, ev: Event): void {
    calcHeight();
});

interest.addEventListener("input", function (this: HTMLInputElement, ev: Event): void {
    calcHeight();
});

function calcHeight() {
    const initial = window.parseFloat(money.value);
    const years = window.parseFloat(months.value) / 12;
    const interestPerYear = window.parseFloat(interest.value);
    const result = Math.round(initial * (1 + interestPerYear / 100) ** years);
    console.log(initial, years, interestPerYear, result);
    heightAfter.style.height = Math.round(100 * result / initial) + "px";
}


export { };

