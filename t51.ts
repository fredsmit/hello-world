import { getRequiredHTMLElements, queryRequiredElement } from "./pageUtils.js";

declare const Prism: any;

console.log(Prism);

const {
    btnSelect, p, p2, progress, btnOpen
} = getRequiredHTMLElements("btnSelect", "p", "p2", "progress", "btnOpen");

const frame1 = queryRequiredElement(document.body, "iframe", "frame1");

const range = new Range();
if (p.firstChild) {
    range.setStart(p.firstChild, 2);
    range.setEnd(p.firstChild, 4);
}

console.log(range);
// toString of a range returns its content as text
console.log(range.toString()); // ll

btnSelect.addEventListener("click", function (this: HTMLElement, ev: MouseEvent): void {

    const range = new Range();
    if (p2.firstChild) {
        range.setStart(p2, 0);
        range.setEnd(p2, 2);
        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(range);
    }

    console.log(range);
    // toString of a range returns its content as text
    console.log(range.toString()); // ll

});

let n: number = 0;
function count() {
    // do a piece of the heavy job (*)
    do {
        ++n;
        progress.textContent = String(n);
        //console.log("count");
    } while (n % 1e3 != 0);

    if (n < 1e6) {
        setTimeout(count);
        queueMicrotask(count);
    }
}

//count();

queueMicrotask(() => {
    console.log("n:", n);
});

n = 123;

console.log("n1:", n);

console.log("--- module end ---");


btnOpen.addEventListener("click", function (this: HTMLElement, ev: MouseEvent): void {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
    //const url = "about:blank";
    const url = "http://localhost:5500/t38.html";
    const newWin = window.open(url, "hello", params);
    if (newWin) {
        // newWin.document.write(
        //     "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
        // );
    }
});

frame1.onload = function () {
    // we can get the reference to the inner window
    let iframeWindow = frame1.contentWindow; // OK
    try {
        // ...but not to the document inside it
        let doc = frame1.contentDocument; // ERROR
    } catch (e) {
        alert(e); // Security Error (another origin)
    }

    // also we can't READ the URL of the page in iframe
    try {
        // Can't read URL from the Location object
        let href = frame1.contentWindow?.location.href; // ERROR
    } catch (e) {
        alert(e); // Security Error
    }

    // ...we can WRITE into location (and thus load something else into the iframe)!
    if (frame1.contentWindow) {
        frame1.contentWindow.location = '/'; // OK
    }

    frame1.onload = null; // clear the handler, not to run it after the location change
};



export { };
