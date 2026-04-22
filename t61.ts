import { getRequiredNamedForm, getRequiredNamedFormControl, queryRequiredElement1 } from "./pageUtils.js";

const serverUrl = new URL("https:/localhost:7072");
let abortController = new AbortController();

const htmlForm = getRequiredNamedForm("publish");
PublishForm(htmlForm, new URL("/publish", serverUrl.origin));

// random url parameter to avoid any caching issues
const subscribeEl = queryRequiredElement1("div", "subscribe");
//SubscribePane(subscribeEl, serverOrigin + '/subscribe?random=' + Math.random());
const url = new URL('/subscribe?random=' + Math.random(), serverUrl.origin);
SubscribePane(subscribeEl, url);


// Sending messages, a simple POST
function PublishForm(form: HTMLFormElement, url: URL) {

    const messageField = getRequiredNamedFormControl(form, "message", (c): c is HTMLInputElement => c instanceof HTMLInputElement)

    function sendMessage(message: string) {
        fetch(url, {
            method: 'POST',
            mode: "cors",
            referrerPolicy: "no-referrer",
            body: message
        });
    }

    form.onsubmit = function () {
        const message = messageField.value;
        if (message) {
            messageField.value = "";
            if (message === "stop") {
                abortController.abort();
                abortController = new AbortController();
            }
            else
                sendMessage(message);
        }
        return false;
    };
}

// Receiving messages with long polling
function SubscribePane(messagesEl: HTMLElement, url: URL) {

    function showMessage(message: string) {
        const div = document.createElement('div');
        div.textContent = message;
        messagesEl.append(div);
    }

    async function subscribe(): Promise<void> {
        try {
            const fetchInit: RequestInit = {
                method: "GET",
                mode: "cors",
                signal: abortController.signal
            };
            const response = await fetch(url, fetchInit);
            if (response.status == 502) {
                // Connection timeout
                // happens when the connection was pending for too long
                // let's reconnect
                //await subscribe();
            } else if (response.status != 200) {
                // Show Error
                showMessage(response.statusText);
                // Reconnect in one second
                await new Promise(resolve => setTimeout(resolve, 1000));
                //await subscribe();
            } else {
                // Got message
                const message = await response.text();
                showMessage(message);
                //await subscribe();
            }
        } catch (error) {
            showMessage("Error:" + String(error));
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe();
    }

    subscribe();

}

export { };
