if (globalThis.window) {
    window.addEventListener('unhandledrejection', function (ev: PromiseRejectionEvent) {
        ev.preventDefault();
        console.log("PromiseRejectionEvent.promise:", ev.promise);
        console.log("PromiseRejectionEvent.reason)", ev.reason);
    });
}

//const defaultUrl = "https://raw.githubusercontent.com/fredsmit/hello-world/master/data.json";
const defaultUrl = "https://raw.githubusercontent.com/fredsmit/hello-world/refs/heads/master/t59_data.json";

type TData = { name: string };

function getData(url: string = defaultUrl): Promise<TData> {

    url = url?.trim() ?? "";
    if (url.length === 0) {
        return Promise.reject(Error("Invalid argument: url"));
    }

    return new Promise<TData>(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (response.status === 200) {
                const json = await response.json();
                if ("user" in json && json.user === "fredsmit") {
                    resolve({ name: json.user });
                } else {
                    reject(Error("Invalid data."));
                }
            } else {
                const statusText = response.statusText?.trim() ?? "";
                const msg = statusText.length > 0 ? statusText : `HTTP response status: ${response.status}`;
                reject(Error(msg));
            }
        } catch (error) {
            reject(error);
        }
    });
}

export { getData, defaultUrl };
