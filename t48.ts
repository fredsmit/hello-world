const form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';
form.innerHTML = '<input name="q" value="test">';
// the form must be in the document to submit it
form.hidden = true;
document.body.append(form);

// setTimeout(() => {
//     if (confirm("Submit?"))
//         form.submit();
// }, 3000);

import { getRequiredHTMLElements, getRequiredNamedForm, getRequiredNamedFormControl } from "./pageUtils.js";

const {
    btnShowForm,
    "prompt-form-container": promptFormContainer
} = getRequiredHTMLElements("btnShowForm", "prompt-form-container");

const promptForm = getRequiredNamedForm("prompt-form");
const textInput = getRequiredNamedFormControl(
    promptForm, "text", (c): c is HTMLInputElement => c instanceof HTMLInputElement
);
const btnOk = getRequiredNamedFormControl(
    promptForm, "ok", (c): c is HTMLInputElement => c instanceof HTMLInputElement
);
const btnCancel = getRequiredNamedFormControl(
    promptForm, "cancel", (c): c is HTMLInputElement => c instanceof HTMLInputElement
);

document.body.addEventListener("keydown", function (this: HTMLElement, ev: KeyboardEvent): void {
    if (ev.code === "Tab") {
        if (ev.shiftKey) {
            if (textInput === document.activeElement) {
                ev.preventDefault();
                btnCancel.focus();
                return;
            }
        } else {
            if (btnCancel === document.activeElement) {
                ev.preventDefault();
                textInput.focus();
                return;
            }
        }
    }
});


btnShowForm.addEventListener("pointerdown", function (this: HTMLElement, ev: PointerEvent): void {
    console.log(ev);

    //btnShowForm.setPointerCapture(ev.pointerId);
    showPrompt("Enter something<br>...smart :)", function (value: string) {
        alert(value);
    });
});

function showPrompt(text: string, callback: (value: string) => void) {
    promptFormContainer.style.display = "block";
    const { "prompt-message": promptMessageDiv } = getRequiredHTMLElements("prompt-message");
    promptMessageDiv.innerHTML = text;
    setTimeout(() => {
        textInput.focus();
    });

    if (promptFormContainer.dataset.h !== "1") {
        promptForm.addEventListener("submit", function (this: HTMLElement, ev: SubmitEvent): void {
            ev.preventDefault();
            promptFormContainer.style.display = "none";
            console.log(ev);

            console.log("ev.submitter:", ev.submitter);
            setTimeout(() => {
                callback(textInput.value);
            });
        });


        // btnOk.addEventListener("click", function (this: HTMLInputElement, ev: MouseEvent): void {
        //     promptFormContainer.style.display = "none";
        //     promptForm.submit();
        //     setTimeout(() => {
        //         callback(textInput.value);
        //     });
        // });

        btnCancel.addEventListener("click", function (this: HTMLInputElement, ev: MouseEvent): void {
            //ev.preventDefault();

            promptFormContainer.style.display = "none";
        });
    }
    promptFormContainer.dataset.h = "1";
}

export { };

