import { queryRequiredElement } from "./pageUtils.js";
import { Uploader } from "./uploader.js";
let uploader;
const btnStop = queryRequiredElement(document.body, "button", "btnStop");
btnStop.addEventListener("click", function (ev) {
    if (uploader) {
        console.log("uploader stop (hint)");
        uploader.stop();
    }
    else {
        console.log("uploader inactive");
    }
});
function onProgress(loaded, total, lengthComputable) {
    console.log("progress " + loaded + ' / ' + total);
    //console.log("lengthComputable:", lengthComputable);
}
const formUpload = document.forms.namedItem("upload");
if (!formUpload)
    throw Error("Missing required form element.");
formUpload.onsubmit = async function (e) {
    e.preventDefault();
    const myFile = formUpload.elements.namedItem("myfile");
    if (myFile instanceof HTMLInputElement) {
        let file = myFile.files?.[0];
        if (!file)
            return;
        console.log("file.size:", file.size);
        uploader = new Uploader(file, onProgress);
        try {
            let uploaded = await uploader.upload();
            console.log("Uploader: ", uploaded);
            const progressEl = queryRequiredElement(document.body, "div", "progress");
            if (progressEl) {
                progressEl.textContent = uploaded;
            }
            // if (uploaded) {
            //     console.log('success');
            // } else {
            //     console.log('stopped');
            // }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            uploader = null;
        }
    }
};
