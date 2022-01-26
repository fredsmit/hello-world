const url = "https://raw.githubusercontent.com/fredsmit/hello-world/master/data.json";

const promise = fetch(url);

promise.then(async response => {

    const dvHead = document.getElementById("dvHead");
    if (dvHead && dvHead.tagName === "H1") {
        dvHead.innerText = "Cool, the data is loaded.";
    }

    const div = document.createElement('code');
    const json = await response.json();

    div.innerText = JSON.stringify(json, null, 2);
    document.body.append(div);
    throw new Error("BUM");
}, (reason: any) => {
    console.log("reason:", reason);
}).catch(error => {
    console.log("ERROR:", error);
});

