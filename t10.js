import { getCommonColorNames } from "./commonColors.js";
const commonForeColors = getCommonColorNames();
const commonBackColors = Array.from(commonForeColors).reverse();
const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
document["clockStart"] = clockStart;
document["clockStop"] = clockStop;
document["sortPeople"] = sortPeople;
let timerId;
function clockStart(_this) {
    if (timerId)
        return;
    if (_this instanceof HTMLInputElement) {
        console.log("clockStart:", _this.value);
    }
    tick();
    timerId = setInterval(tick, 1000);
    function tick() {
        // 2022-02-01T12:00:56.855Z
        // 012345678901234567890123
        //           1         2
        divClock.textContent = new Date().toISOString().substring(11, 19);
        const rndIdx = Math.floor(Date.now() % 16);
        divClock.style.backgroundColor = commonBackColors[rndIdx];
        divClock.style.color = commonForeColors[rndIdx];
    }
}
function clockStop(_this) {
    if (_this instanceof HTMLInputElement) {
        console.log("clockStop:", _this.value);
    }
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = void 0;
}
const divClock = document.createElement("div");
divClock.style.fontWeight = "bold";
document.body.append(divClock);
const liOne = document.getElementById("one");
if (liOne) {
    liOne.insertAdjacentHTML("afterend", "<li>2</li><li>3</li>");
}
function sortPeople(sortBy = "age") {
    const sortableTable = document.getElementById("sortableTable");
    if (liOne && sortableTable instanceof HTMLTableElement) {
        const tBody = sortableTable.tBodies.item(0);
        if (tBody) {
            const values = [];
            const rowsCells = Array.from(tBody.rows)
                .map(row => Array.from(row.cells))
                .filter(tds => tds.length === 3);
            const people = rowsCells.map(rowCells => {
                const name = rowCells[0].textContent ?? "";
                const surname = rowCells[1].textContent ?? "";
                const age = rowCells[2].textContent ?? "";
                return { name, surname, age };
            });
            const byName = (a, b) => a.name > b.name ? 1 : -1;
            const bySurname = (a, b) => a.surname > b.surname ? 1 : -1;
            const byAge = (a, b) => +a.age - +b.age;
            switch (sortBy) {
                case "name":
                    people.sort(byName);
                    break;
                case "surname":
                    people.sort(bySurname);
                    break;
                case "age":
                default:
                    people.sort(byAge);
                    break;
            }
            rowsCells.forEach((rowCells, rowIndex) => {
                rowCells[0].textContent = people[rowIndex].name;
                rowCells[1].textContent = people[rowIndex].surname;
                rowCells[2].textContent = people[rowIndex].age;
            });
        }
    }
}
