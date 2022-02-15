window.addEventListener("error", function (ev) {
    console.log("window.ErrorEvent:", ev);
    ev.preventDefault();
});
// window.addEventListener("unhandledrejection", function (ev: Event): void {
//     console.log("window:", ev);
//     ev.preventDefault();
// });
// Step 1: start the fetch and obtain a reader
const abortController = new AbortController();
const signal = abortController.signal;
//signal.addEventListener('abort', (ev: Event) => console.log("abort!"));
console.log("window.origin:", window.origin);
const url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100';
const response = await fetch(url, {
    signal,
    method: "GETx",
    referrerPolicy: "no-referrer",
    cache: "reload",
    headers: {
    //        "Origin": window.origin,
    //        "Access-Control-Request-Method": "GET",
    //        "Access-Control-Request-Headers": "Content-Length"
    //"Content-Type": "text/plain"
    }
});
const reader = response.body?.getReader();
// Step 2: get total length
const contentLength = +(response.headers?.get('Content-Length') ?? "0");
setTimeout(() => {
    console.log("signal.abort");
    abortController.abort();
}, 100);
try {
    // Step 3: read the data
    let receivedLength = 0; // received that many bytes at the moment
    let chunks = []; // array of received binary chunks (comprises the body)
    if (reader) {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            if (value) {
                chunks.push(value);
                receivedLength += value.length;
            }
            console.log(`Received ${receivedLength} of ${contentLength}`);
        }
    }
    // Step 4: concatenate chunks into single Uint8Array
    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for (let chunk of chunks) {
        chunksAll.set(chunk, position); // (4.2)
        position += chunk.length;
    }
    // Step 5: decode into a string
    //const result = new TextDecoder("utf-8").decode(chunksAll);
    const textDecoder = new TextDecoder();
    console.log("textDecoder:", textDecoder.encoding);
    const result = textDecoder.decode(chunksAll);
    // We're done!
    const commits = JSON.parse(result);
    console.log(commits[0].author.login);
}
catch (error) {
    if (error instanceof DOMException) {
        //console.error("ERROR:", error, Object.prototype.toString.call(error));
        console.error("ERROR:", error, "code:", error.code, "name:", error.name);
    }
    else {
        throw error;
    }
}
export {};
