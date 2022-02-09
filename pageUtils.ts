
function getOptionalHTMLElements<ID extends string>(...ids: ID[]): Readonly<Record<ID, HTMLElement | null>> {
    const optionalElements = {} as Record<ID, HTMLElement | null>;
    for (const id of ids) {
        Object.assign(optionalElements, { [id]: document.getElementById(id) });
    }
    return optionalElements;
}

function getRequiredHTMLElements<ID extends string>(...ids: ID[]): Readonly<Record<ID, HTMLElement>> {
    const requiredElements = {} as Record<ID, HTMLElement>;
    const missingIds = [] as string[];
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

function findClosestTarget(eventTarget: unknown, htmlElementSelector: string): HTMLElement | null {
    if (eventTarget instanceof Element) {
        const closestTarget = eventTarget.closest<Element>(htmlElementSelector);
        if (closestTarget instanceof HTMLElement) {
            return closestTarget;
        }
    }
    return null;
}

export {
    getOptionalHTMLElements,
    getRequiredHTMLElements,
    findClosestTarget
};
