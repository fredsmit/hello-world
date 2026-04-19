import { getRequiredHTMLElements, getRequiredNamedForm, queryRequiredElement } from "./pageUtils.js";
const { dvFocus, view } = getRequiredHTMLElements("dvFocus", "view");
const form = getRequiredNamedForm("my");
const formControls = form.elements.namedItem("one");
if (formControls instanceof RadioNodeList) {
    console.log("RadioNodeList:", formControls);
}
else if (formControls instanceof HTMLInputElement) {
    console.log("formControls.value:", formControls.value, Object.prototype.toString.call(formControls));
}
console.log(new Option("opText", "opValue"));
const genres = form.elements.namedItem("genres");
if (genres instanceof HTMLSelectElement) {
    for (const selectedOption of genres.selectedOptions) {
        console.log("selectedOption:", selectedOption.value);
    }
    genres.add(new Option("Classic", "classic", false, true));
}
const emailInput = queryRequiredElement(document.body, "input", "emailInput");
emailInput.addEventListener("blur", function (ev) {
    // if (ev.relatedTarget === null) {
    //     //this.classList.remove("error");
    //     return;
    // }
    // put the handler on capturing phase (last argument true)
    form.addEventListener("focus", () => form.classList.add('focused'), true);
    form.addEventListener("blur", () => form.classList.remove('focused'), true);
    if (this.value.includes('@')) {
        this.classList.remove("error");
    }
    else { // not an email
        this.classList.add("error"); // show the error !!! blur itself !!!
        // this.focus(); // ...and put the focus back
        // alert("Invalid e-mail address.");
        dvFocus.focus({ preventScroll: true });
    }
});
view.addEventListener("focus", getViewHandler(view));
function getViewHandler(htmlElement) {
    htmlElement.tabIndex = 0;
    const textArea = document.createElement("textarea");
    textArea.style.width = htmlElement.clientWidth + "px";
    textArea.style.height = htmlElement.clientHeight + "px";
    textArea.style.display = "block";
    textArea.setAttribute("autocorrect", "off");
    textArea.setAttribute("spellcheck", "false");
    textArea.innerText = htmlElement.innerHTML;
    function displayView() {
        htmlElement.style.width = textArea.style.width;
        htmlElement.style.height = textArea.style.height;
        htmlElement.innerHTML = textArea.value;
        textArea.style.display = "none";
        htmlElement.style.display = "block";
    }
    textArea.addEventListener("blur", function (ev) {
        //console.log("textarea:ev.type:", ev.type, textArea);
        displayView();
    });
    textArea.addEventListener("keydown", function (ev) {
        if (ev.repeat)
            return;
        //console.log("ev.code ,ev.repeat, ev.ctrlKey:", ev.code, ev.repeat, ev.ctrlKey);
        if (ev.ctrlKey && ev.code === "Enter") {
            console.log("un-focus");
            //displayView();
            //textArea.style.display = "none";
            this.blur();
        }
    });
    return function (ev) {
        //console.log("div:ev.type:", ev.type);
        if (ev.type === "focus") {
            htmlElement.style.display = "none";
            textArea.style.display = "block";
            htmlElement.insertAdjacentElement("afterend", textArea);
            textArea.focus();
        }
    };
}
