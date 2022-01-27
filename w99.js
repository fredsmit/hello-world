"use strict";
const url = "https://raw.githubusercontent.com/fredsmit/hello-world/master/data.json";
function getData1(url) {
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
                    reject(Error("Invalid data."));
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
function getData(url) {
    url = (url ?? "").trim();
    if (url.length === 0) {
        return Promise.reject(Error("Invalid argument: url"));
    }
    return fetch(url).then(async (response) => {
        if (response.status === 200) {
            const json = await response.json();
            if ("user" in json && json.user === "fredsmit") {
                return { name: json.user };
            }
            else {
                throw Error("Invalid data.");
            }
        }
        else {
            const statusText = (response.statusText ?? "").trim();
            const msg = statusText.length > 0 ? statusText : `HTTP response status: ${response.status}`;
            throw Error(msg);
        }
    });
}
getData(url).then((data) => {
    const dvH1Id = "dvH1";
    const dvH1 = document.getElementById(dvH1Id);
    if (dvH1 && dvH1.tagName === "H1") {
        dvH1.innerText = "Cool, the data is loaded.";
    }
    else {
        const msg = `Missing HTML element: ${dvH1Id}`;
        throw Error(msg);
    }
    const div = document.createElement('code');
    div.innerText = JSON.stringify(data, null, 2);
    document.body.append(div);
}, (reason) => {
    console.log("Promise rejected. Reason:", reason);
}).catch(reason => {
    console.log("Data processing failed. Reason:", reason);
});
