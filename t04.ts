const ageTable = document.getElementById('age-table');
console.log("ageTable:", ageTable);

const labels: HTMLCollectionOf<HTMLLabelElement> | undefined = ageTable?.getElementsByTagName("label");
console.log("labels:", labels);
const list: NodeListOf<Element> = document.querySelectorAll('#age-table label')

if (ageTable instanceof HTMLTableElement) {
    const cells = Array.from(ageTable.rows).flatMap(row => Array.from(row.cells));
    console.log("cells:", cells);
    const foundCell = cells.find(cell => {
        return cell.innerText.includes("Age")
    });
    console.log("foundCell:", foundCell);
}

const searchForms = Array.from(document.getElementsByName("search")).filter(html => html.tagName === "FORM");

console.log("searchForms:", searchForms);
console.log("searchForms.length:", searchForms.length);

if (searchForms.length > 0) {
    const inputs: HTMLCollectionOf<HTMLInputElement> = searchForms[0].getElementsByTagName("input");
    // form.querySelector('input')
    // const x: HTMLCollectionOf<HTMLElement> = searchForms[0].getElementsByTagName("input");
    // console.log("x:", x.item(0)); // null
    // console.log("x[0]:", x[0]); // undefined
    //console.log("next:", inputs[Symbol.iterator]().next());

    if (inputs.length > 0) {
        console.log(inputs[0], inputs[inputs.length - 1]);
    }
}

console.log("document.querySelector('form[name=\"search\"]')", document.querySelector('form[name="search"]'));


export { };
