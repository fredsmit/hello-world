//import { getCommonColors } from "./commonColors.js";
//let commonColors = getCommonColors();
//document.documentElement.addEventListener("dblclick", dblclickListener);
document.documentElement.addEventListener("click", dblclickListener);
let clickCount = 0;
async function dblclickListener(ev) {
    console.log("Wait:", Date.now());
    const dvCalendar = document.getElementById("dvCalendar");
    if (dvCalendar) {
        const dataSet = dvCalendar.dataset;
        // const year = +(dataSet.year ?? new Date().getFullYear());
        // const month = +(dataSet.month ?? new Date().getMonth());
        const year = dataSet.year ?? new Date().getFullYear();
        const month = dataSet.month ?? new Date().getMonth();
        const createCalendar = createCalendarMethod.bind(document);
        const [calendarCaptionDiv, calendarTable] = createCalendar(+year, +month + clickCount);
        const old_calendarCaptionDiv = document.querySelector(".calendar-caption");
        if (old_calendarCaptionDiv) {
            old_calendarCaptionDiv.replaceWith(calendarCaptionDiv);
        }
        else {
            dvCalendar.before(calendarCaptionDiv);
        }
        dvCalendar.replaceChildren(calendarTable);
    }
    clickCount += ev.ctrlKey ? -1 : 1;
}
function createCalendarMethod(year, month) {
    const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    //const monthDays = new Array<number[]>(6).fill(new Array<number>(7).fill(0));
    const monthDays = new Array(42).fill("\xA0\xA0");
    const date = new Date(year, month, 1);
    year = date.getFullYear();
    month = date.getMonth();
    let daysAdded = 0;
    for (let idx = (date.getDay() + 6) % 7; idx < monthDays.length; ++idx) {
        const date2 = new Date(year, month, 1 + daysAdded);
        ++daysAdded;
        if (date2.getMonth() > month) {
            break;
        }
        monthDays[idx] = date2.getDate().toString().padStart(2, "\xA0");
    }
    const captionDiv = this.createElement("div");
    captionDiv.className = "calendar-caption";
    captionDiv.textContent = date.toDateString();
    const calendarTable = this.createElement("table");
    calendarTable.append(...weekDays.map(weekDay => {
        const th = this.createElement("th");
        th.textContent = weekDay;
        return th;
    }));
    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
        const tr = this.createElement("tr");
        for (let colIdx = 0; colIdx < 7; colIdx++) {
            const idx = rowIdx * 7 + colIdx;
            const td = this.createElement("td");
            td.textContent = monthDays[idx];
            tr.append(td);
        }
        calendarTable.append(tr);
    }
    // for (const monthDaysRow of monthDays) {
    //     const tr = this.createElement("tr");
    //     const tds = monthDaysRow.map(day => {
    //         const td = this.createElement("td");
    //         td.textContent = day.toString().padStart(2, "0");
    //         return td;
    //     });
    //     tr.append(...tds);
    //     calendarTable.append(tr);
    // }
    return [captionDiv, calendarTable];
}
export {};
