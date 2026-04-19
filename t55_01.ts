const url = "https://resources.whatwg.org/logo.svg"
const response = await fetch(url);

const blob = await response.blob(); // download as Blob object
const img = document.createElement('img');

img.setAttribute("style", 'position:fixed;top:10px;left:10px;width:100px');
img.alt = "";
document.body.append(img);

// show it
img.src = URL.createObjectURL(blob);

setTimeout(() => { // hide after three seconds
    img.remove();
    URL.revokeObjectURL(img.src);
}, 3000);

export { };
