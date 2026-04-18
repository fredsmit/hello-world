const elements = document.body.querySelectorAll('ul > li:last-child');
for (const elem of elements) {
    console.log(elem.innerHTML); // "test", "passed"
}
// A crashed app is more reliable and diagnosable
// than an app with undefined behavior.
[1, 2, 3].forEach(console.log);
console.log("World");
[1, 2, 3].forEach(console.dir);
export {};
