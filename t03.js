const buffer_LENGTH = 64;
const buffer = new Uint8Array(buffer_LENGTH);
refillBuffer(buffer);
// function getCellId(id: string | null | undefined): number | null | undefined {
//     if (id && id.startsWith("td-")) {
//         return +id.substring(3);
//     }
//     return void 0;
// }
function getCellIdx(cell) {
    const dataSet = cell?.dataset;
    if (dataSet) {
        const idx = dataSet.idx;
        if (idx !== void 0) {
            return +idx;
        }
    }
    return void 0;
}
function isCellIdx(id) {
    return typeof id === "number" && Number.isInteger(id) && id >= 0 && id < buffer_LENGTH;
}
const mouseenterListener = function mouseenterListener(ev) {
    //console.log("mouseenter", this, ev);
    const idx = getCellIdx(this);
    if (isCellIdx(idx)) {
        //console.log("enter td-id:", id, "data-idx:", this.getAttribute("data-idx"), Reflect.get(this, "id"));
        // console.log("data-idx:", this.getAttribute("data-idx"), "0:", this.attributes.item(0));
        // console.dir(this.attributes.item(0));
        // console.dir(this.attributes.getNamedItem("data-idx"));
        // console.log("--------");
        // console.log("id:", (this.attributes as unknown as Record<number, Attr>)[0]);
        // console.log("id:", (this.attributes as unknown as Record<string, Attr>).id);
        // console.dir(this.attributes);
        // console.log(this.attributes);
        // console.log(Object.getOwnPropertyDescriptors(this.attributes));
        // for (const entry of Object.getOwnPropertyNames(this.attributes)) {
        //     console.log("entry:", entry, typeof entry);
        // }
        // const attrArray = Array.from(this.attributes);
        // console.dir(attrArray);
        // for (const attr of this.attributes) {
        //     console.dir(attr);
        // }
        // console.log("--------");
        if (ev.ctrlKey) {
            const dataSet = this.dataset;
            console.dir(dataSet);
            console.log("idx:", idx, "click:", dataSet.click);
        }
        buffer[idx] = 0;
        this.style.backgroundColor = "yellow";
    }
};
const mouseleaveListener = function mouseleaveListener(ev) {
    const idx = getCellIdx(this);
    if (isCellIdx(idx)) {
        this.style.backgroundColor = "brown";
    }
};
const clickListener = function clickListener(ev) {
    const idx = getCellIdx(this);
    if (isCellIdx(idx)) {
        const bufferClick = +(this.getAttribute("data-click") ?? "0") + 1;
        this.setAttribute("data-click", String(bufferClick));
        this.style.backgroundColor = "skyblue";
        //this.removeEventListener("mouseenter", mouseenterListener);
        this.removeEventListener("mouseleave", mouseleaveListener);
    }
};
const dblclickListener = function dblclickListener(ev) {
    const idx = getCellIdx(this);
    if (isCellIdx(idx)) {
        buffer[idx] = idx;
        repaintCell(idx, this);
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
        td.setAttribute("data-idx", String(idx));
        td.id = "td-" + String(idx).padStart(2, "0");
        td.style.cursor = "default";
        tr.appendChild(td);
        td.addEventListener("mouseenter", mouseenterListener);
        td.addEventListener("mouseleave", mouseleaveListener);
        td.addEventListener("click", clickListener);
        td.addEventListener("dblclick", dblclickListener);
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
function repaintCell(idx, cell) {
    const byte = buffer[idx];
    cell.innerText = String(byte).padStart(3, "0");
    const dataSet = cell.dataset;
    const backgroundColor = byte % 2 === 0 ? "red" : ((+(dataSet.click ?? "") % 2 === 0) ? "lime" : "green");
    cell.style.backgroundColor = backgroundColor;
}
function repaintTable(table) {
    const cells = Array.from(table.children)
        .filter(row => row instanceof HTMLTableRowElement)
        .flatMap(row => {
        const cells = row.cells;
        return Array.from(cells);
    }).map(cell => {
        let ret;
        const idx = getCellIdx(cell);
        if (isCellIdx(idx)) {
            ret = [idx, cell];
        }
        else {
            ret = void 0;
        }
        return ret;
    }).filter(pair => pair !== void 0);
    cells.forEach(([idx, cell]) => repaintCell(idx, cell));
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
