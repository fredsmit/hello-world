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

    //show();
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

    const el = document.querySelector("div[data-widget-name]");
    if (el && el instanceof HTMLElement) {
        console.log("dataset.widgetName:", el.dataset.widgetName);
    }

    //let links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a');
    let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
    let links = document.querySelectorAll(selector) as NodeListOf<HTMLAnchorElement>;

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

function dblclickListener(this: HTMLElement, ev: MouseEvent): void {
    const div = document.createElement('div');
    div.className = "alert";
    div.innerText = "You've read an important message.";
    //document.body.prepend(div);
    document.body.append(div);

    const hi = document.createElement("strong");
    const hiText = document.createTextNode("Hi there!");
    const hiText2 = document.createTextNode("& there!");
    hi.appendChild(hiText);

    setTimeout(() => {
        //div.insertAdjacentHTML("afterbegin", "<strong>Hi there!&nbsp;</strong>");
        div.append(hi);
    }, 1000);
    setTimeout(() => {
        //const hi2 = hi.cloneNode();
        //hi2.appendChild(document.createElement("li")).appendChild(document.createTextNode("KUKU"));
        //hi2.appendChild(document.createElement("li")).appendChild(new Text("KUKU"));
        //div.prepend(hi2);
        //div.insertAdjacentHTML("beforeend", "<strong>Hi there!&nbsp;</strong>");
        const text0 = document.createTextNode("<YES>");
        console.dir(text0);
        const text1 = new Text("<Kuku>");
        console.dir(text1);
        div.prepend(hi.cloneNode().appendChild(new Text("Kuku")).splitText(2));
        console.log(document.all);
        

    }, 2000);
}

export { };
