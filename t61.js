import { getRequiredNamedForm, getRequiredNamedFormControl, queryRequiredElement } from "./pageUtils.js";
const htmlForm = getRequiredNamedForm("publish");
PublishForm(htmlForm, "http://localhost:8080/publish");
// random url parameter to avoid any caching issues
const subscribeEl = queryRequiredElement(document.body, "div", "subscribe");
SubscribePane(subscribeEl, 'http://localhost:8080/subscribe?random=' + Math.random());
// Sending messages, a simple POST
function PublishForm(form, url) {
    const messageField = getRequiredNamedFormControl(form, "message", (c) => c instanceof HTMLInputElement);
    function sendMessage(message) {
        fetch(url, {
            method: 'POST',
            body: message
        });
    }
    form.onsubmit = function () {
        const message = messageField.value;
        if (message) {
            messageField.value = "";
            sendMessage(message);
        }
        return false;
    };
}
// Receiving messages with long polling
function SubscribePane(messagesEl, url) {
    function showMessage(message) {
        const div = document.createElement('div');
        div.textContent = message;
        messagesEl.append(div);
    }
    async function subscribe() {
        const response = await fetch(url);
        if (response.status == 502) {
            // Connection timeout
            // happens when the connection was pending for too long
            // let's reconnect
            await subscribe();
        }
        else if (response.status != 200) {
            // Show Error
            showMessage(response.statusText);
            // Reconnect in one second
            await new Promise(resolve => setTimeout(resolve, 1000));
            await subscribe();
        }
        else {
            // Got message
            const message = await response.text();
            showMessage(message);
            await subscribe();
        }
    }
    subscribe();
}
