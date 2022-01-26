"use strict";
const url = "https://raw.githubusercontent.com/fredsmit/hello-world/master/data.json";
function getData(url) {
    url = (url ?? "").trim();
    if (url.length === 0) {
        return Promise.reject(Error("Invalid argument: url"));
    }
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (response.status === 200) {
                const json = await response.json();
                if ("user" in json && json.user === "fredsmit") {
                    resolve({ name: json.user });
                }
                else {
                    throw Error("Invalid data.");
                }
            }
            else {
                const statusText = (response.statusText ?? "").trim();
                const msg = statusText.length > 0 ? statusText : `HTTP response status: ${response.status}`;
                reject(Error(msg));
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
getData(url).then((data) => {
    const dvHead = document.getElementById("dvHead");
    if (dvHead && dvHead.tagName === "H1") {
        dvHead.innerText = "Cool, the data is loaded.";
    }
    const div = document.createElement('code');
    div.innerText = JSON.stringify(data, null, 2);
    if (div.innerText.includes("name"))
        throw "yes";
    document.body.append(div);
}, (reason) => {
    console.log("Promise rejected. Reason:", reason);
}).catch(reason => {
    console.log("Promise processing failed. Reason:", reason);
});
