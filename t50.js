import { getRequiredHTMLElements } from "./pageUtils.js";
function observerCallback(mutations, observer) {
    //console.log("mutations:", mutations, "observer:", observer);
    for (const mutation of mutations) {
        console.log(mutation);
    }
}
const observer = new MutationObserver(observerCallback);
const { dv1, highlightDemo } = getRequiredHTMLElements("dv1", "highlightDemo");
// observe everything except attributes
observer.observe(dv1, {
    childList: true,
    subtree: true,
    characterDataOldValue: true // pass old data to callback
});
let observer2 = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        // examine new nodes, is there anything to highlight?
        for (let node of mutation.addedNodes) {
            // we track only elements, skip other nodes (e.g. text nodes)
            if (!(node instanceof HTMLElement))
                continue;
            // check the inserted element for being a code snippet
            if (node.matches('pre[class*="language-"]')) {
                Prism.highlightElement(node);
            }
            // or maybe there's a code snippet somewhere in its subtree?
            for (let elem of node.querySelectorAll('pre[class*="language-"]')) {
                Prism.highlightElement(elem);
            }
        }
    }
});
observer2.observe(highlightDemo, { childList: true, subtree: true });
// dynamically insert content with code snippets
highlightDemo.innerHTML = `A code snippet is below:
<pre class="language-typescript"><code>import { getRequiredHTMLElements } from "./pageUtils.js";

declare const Prism: any;

console.log(Prism);

const { p } = getRequiredHTMLElements("p");

const range = new Range();
if (p.firstChild) {
    range.setStart(p.firstChild, 2);
    range.setEnd(p.firstChild, 4);
}

console.log(range);
// toString of a range returns its content as text
console.log(range.toString()); // ll

export { };
</code></pre>
<div contenteditable>Another one:</div>
<div>
<pre class="language-css"><code>.class { margin: 5px; color: red; }
</code></pre>
</div>
`;
console.log(Prism);
