window.addEventListener("DOMContentLoaded", function () {
    console.log("DOM built");
});
window.addEventListener("load", function (ev) {
    console.log("load");
});
document.addEventListener("loadeddata", function (ev) {
    console.log("loadeddata");
});
document.addEventListener("loadedmetadata", function (ev) {
    console.log("loadedmetadata");
});
document.addEventListener("loadstart", function (ev) {
    console.log("loadstart");
});
document.addEventListener('readystatechange', (event) => {
    console.log(`readystate: ${document.readyState}\n`);
});
export {};
