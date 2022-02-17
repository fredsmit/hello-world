class TimeFormatted extends HTMLDivElement { // (1)

    constructor() {
        super();
        //this.setAttribute("datetime", "2000-01-01");
    }

    private rendered: boolean | undefined;

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }

        if (this.isConnected) {
            setInterval(() => {
                const date = new Date(this.getAttribute('datetime') ?? Date.now());
                this.setAttribute('datetime', new Date(date.valueOf() + 1000).toString());
            }, 1000);
        }
    }

    static get observedAttributes() {
        //return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
        return ['datetime'];
    }

    attributeChangedCallback(name: unknown, oldValue: unknown, newValue: unknown) {
        //console.log("name:", name, "oldValue:", oldValue, "newValue:", newValue);
        if (this.rendered) {
            this.render();
        }
    }

    private render(): void {

        // interface DateTimeFormatOptions {
        //     localeMatcher?: "best fit" | "lookup" | undefined;
        //     weekday?: "long" | "short" | "narrow" | undefined;
        //     era?: "long" | "short" | "narrow" | undefined;
        //     year?: "numeric" | "2-digit" | undefined;
        //     month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
        //     day?: "numeric" | "2-digit" | undefined;
        //     hour?: "numeric" | "2-digit" | undefined;
        //     minute?: "numeric" | "2-digit" | undefined;
        //     second?: "numeric" | "2-digit" | undefined;
        //     timeZoneName?: "long" | "short" | undefined;
        //     formatMatcher?: "best fit" | "basic" | undefined;
        //     hour12?: boolean | undefined;
        //     timeZone?: string | undefined;
        // }

        // interface ResolvedDateTimeFormatOptions {
        //     locale: string;
        //     calendar: string;
        //     numberingSystem: string;
        //     timeZone: string;
        //     hour12?: boolean;
        //     weekday?: string;
        //     era?: string;
        //     year?: string;
        //     month?: string;
        //     day?: string;
        //     hour?: string;
        //     minute?: string;
        //     second?: string;
        //     timeZoneName?: string;
        // }

        const date = new Date(this.getAttribute('datetime') ?? Date.now());

        const dateTimeFormat = Intl.DateTimeFormat("default", {
            year: (this.getAttribute('year') ?? "2-digit") as Intl.DateTimeFormatOptions["year"],
            month: (this.getAttribute('month') ?? "2-digit") as Intl.DateTimeFormatOptions["month"],
            day: (this.getAttribute('day') ?? "2-digit") as Intl.DateTimeFormatOptions["day"],
            hour: (this.getAttribute('hour') ?? "2-digit") as Intl.DateTimeFormatOptions["hour"],
            minute: (this.getAttribute('minute') ?? "2-digit") as Intl.DateTimeFormatOptions["minute"],
            second: (this.getAttribute('second') ?? "2-digit") as Intl.DateTimeFormatOptions["second"],
            timeZoneName: (this.getAttribute('time-zone-name') ?? "long") as Intl.DateTimeFormatOptions["timeZoneName"],
        });

        //console.log("dateTimeFormat:", dateTimeFormat.resolvedOptions());

        //this.innerHTML = "<span>" + dateTimeFormat.format(date) + "</span>";
        //this.innerText = dateTimeFormat.format(date);
        this.textContent = dateTimeFormat.format(date);
        //const span = document.createElement("span");
        //span.textContent = dateTimeFormat.format(date);
        //this.append(span);
    }
}

window.customElements.define("time-formatted", TimeFormatted, { extends: "div" }); // (2)

// <time-formatted datetime="2019-12-01"
// year="numeric"
// month="long"
// day="numeric"
// hour="numeric"
// minute="numeric"
// second="numeric"
// time-zone-name="short">
// </time-formatted>

const x = document.createElement("div", { is: "time-formatted" });
x.setAttribute("datetime", "2022-02-17");
x.setAttribute("year", "2-digit");
x.setAttribute("month", "long");
x.setAttribute("day", "numeric");
x.setAttribute("hour", "numeric");
x.setAttribute("minute", "numeric");
x.setAttribute("second", "numeric");
x.setAttribute("time-zone-name", "short");
document.body.append(x);

// setInterval(() => {
//     x.setAttribute('datetime', new Date().toString());
// }, 1000); // (5)

class ClockElement extends HTMLSpanElement {
    constructor() {
        super();
    }

    private rendered: boolean | undefined;
    private timer: number | null | undefined;

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.style.backgroundColor = "lime";
            this.rendered = true;
        }

        if (this.isConnected) {
            this.timer = setInterval(() => {
                const date = this.render();
                this.dispatchEvent(new CustomEvent<Date>("tick", { detail: date }))
            }, 1000);
        }
    }

    static get observedAttributes() {
        return [];
    }

    get now(): Date {
        return new Date();
    }

    private render(): Date {

        const dateTimeFormat = Intl.DateTimeFormat("default", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        const date = this.now;
        this.textContent = dateTimeFormat.format(date);
        return date;
    }

    attributeChangedCallback(name: unknown, oldValue: unknown, newValue: unknown) {
        console.log("name:", name, "oldValue:", oldValue, "newValue:", newValue);
    }

    disconnectedCallback() {
        console.log("disconnectedCallback:", this);
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

window.customElements.define("clock-span", ClockElement, { extends: "span" });

const clock = document.getElementById("clock");
clock?.removeAttribute("is");

clock?.addEventListener("tick", function (ev: Event): void {
    //console.log("ev:", ev, Object.prototype.toString.call(ev));
    if (ev instanceof CustomEvent) {
        console.log(ev.detail);
    }
});

setTimeout(() => {
    clock?.remove();
}, 10000);

export { };
