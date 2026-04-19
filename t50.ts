import { getRequiredHTMLElements } from "./pageUtils.js";
const { dv, highlightDemo } = getRequiredHTMLElements("dv", "highlightDemo");
//declare const Prism: any;
declare const Prism: { highlightElement: Function };
console.log("Prism:", Prism);

function dvObserverCallback(mutations: MutationRecord[], observer: MutationObserver): void {
    console.log("mutations:", mutations, "observer:", observer);
    for (const mutation of mutations) {
        console.log('dv.mutation:', mutation);
    }
}

const dvObserver = new MutationObserver(dvObserverCallback);

// observe everything except attributes
dvObserver.observe(dv, {
    childList: true, // observe direct children
    subtree: true, // and lower descendants too
    characterDataOldValue: true // pass old data to callback
});


const highlightDemoObserver = new MutationObserver((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
        // examine new nodes, is there anything to highlight?
        for (const node of mutation.addedNodes) {
            // we track only elements, skip other nodes (e.g. text nodes)
            if (!(node instanceof HTMLElement)) continue;

            // check the inserted element for being a code snippet
            if (node.matches('pre[class*="language-"]')) {
                Prism.highlightElement(node);
            }

            // or maybe there's a code snippet somewhere in its subtree?
            for (const elem of node.querySelectorAll('pre[class*="language-"]')) {
                Prism.highlightElement(elem);
            }
        }
    }

});

highlightDemoObserver.observe(highlightDemo, { childList: true, subtree: true });

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

export { };
