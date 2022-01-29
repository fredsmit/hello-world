const nodes = document.querySelectorAll('li');
for (const li of document.querySelectorAll('li')) {
    // get the title from the text node
    const wholeText = Array.from(li.childNodes.values())
        .filter(childNode => childNode instanceof Text)
        .map(textNode => (textNode.data ?? "").trim())
        .filter(data => data.length > 0)
        .reduce((sum, data) => sum + "[" + data + "]", "");
    const count = li.getElementsByTagName('li').length;
    if (count) {
        console.log("wholeText:", wholeText, ":", count);
    }
    else {
        console.log("wholeText:", wholeText);
    }
}
export {};
