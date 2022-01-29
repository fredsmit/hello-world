let elements = document.querySelectorAll('ul > li:last-child');
for (let elem of elements) {
    console.log(elem.innerHTML); // "test", "passed"
}
export {};
