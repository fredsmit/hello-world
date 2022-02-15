import { queryRequiredElement } from "./pageUtils.js"

const formElem = queryRequiredElement(document.body, "form", "formElem");

formElem.onsubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(formElem);

    const picture = formElem.elements.namedItem("picture");
    if (picture instanceof HTMLInputElement) {
        console.log("picture.value:", picture.value, picture.files?.[0]);

        const file: File | undefined = picture.files?.[0];
        if (file) {
            const response = await window.fetch("img/" + file.name);
            console.log(response);
            const fileBuffer = await response.arrayBuffer();

            //const blob = new Blob([fileBuffer], { type: "application/octet-stream" });
            const blob = new Blob([fileBuffer], { type: "image/svg" });
            //const blob = new Blob([fileBuffer]);
            console.log("blob.type:", blob.type);


            formData.append("file", blob);

        }
    }

    const response = await fetch('/article/formdata/post/user', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    console.log(result.message);
};

export { };
