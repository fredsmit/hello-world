window.addEventListener("DOMContentLoaded", function () {
    console.log("DOM built");
});

window.addEventListener("load", function (ev:Event) {
    console.log("load");
});

document.addEventListener("loadeddata", function (ev:Event) {
    console.log("loadeddata");
});

document.addEventListener("loadedmetadata", function (ev:Event) {
    console.log("loadedmetadata");
});

document.addEventListener("loadstart", function (ev:Event) {
    console.log("loadstart");
});

document.addEventListener('readystatechange', (event) => {
    console.log(`readystate: ${document.readyState}\n`);
});

export { };
