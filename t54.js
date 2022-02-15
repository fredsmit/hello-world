import { queryRequiredElement } from "./pageUtils.js";
// take any image
const img = queryRequiredElement(document.body, "img", "n1");
const nFile = queryRequiredElement(document.body, "input", "nFile");
nFile.multiple = true;
nFile.addEventListener("change", function (ev) {
    if (this.files) {
        for (const file of this.files) {
            console.log("file:", file);
        }
    }
});
// make <canvas> of the same size
const canvas = document.createElement('canvas');
// canvas.width = img.clientWidth;
// canvas.height = img.clientHeight;
canvas.width = img.clientHeight;
canvas.height = img.clientWidth;
//document.body.append(canvas);
const renderingContext = canvas.getContext('2d');
if (renderingContext === null)
    throw Error("Canvas rendering context not available.");
// copy image to it (this method allows to cut image)
renderingContext.rotate(45);
renderingContext.drawImage(img, 0, 0);
// we can context.rotate(), and do many other things on canvas
// toBlob is async operation, callback is called when done
canvas.toBlob(function (blob) {
    if (!blob)
        return;
    // blob ready, download it
    // const link = document.createElement('a');
    // link.download = 'example.png';
    // link.href = URL.createObjectURL(blob);
    // link.click();
    // delete the internal blob reference, to let the browser clear memory from it
    // URL.revokeObjectURL(link.href);
    const objectUrl = URL.createObjectURL(blob);
    img.src = objectUrl;
    //URL.revokeObjectURL(objectUrl);
}, 'image/png');
