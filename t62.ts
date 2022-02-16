async function toOrigin2() {

    try {
        //const response = await fetch("http://localhost:8080/cors");

        //const response = await fetch("http://localhost:5500/data.json"); // OK
        // Fetched: http://localhost:5500/data.json
        // ['cache-control', 'public, max-age=0']
        // ['content-length', '30']
        // ['content-type', 'application/json; charset=UTF-8']
        // ['last-modified', 'Wed, 26 Jan 2022 21:27:30 GMT']

        // const response = await fetch("http://127.0.0.1:5500/data.json"); // OK
        // Fetched: http://127.0.0.1:5500/data.json
        // ['accept-ranges', 'bytes']
        // ['access-control-allow-credentials', 'true']
        // ['cache-control', 'public, max-age=0']
        // ['content-length', '30']
        // ['content-type', 'application/json; charset=UTF-8']
        // ['date', 'Wed, 16 Feb 2022 10:17:40 GMT']
        // ['etag', 'W/"1e-17e984955db"']
        // ['last-modified', 'Wed, 26 Jan 2022 21:27:30 GMT']
        // ['vary', 'Origin']

        const response: Response = await fetch("./data.json"); // OK
        // Fetched: http://127.0.0.1:5500/data.json
        // ['accept-ranges', 'bytes']
        // ['access-control-allow-credentials', 'true']
        // ['cache-control', 'public, max-age=0']
        // ['content-length', '30']
        // ['content-type', 'application/json; charset=UTF-8']
        // ['date', 'Wed, 16 Feb 2022 10:19:36 GMT']
        // ['etag', 'W/"1e-17e984955db"']
        // ['last-modified', 'Wed, 26 Jan 2022 21:27:30 GMT']
        // ['vary', 'Origin']

        console.log("Fetched:", response.url);
        for (const header of response.headers) {
            console.log("header:", header);
        }

        console.log("result:", await response.json());

        await new Promise(resolve => {
            setTimeout(() => resolve(true), 5000);
        });
        console.log("awaited moment");

    } catch (error) {
        console.error(error);
    }
}

async function toOrigin() {

    try {

        const img = document.createElement("img");
        img.src = "./img/ball.svg";
        document.body.append(img);


    } catch (error) {
        console.error(error);
    }
}

const socket = new WebSocket("ws://localhost:8080", ["p1", "p2"]);
toOrigin();
toOrigin2();

console.log("WebSocket.CONNECTING, OPEN, CLOSING, CLOSED:", WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED);
console.log("socket.readyState:", socket.readyState, "socket.protocol:", socket.protocol);

socket.onopen = async function (this: WebSocket, ev: Event) {
    console.log("socket.readyState:", socket.readyState, "socket.protocol:", socket.protocol);
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("My name is John I");
    await new Promise(resolve => {
        setTimeout(() => resolve(true), 5000);
    });
    toOrigin();
    toOrigin2();
    socket.send("My name is John II");
    await new Promise(resolve => {
        setTimeout(() => resolve(true), 5000);
    });
    socket.send("My name is John III");
};

socket.onmessage = function (this: WebSocket, ev: MessageEvent<unknown>) {
    console.log(`[message] Data received from server: ${ev.data}`);
};

socket.onclose = function (this: WebSocket, ev: CloseEvent) {
    if (ev.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${ev.code} reason=${ev.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

socket.onerror = function (this: WebSocket, ev: Event) {
    console.log(`[error] ${ev}`);
};

export { };
