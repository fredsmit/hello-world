import { getCommonColors } from "./commonColors.js";

const buffer_LENGTH = 64;
const buffer = new Uint8Array(buffer_LENGTH);
const commonColors = getCommonColors();
const commonColors_LENGTH = commonColors.length;

class DataSet {

    private readonly _dataset: DOMStringMap & {
        idx?: string | undefined;
        click?: string | undefined;
    };

    private constructor(private readonly htmlElement: HTMLElement) {
        this._dataset = htmlElement.dataset;
    }

    public static of(htmlElement: HTMLElement): DataSet {
        return new DataSet(htmlElement);
    }

    public get dataSet(): typeof this._dataset {
        return this._dataset;
    }

    private getNumber(key: string): number | undefined {
        const value = this._dataset[key];
        return value === void 0 ? void 0 : +value;

    }

    private setNumber(key: string, value: number | undefined) {
        if (value === void 0) {
            this.htmlElement.removeAttribute("data-" + key);
        } else {
            this.htmlElement.setAttribute("data-" + key, String(value));
        }
    }

    get idx(): number | undefined { return this.getNumber("idx"); }

    set idx(value: number | undefined) { this.setNumber("idx", value); }

    get click(): number | undefined { return this.getNumber("click"); }

    set click(value: number | undefined) { this.setNumber("click", value); }
}

refillBuffer(buffer);

function isCellIdx(id: number | undefined): id is number {
    return typeof id === "number" && Number.isInteger(id) && id >= 0 && id < buffer_LENGTH;
}

const mouseenterListener = function mouseenterListener(this: HTMLTableCellElement, ev: MouseEvent): void {
    //console.log("mouseenter", this, ev);
    const dataSet = DataSet.of(this);
    const idx = dataSet.idx;
    if (isCellIdx(idx)) {

        buffer[idx] = 0;

        if (ev.ctrlKey) {
            repaintCell(idx, this);
        } else {
            const backgroundColor = "#" + Math.floor((Math.random() * 0x1000000)).toString(16).padStart(6, "0");
            this.style.backgroundColor = backgroundColor;
        }
    }
}

const mouseleaveListener = function mouseleaveListener(this: HTMLTableCellElement, ev: MouseEvent): void {
    const idx = DataSet.of(this).idx;
    if (isCellIdx(idx)) {
        this.style.backgroundColor = "brown";
    }
}

//const clickListener = async function clickListener(this: HTMLTableCellElement, ev: MouseEvent): void {
const clickListener = async function clickListener(this: HTMLTableCellElement, ev: MouseEvent) {
    const dataSet = DataSet.of(this);
    const idx = dataSet.idx;
    if (isCellIdx(idx)) {
        const clickCount = dataSet.click;
        dataSet.click = (clickCount ?? 0) + 1;

        //if (clickCount === commonColors_LENGTH) dataSet.click = void 0;
        //this.style.backgroundColor = "skyblue";
        //this.removeEventListener("mouseenter", mouseenterListener);
        //this.removeEventListener("mouseleave", mouseleaveListener);
    }
}

const dblclickListener = function dblclickListener(this: HTMLTableCellElement, ev: MouseEvent): void {
    const idx = DataSet.of(this).idx;
    if (isCellIdx(idx)) {
        buffer[idx] = idx;
        repaintCell(idx, this);
    }
}

const table = document.createElement("table");
for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
    const tr = document.createElement("tr");
    for (let colIdx = 0; colIdx < 8; colIdx++) {
        const td = document.createElement("td");
        DataSet.of(td).idx = rowIdx * 8 + colIdx;
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

function refillBuffer(buffer: Uint8Array, force = false): number {
    let changeCount = 0;
    for (let idx = 0; idx < buffer.length; idx++) {
        if (force || buffer[idx] % 2 === 0) {
            buffer[idx] = Math.random() * 256;
            ++changeCount;
        }
    }
    return changeCount;
}

function repaintCell(idx: number, cell: HTMLTableCellElement) {
    const byte = buffer[idx];
    cell.innerText = String(byte).padStart(3, "0");
    const dataSet = DataSet.of(cell);
    const clickCount = dataSet.click ?? 0;
    // const backgroundColor: string = byte % 2 === 0
    //     ? "red"
    //     : ((clickCount % 2 === 0) ? "lime" : "green");

    // if (clickCount > 0) {
    //     const backgroundColor = "#" + commonColors[clickCount].toString(16).padStart(6, "0");
    //     cell.style.backgroundColor = backgroundColor;
    // } else {
    //     const backgroundColor = "#" + commonColors[byte % commonColors_LENGTH].toString(16).padStart(6, "0");
    //     cell.style.backgroundColor = backgroundColor;
    // }

    const backgroundColor = "#" + commonColors[(byte + clickCount) % commonColors_LENGTH].toString(16).padStart(6, "0");
    cell.style.backgroundColor = backgroundColor;
}

function repaintTable(table: HTMLTableElement) {
    type Pair = [number, HTMLTableCellElement];
    const cells: Pair[] = Array.from(table.children)
        .filter(row => row instanceof HTMLTableRowElement)
        .flatMap(row => {
            const cells: HTMLCollectionOf<HTMLTableCellElement> = (row as HTMLTableRowElement).cells;
            return Array.from(cells);
        }).map(cell => {
            let ret: Pair;
            const idx = DataSet.of(cell).idx;
            if (isCellIdx(idx)) {
                ret = [idx, cell];
            } else {
                ret = void 0 as unknown as Pair;
            }
            return ret;
        }).filter(pair => pair !== void 0);

    cells.forEach(([idx, cell]) => repaintCell(idx, cell));
}


function repaint(buffer: Uint8Array, table: HTMLTableElement) {
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
            } else {
                refillBuffer(buffer, true);
            }
        }
        repaintTable(table);
    }, 1000);
}

repaint(buffer, table);

export { }

