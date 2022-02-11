import { queryRequiredElement, maxZIndex, queryElements } from "./pageUtils.js";
//const { "bagua-table": baguaTable } = getRequiredHTMLElements("bagua-table");
const baguaTable = queryRequiredElement(document.body, "table", "bagua-table");
//console.log(baguaTable);
const pointerHandler = getPointerHandler();
baguaTable.addEventListener("pointerdown", pointerHandler);
//baguaTable.addEventListener("pointerup", pointerHandler);
baguaTable.addEventListener("selectstart", (ev) => { ev.preventDefault(); });
function getPointerHandler() {
    let currentCell;
    function createEditor() {
        let editor = document.getElementById("editor");
        if (editor === null) {
            editor = document.createElement("textarea");
            editor.textContent = "";
            //editor.style.zIndex = String(maxZIndex() + 1);
            //editor.style.position = "absolute";
            editor.style.display = "none";
            document.body.append(editor);
        }
        editor.style.position = "absolute";
        editor.style.zIndex = String(maxZIndex() + 1);
        return editor;
    }
    const editor = createEditor();
    const okButton = queryElements(editor, "button", "name=ok")[0];
    const cancelButton = queryElements(editor, "button", "name=cancel")[0];
    const textarea = editor.getElementsByTagName("textarea")[0];
    if (textarea) {
        textarea.addEventListener("keydown", (ev) => {
            if (ev.ctrlKey && ev.code === "Enter") {
                if (currentCell) {
                    currentCell.innerHTML = textarea.value;
                }
                textarea.value = "";
                editor.style.display = "none";
                currentCell = null;
            }
        });
    }
    okButton.addEventListener("click", (ev) => {
        const textarea = editor.getElementsByTagName("textarea")[0];
        if (textarea) {
            if (currentCell) {
                currentCell.innerHTML = textarea.value;
            }
            textarea.value = "";
        }
        editor.style.display = "none";
        currentCell = null;
    });
    cancelButton.addEventListener("click", (ev) => {
        const textarea = editor.getElementsByTagName("textarea")[0];
        if (textarea) {
            textarea.value = "";
        }
        editor.style.display = "none";
        currentCell = null;
    });
    return function (ev) {
        if (ev.target instanceof HTMLTableCellElement) {
            const target = ev.target;
            if (ev.type === "pointerdown" && !currentCell) {
                currentCell = target;
                //target.setPointerCapture(ev.pointerId); NO
                //const cs = window.getComputedStyle(ev.target);
                //console.log(cs);
                const box = target.getBoundingClientRect();
                //console.log(box);
                const editorStyle = editor.style;
                editorStyle.top = box.y + window.scrollY + "px";
                editorStyle.left = box.x + window.scrollX + "px";
                editorStyle.width = box.width + "px";
                editorStyle.height = box.height + "px";
                editorStyle.display = "block";
                const textarea = editor.getElementsByTagName("textarea")[0];
                if (textarea) {
                    textarea.value = target.innerHTML;
                    setTimeout(() => { textarea.focus(); });
                }
                //console.log(ev.type);
            }
            // else if (ev.type === "pointerup") {
            //     //currentCell = null;
            //     //editor.style.visibility = "hidden";
            //     //console.log(ev.type);
            // }
        }
    };
}
