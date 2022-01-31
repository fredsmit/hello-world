// string
const div = document.getElementById("div");
const input = document.getElementById("checkboxInput");
show();
document.documentElement.addEventListener("click", (ev) => {
    const div = document.getElementById("div");
    const input = document.getElementById("checkboxInput");
    if (div && input && input instanceof HTMLInputElement) {
        const styleAttr = div.getAttribute('style');
        const style = div.style;
        const map = [...style];
        div.style.color = "blue";
        if ((div.style.fontWeight ?? "normal") === "normal") {
            div.style.fontWeight = "bold";
        }
        else {
            div.style.fontWeight = "normal";
        }
        input.checked = !input.checked;
    }
    show();
});
function show() {
    if (div && input && input instanceof HTMLInputElement) {
        const styleAttr = div.getAttribute('style');
        const style = div.style;
        console.log("styleAttr:", styleAttr); // color:red;font-size:120%
        console.log("style:", style); // [object CSSStyleDeclaration]
        console.log(style.color); // red
        const map = [...style];
        console.log("map:", map);
        console.log("---");
        console.log("input.getAttribute('checked'):", input.getAttribute('checked'), typeof input.getAttribute('checked')); // the attribute value is: empty string
        console.log("input.checked:", input.checked, typeof input.checked);
    }
    const el = document.querySelector("div[data-widget-name]");
    if (el && el instanceof HTMLElement) {
        console.log("dataset.widgetName:", el.dataset.widgetName);
    }
    //let links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a');
    let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
    let links = document.querySelectorAll(selector);
    links.forEach(link => {
        console.log("---");
        console.dir(link);
        console.log("prop:", link.href);
        console.log("attr:", link.getAttribute("href"));
        if ((link.getAttribute("href") ?? "").includes("://")) {
            link.style.color = 'orange';
        }
    });
}
document.body.addEventListener("dblclick", dblclickListener);
function dblclickListener(ev) {
    const div = document.createElement('div');
    div.className = "alert";
    div.innerText = "You've read an important message.";
    //document.body.prepend(div);
    document.body.append(div);
    setTimeout(() => {
        div.insertAdjacentHTML("afterbegin", "<strong>Hi there!&nbsp;</strong>");
    }, 1000);
}
export {};
