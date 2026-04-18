import { checkModuleHash } from './module-duplicate-check.js';
async function main() {
    const duplicate = await checkModuleHash(import.meta.url);
    //console.log("duplicate", duplicate);
    if (duplicate)
        return; // ← works perfectly
    // @ts-ignore
    const x = A123;
    let td = x.rows[0].cells[1];
    td.style.backgroundColor = "red";
    const data = [
        [[1.2], [2.2], [3.2], [4.2], [5.2]],
        [[1.1], [2.1], [3.1], [4.1], [5.1]],
        [[1.4], [2.4], [3.4], [4.4], [5.4]],
        [[1.3], [2.3], [3.3], [4.3], [5.3]],
        [[1.5], [2.5], [3.5], [4.5], [5.5]],
    ];
    const table = document.createElement("table");
    for (const row of data) {
        const tr = document.createElement("tr");
        for (const cell of row) {
            const td = document.createElement("td");
            const text = String(cell);
            td.innerText = text;
            const diff = +text.split(".")[0] + +text.split(".")[1];
            if (diff < 6)
                td.style.backgroundColor = "yellow";
            else if (diff === 6)
                td.style.backgroundColor = "lime";
            else
                td.style.backgroundColor = "orange";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}
main();
