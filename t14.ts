/// <reference lib="dom" />

import { getRequiredHTMLElements } from "./pageUtils.js";

const { field } = getRequiredHTMLElements("field");
const fw = field.clientWidth;
const fh = field.clientHeight;

const display = document.createElement("div");
display.textContent = `field(w,h): ${fw}:${fh}`;
document.body.append(display);

const rect: DOMRectReadOnly = field.getBoundingClientRect();
const { x, y, width, height, left, top, right, bottom } = rect;
console.log("rect (x, y, width, height) :", x, y, width, height);
console.log("rect (left, top, right, bottom) :", left, top, right, bottom);


const display1 = display.cloneNode();
display1.textContent = `coord-1: ${left}:${top}`;
document.body.append(display1);

const display2 = display.cloneNode();
display2.textContent = `coord-2: ${right}:${bottom}`;
document.body.append(display2);

const display3 = display.cloneNode();
display3.textContent = `coord-3: ${left + field.clientLeft}:${top + field.clientTop}`;
document.body.append(display3);

const display4 = display.cloneNode();
display4.textContent = `coord-4: ${left + field.clientLeft + field.clientWidth}:${top + field.clientTop + field.clientHeight}`;
document.body.append(display4);


const rect2 = new DOMRect(0, 0, -10, -10);
console.log("rect2:", rect2);

export { };
