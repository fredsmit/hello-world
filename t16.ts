// <reference lib="dom" />

console.log("f:", (document as any)["f"]);
(document as any)["f2"] = function () {
    console.log("document.f2");
};
(window as any)["f3"] = function () {
    console.log("window.f3");
};

console.log(document);
console.log(window);

export { };
