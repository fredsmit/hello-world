console.log("f:", document["f"]);
document["f2"] = function () {
    console.log("document.f2");
};
window["f3"] = function () {
    console.log("window.f3");
};
console.log(document);
console.log(window);
export {};
