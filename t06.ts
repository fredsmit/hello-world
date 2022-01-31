// string

const div = document.getElementById("div");
const input = document.getElementById("checkboxInput");

show();


document.documentElement.addEventListener("click", (ev: MouseEvent) => {

    const div = document.getElementById("div");
    const input = document.getElementById("checkboxInput");
    if (div && input && input instanceof HTMLInputElement) {

        const styleAttr: string | null = div.getAttribute('style');
        const style: CSSStyleDeclaration = div.style;

        const map = [...style] as const;

        div.style.color = "blue";
        if ((div.style.fontWeight ?? "normal") === "normal") {
            div.style.fontWeight = "bold";
        } else {
            div.style.fontWeight = "normal";
        }


        input.checked = !input.checked;
    }

    show();
});

function show() {
    if (div && input && input instanceof HTMLInputElement) {

        const styleAttr: string | null = div.getAttribute('style');
        const style: CSSStyleDeclaration = div.style;

        console.log("styleAttr:", styleAttr); // color:red;font-size:120%
        console.log("style:", style); // [object CSSStyleDeclaration]
        console.log(style.color); // red

        const map = [...style] as const;
        console.log("map:", map);

        console.log("---");

        console.log("input.getAttribute('checked'):", input.getAttribute('checked'), typeof input.getAttribute('checked')); // the attribute value is: empty string
        console.log("input.checked:", input.checked, typeof input.checked);
    }
}

export { };
