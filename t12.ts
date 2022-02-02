import { getRequiredHTMLElements } from "./pageUtils.js";

const props: Readonly<Record<string, string[]>> = {
    geometry: [
        'clientLeft', 'clientTop', 'clientWidth', 'clientHeight',
        'offsetWidth', 'offsetHeight', 'scrollWidth', 'scrollHeight'],
    scroll: ['scrollLeft', 'scrollTop'],
    offset: ['offsetParent', 'offsetLeft', 'offsetTop']
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
        } else {
            html += "<br/>";

        }
    }
}
html += '</div>';
info.innerHTML = html;

document.onclick = function (ev: MouseEvent) {
    const target = ev.target;
    if (target && target instanceof Element && target.classList.contains('key')) {
        const propertyName = target.textContent;
        if (propertyName) {
            let value = (example as any)[propertyName];
            if (value instanceof Element) {
                value = value.tagName;
            }
            const displayElement = document.getElementById(propertyName);
            if (displayElement) {
                displayElement.textContent = value;
            }
        }
    }
};

document.onmousemove = function (ev: MouseEvent) {
    mouse.textContent = Math.round(ev.clientX) + ':' + Math.round(ev.clientY);
};

export { };
