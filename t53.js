const link = document.createElement('a');
link.download = 'hello.txt';
const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
const objectUrl = URL.createObjectURL(blob);
console.log("objectUrl:", objectUrl);
link.href = objectUrl;
//link.click();
URL.revokeObjectURL(link.href);
console.log("link.href:", link.href);
const response = await fetch(objectUrl);
const text = await response.text();
console.log("text:", text);
//URL.revokeObjectURL(objectUrl);
const reader = new FileReader();
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
reader.onload = function () {
    const dataUrl = reader.result;
    console.log(dataUrl, typeof dataUrl);
};
export {};
