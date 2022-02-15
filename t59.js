// const xhru = new XMLHttpRequestUpload(); // TypeError: Illegal constructor
// console.log(xhru);
// 1. Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();
//const url = "https://javascript.info/article/xmlhttprequest/example/load";
//const url = "https://javascript.info/xmlhttprequest";
const url = "./data.json";
// 2. Configure it: GET-request for the URL /article/.../load
xhr.open('GET', url);
//xhr.open('POST', url);
// 4. This will be called after the response is received
xhr.onload = function () {
    if (xhr.status !== 200) { // analyze HTTP status of the response
        console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    }
    else { // show the result
        console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
    }
};
xhr.onprogress = function (event) {
    if (event.lengthComputable) {
        console.log(`Received ${event.loaded} of ${event.total} bytes`);
    }
    else {
        console.log(`Received ${event.loaded} bytes`); // no Content-Length
    }
};
xhr.onerror = function () {
    console.log("Request failed");
};
xhr.upload.onprogress = function (event) {
    console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
};
xhr.upload.onload = function () {
    console.log(`Upload finished successfully.`);
};
xhr.upload.onerror = function () {
    console.log(`Error during the upload: ${xhr.status}`);
};
// 3. Send the request over the network
xhr.send();
export {};
