document.body.classList.add('article');

console.log(document.body.className); // main page article

console.log("document.body.classList:", ...document.body.classList);

const div = document.createElement("div");
div.style.cssText = `color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
`;

div.textContent = "Big DIV"
document.body.append(div);

console.log("div.style.cssText", div.style.cssText);

//document.body.style.margin = "20";
//console.log("document.body.style.margin:", document.body.style.margin); // '' (empty string, the assignment is ignored)

// now add the CSS unit (px) - and it works
//document.body.style.margin = '20px';
console.log("document.body.style.margin:", document.body.style.margin); // 20px
console.log("document.body.style.marginTop:", document.body.style.marginTop); // 20px
console.log("document.body.style.marginLeft:", document.body.style.marginLeft); // 20px

const computedStyle: CSSStyleDeclaration = window.getComputedStyle(document.body);

// now we can read the margin and the color from it

console.log("computedStyle:", computedStyle);
console.log("computedStyle.marginTop:", computedStyle.marginTop); // 5px
console.log("computedStyle.color:", computedStyle.color); // rgb(255, 0, 0)
console.dir(computedStyle);
console.log("computedStyle:", ...computedStyle);

function showNotification(
    {
        top = 0, right = 0, className, html
    }: {
        top?: number;
        right?: number;
        className?: string;
        html?: string;
    }
): void {
    let dvNotification = document.querySelector("span.notification") as HTMLElement;
    if (dvNotification === null) {
        dvNotification = document.createElement("span");
        dvNotification.style.top = String(top) + "px";
        dvNotification.style.right = String(right) + "px";
        dvNotification.className = "notification";
        className = (className ?? "").trim();
        if (className) {
            dvNotification.classList.add(className);
        }
        document.body.prepend(dvNotification);
    }
    dvNotification.textContent = (html ?? "").trim();
    dvNotification.hidden = !dvNotification.hidden;
}

// test it
let i = 1;
setInterval(() => {
    showNotification({
        top: 10,
        right: 10,
        html: 'Hello ' + i++,
        className: "welcome"
    });
}, 2000);

export { };
