const a = document.createElement('a');
a.download = 'hello.txt';
const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
const objectUrl = URL.createObjectURL(blob);
console.log("objectUrl:", objectUrl);
a.href = objectUrl;
//a.click();
//URL.revokeObjectURL(a.href);
console.log("a.href:", a.href);
const response = await fetch(objectUrl);
const text = await response.text();
console.log("text:", text);
URL.revokeObjectURL(objectUrl);
const reader = new FileReader();
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
reader.onload = function () {
    const dataUrl = reader.result;
    console.log(dataUrl, typeof dataUrl);
};
export {};
