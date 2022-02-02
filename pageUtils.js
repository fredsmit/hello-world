function getOptionalHTMLElements(...ids) {
    const optionalElements = {};
    for (const id of ids) {
        Object.assign(optionalElements, { [id]: document.getElementById(id) });
    }
    return optionalElements;
}
function getRequiredHTMLElements(...ids) {
    const requiredElements = {};
    const missingIds = [];
    for (const id of ids) {
        const requiredElement = document.getElementById(id);
        if (requiredElement === null)
            missingIds.push(id);
        else
            Object.assign(requiredElements, { [id]: requiredElement });
    }
    if (missingIds.length > 0)
        throw Error(`Missing required page elements: ${missingIds.map(id => "'" + id + "'").join(", ")}.`);
    return requiredElements;
}
export { getOptionalHTMLElements, getRequiredHTMLElements };
