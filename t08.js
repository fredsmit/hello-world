import { getCommonColors } from "./commonColors.js";
let commonColors = getCommonColors();
document.documentElement.addEventListener("dblclick", dblclickListener);
async function dblclickListener(ev) {
    console.log("Wait:", Date.now());
    const list = document.getElementById("list1");
    if (list) {
        const li = document.createElement('li');
        let num = 0;
        let promise = Promise.resolve();
        while (true) {
            await promise;
            const text = prompt("Enter color code or color name:", "#" + commonColors[Math.floor(Math.random() * 16)].toString(16).padStart(6, "0"));
            if (!text)
                break;
            promise = new Promise(resolve => {
                const node = li.cloneNode();
                node.style.backgroundColor = text;
                node.textContent = ++num + ": " + text;
                list.prepend(node);
                //list.append(node);
                setTimeout(() => resolve(void 0));
            });
        }
    }
}
let data = {
    "Fish": {
        "trout": {},
        "salmon": {}
    },
    "Tree": {
        "Huge": {
            "sequoia": {},
            "oak": {}
        },
        "Flowering": {
            "apple tree": {
                "Mac": {}
            },
            "magnolia": {}
        },
        "Small": {
            "small oak": {}
        },
        "Tiny": {},
    }
};
const container = document.createElement("pre");
document.body.append(container);
container.textContent = JSON.stringify(data, null, 4);
const container2 = document.createElement("ul");
document.body.append(container2);
createTree(["*** BIG TREE ***", data], container2);
function createTree(entry, container) {
    const key = (entry[0] ?? "").trim();
    const entries = Object.entries(entry[1]);
    if (key) {
        container.before(key);
        if (entries.length > 1) {
            container.before(`\xA0(*${entries.length})`);
        }
    }
    if (entries.length > 0) {
        for (const entry of entries) {
            const li = document.createElement("li");
            if (Object.keys(entry[1]).length > 0) {
                const ul = document.createElement("ul");
                li.append(ul);
                createTree(entry, ul);
            }
            else {
                li.textContent = entry[0];
            }
            container.append(li);
        }
    }
}
