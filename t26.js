import { getRequiredHTMLElements } from "./pageUtils.js";
const { grid } = getRequiredHTMLElements("grid");
if (!(grid instanceof HTMLTableElement))
    throw Error("Missing required table element.");
const tHead = grid.tHead;
if (!(tHead instanceof HTMLTableSectionElement))
    throw Error("Missing table head.");
const tHeadRows = tHead.rows;
if (tHeadRows.length !== 1)
    throw Error("Table head must contain single row.");
const tHeadRow = tHeadRows[0];
const headCells = tHeadRow.cells;
if (headCells.length !== 2)
    throw Error("Table head must contain two cells.");
const headCellFirst = headCells[0];
const headCellSecond = headCells[1];
const permittedColumnTypes = ["number", "string"];
const firstColumnType = headCellFirst.dataset["type"] ?? "string";
const secondColumnType = headCellSecond.dataset["type"] ?? "string";
if (!(permittedColumnTypes.includes(firstColumnType) &&
    permittedColumnTypes.includes(secondColumnType)))
    throw Error("Invalid column types.");
const tdsArray = Array.from(grid.tBodies);
const rawRows = tdsArray.flatMap(section => Array.from(section.rows));
const dataRows = rawRows.map(row => {
    const dataCells = Array.from(row.cells);
    if (dataCells.length !== 2)
        throw Error("Data rows must contain exactly two cells.");
    return [
        (dataCells[0].textContent ?? "").trim(),
        (dataCells[1].textContent ?? "").trim(),
        row
    ];
});
// console.log(firstColumnType, secondColumnType);
// console.log(dataRows);
// console.log(rawRows);
grid.addEventListener("click", function (ev) {
    if (!(ev.target && ev.target instanceof HTMLElement))
        return;
    const sortNumbers = (a, b) => {
        return +a - +b;
    };
    const collator = new Intl.Collator();
    const sortTexts = (a, b) => {
        return collator.compare(a, b);
    };
    const target = ev.target;
    const buttons = Array.from(grid.querySelectorAll("th[data-type]"));
    if (buttons.includes(target)) {
        const sortByType = target.dataset["type"];
        const idx = (buttons.findIndex(button => button === target) % 2) === 1 ? 1 : 0;
        dataRows.sort((rowA, rowB) => {
            const a = rowA[idx];
            const b = rowB[idx];
            if (sortByType === "number") {
                return sortNumbers(a, b);
            }
            else {
                return sortTexts(a, b);
            }
        });
        dataRows.forEach((dataRow, idx) => {
            const sortedRow = dataRow[2];
            const parentBody = sortedRow.parentElement;
            if (parentBody === null)
                throw Error("This should never happen: parentElement is null.");
            parentBody.append(sortedRow);
        });
    }
});
