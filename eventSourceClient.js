import { getRequiredHTMLElements } from "./pageUtils.js";
const eventSourceUrl = "http://localhost:8080/digits";
const { logElem } = getRequiredHTMLElements("logElem");
let eventSource;
document["start"] = start;
document["stop"] = stop;
function start() {
    if (!window.EventSource) {
        // IE or an old browser
        alert("The browser doesn't support EventSource.");
        return;
    }
    eventSource = new EventSource(eventSourceUrl);
    eventSource.onopen = function (e) {
        log("Event: open");
    };
    eventSource.onerror = function (e) {
        log("Event: error");
        if (this.readyState == EventSource.CONNECTING) {
            log(`Reconnecting (readyState=${this.readyState})...`);
        }
        else {
            log("Error has occured.");
        }
    };
    eventSource.addEventListener('bye', function (ev) {
        if (ev instanceof MessageEvent) {
            log(`Event: ${ev.type}, data: ${ev.data}`);
        }
        else {
            log("Event: " + ev.type);
        }
    });
    eventSource.onmessage = function (ev) {
        log("Event: message, data: " + ev.data);
    };
}
function stop() {
    eventSource.close();
    log("eventSource.close()");
}
function log(msg) {
    logElem.innerHTML += msg + "<br>";
    document.documentElement.scrollTop = 99999999;
}
