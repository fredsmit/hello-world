import { getRequiredHTMLElements } from "./pageUtils.js";
const props = {
    geometry: [
        'clientLeft', 'clientTop', 'clientWidth', 'clientHeight',
        'offsetWidth', 'offsetHeight', 'scrollWidth', 'scrollHeight'
    ],
    scroll: ['scrollLeft', 'scrollTop'],
    offset: ['offsetParent', 'offsetLeft', 'offsetTop'],
    computedStyle: [
        'paddingTop', 'paddingRight', "paddingBottom", 'paddingLeft', 'padding'
    ],
};
const { info, mouse, example } = getRequiredHTMLElements("info", "mouse", "example");
let html = '<div style="padding: 20px;"><h3>Click to see the value:</h3>';
for (const category in props) {
    html += `<h4>--- ${category} ---</h4>`;
    const prop = props[category];
    for (let i = 0; i < prop.length; i++) {
        const propertName = prop[i];
        html += `<span class="key">${propertName}</span>:&nbsp;<span id="${propertName}">&nbsp;</span>`;
        if (i % 2 === 0) {
            html += " ";
        }
        else {
            html += "<br/>";
        }
    }
}
html += '</div>';
info.innerHTML = html;
let ctrlClickCount = 0;
document.onclick = function (ev) {
    const target = ev.target;
    if (target && target instanceof Element) {
        if (target.classList.contains('key')) {
            const propertyName = target.textContent;
            if (propertyName) {
                let value = example[propertyName];
                if (value instanceof Element) {
                    value = value.tagName;
                }
                else if (value === null || value === void 0) {
                    value = window.getComputedStyle(example)[propertyName];
                }
                const displayElement = document.getElementById(propertyName);
                if (displayElement) {
                    displayElement.textContent = value;
                }
            }
        }
        else {
            if (ev.ctrlKey) {
                if (ctrlClickCount % 2 === 0) {
                    const paddingTop = +window.getComputedStyle(example).paddingTop.replace("px", "");
                    const paddingBottom = +window.getComputedStyle(example).paddingBottom.replace("px", "");
                    example.style.height = (example.scrollHeight - paddingTop - paddingBottom + 1) + "px";
                }
                else {
                    example.style.height = "";
                }
                ++ctrlClickCount;
                const div = document.createElement('div');
                div.style.overflowY = 'scroll';
                div.style.width = '64px';
                div.style.height = '64px';
                // must put it in the document, otherwise sizes will be 0
                document.body.append(div);
                const scrollbarWidth = div.offsetWidth - div.clientWidth;
                div.remove();
                console.log("scrollbarWidth:", scrollbarWidth);
            }
        }
    }
};
document.onmousemove = function (ev) {
    mouse.textContent = Math.round(ev.clientX) + ':' + Math.round(ev.clientY);
};
