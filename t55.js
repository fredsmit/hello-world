(async () => {
    //const urlFetch = "https://resources.whatwg.org/logo-fetch.svg";
    const url = "https://resources.whatwg.org/logo.svg";
    let response = await fetch(url);
    let blob = await response.blob(); // download as Blob object
    // create <img> for it
    let img = document.createElement('img');
    // @ts-ignore
    img.style = 'position:fixed;top:10px;left:10px;width:100px';
    //img.setAttribute("style", 'position:fixed;top:10px;left:10px;width:100px');
    img.alt = "";
    document.body.append(img);
    // show it
    img.src = URL.createObjectURL(blob);
    setTimeout(() => {
        img.remove();
        URL.revokeObjectURL(img.src);
    }, 3000);
})();
export {};
