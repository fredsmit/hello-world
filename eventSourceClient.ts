import { getRequiredHTMLElements } from "./pageUtils.js";

const eventSourceUrl = "http://localhost:8080/digits";
const { logElem } = getRequiredHTMLElements("logElem");

let eventSource: EventSource;

(document as any)["start"] = start;
(document as any)["stop"] = stop;

function start() { // when "Start" button pressed
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
    } else {
      log("Error has occured.");
    }
  };

  eventSource.addEventListener('bye', function (ev: Event) {
    if (ev instanceof MessageEvent) {
      log(`Event: ${ev.type}, data: ${ev.data}`);
    } else {
      log("Event: " + ev.type);
    }
  });

  eventSource.onmessage = function (ev: MessageEvent) {
    log("Event: message, data: " + ev.data);
  };
}

function stop() { // when "Stop" button pressed
  eventSource.close();
  log("eventSource.close()");
}

function log(msg: string) {
  logElem.innerHTML += msg + "<br>";
  document.documentElement.scrollTop = 99999999;
}
