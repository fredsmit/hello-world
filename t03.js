const buffer_LENGTH = 64;
const buffer = new Uint8Array(buffer_LENGTH);
// let elements = document.querySelectorAll('ul > li:last-child');
refillBuffer(buffer);
function getCellId(id) {
    if (id && id.startsWith("td-")) {
        return +id.substring(3);
    }
    return void 0;
}
function isCellId(id) {
    return typeof id === "number" && Number.isInteger(id) && id >= 0 && id < buffer_LENGTH;
}
const mouseenterListener = function mouseenterListener(ev) {
    //console.log("mouseenter", this, ev);
    const id = getCellId(this.id);
    if (isCellId(id)) {
        //console.log("enter td-id:", id);
        buffer[id] = 0;
        this.style.backgroundColor = "yellow";
    }
};
const mouseleaveListener = function mouseleaveListener(ev) {
    //console.log("mouseleave", this, ev);
    const id = getCellId(this.id);
    if (isCellId(id)) {
        //console.log("leave td-id:", id);
        this.style.backgroundColor = "brown";
    }
};
const clickListener = function clickListener(ev) {
    const id = getCellId(this.id);
    if (isCellId(id)) {
        //console.log("click td-id:", id);
        this.style.backgroundColor = "skyblue";
        this.removeEventListener("mouseenter", mouseenterListener);
        this.removeEventListener("mouseleave", mouseleaveListener);
    }
};
const table = document.createElement("table");
for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
    const tr = document.createElement("tr");
    for (let colIdx = 0; colIdx < 8; colIdx++) {
        const td = document.createElement("td");
        const idx = rowIdx * 8 + colIdx;
        //const byte = buffer[idx];
        // td.innerText = String(byte).padStart(3, "0");
        // const backgroundColor: string = byte % 2 === 0 ? "red" : "lime";
        // td.style.backgroundColor = backgroundColor;
        td.id = "td-" + String(idx).padStart(2, "0");
        td.style.cursor = "default";
        tr.appendChild(td);
        td.addEventListener("mouseenter", mouseenterListener);
        td.addEventListener("mouseleave", mouseleaveListener);
        td.addEventListener("click", clickListener);
    }
    table.appendChild(tr);
}
table.style.cursor = "none";
document.body.appendChild(table);
function refillBuffer(buffer, force = false) {
    let changeCount = 0;
    for (let idx = 0; idx < buffer.length; idx++) {
        if (force || buffer[idx] % 2 === 0) {
            buffer[idx] = Math.random() * 256;
            ++changeCount;
        }
    }
    return changeCount;
}
function repaintTable(table) {
    const cells = Array.from(table.children)
        .filter(row => {
        //return Object.prototype.toString.call(row) === "[object HTMLTableRowElement]";
        return row instanceof HTMLTableRowElement;
    })
        .flatMap(row => {
        const cells = row.cells;
        return Array.from(cells);
    }).filter(cell => {
        const id = cell.id;
        return id.startsWith("td-");
    }).map(cell => {
        const id = cell.id;
        const cellIdx = +id.substring(3);
        return [cellIdx, cell];
    });
    cells.forEach(([idx, cell]) => {
        //console.log(idx, cell);
        const byte = buffer[idx];
        cell.innerText = String(byte).padStart(3, "0");
        const backgroundColor = byte % 2 === 0 ? "red" : "lime";
        cell.style.backgroundColor = backgroundColor;
    });
}
function repaint(buffer, table) {
    repaintTable(table);
    refillBuffer(buffer);
    let refillCount = 0;
    const timerId = setInterval(() => {
        const changeCount = refillBuffer(buffer);
        //console.log("changeCount:", changeCount);
        if (changeCount === 0) {
            ++refillCount;
            if (refillCount > 2) {
                //clearInterval(timerId);
            }
            else {
                refillBuffer(buffer, true);
            }
        }
        repaintTable(table);
    }, 1000);
}
repaint(buffer, table);
export {};
