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
    } else if (ev.code === "Escape") {
        hideCover();
        promptFormContainer.style.display = "none";
    }
});



// Show a half-transparent DIV to "shadow" the page
// (the form is not inside, but near it, because it shouldn't be half-transparent)
function showCover() {
    const coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';
    // make the page unscrollable while the modal form is open
    document.body.style.overflowY = 'hidden';
    document.body.append(coverDiv);
}

function hideCover() {
    const coverDiv = document.getElementById('cover-div');
    if (coverDiv) coverDiv.remove();
    document.body.style.overflowY = '';
}


btnShowForm.addEventListener("pointerdown", function (this: HTMLElement, ev: PointerEvent): void {
    console.log(ev);

    //btnShowForm.setPointerCapture(ev.pointerId);
    showPrompt("Enter something<br>...smart :)", function (value: string) {
        alert(value);
    });
});

function showPrompt(text: string, callback: (value: string) => void) {
    showCover();
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
            hideCover();
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
            hideCover();
            promptFormContainer.style.display = "none";
        });
    }
    promptFormContainer.dataset.h = "1";
}

export { };

