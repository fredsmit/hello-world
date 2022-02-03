type PositionAt = "default" | 1 | 2 | 3 | 4
    | "top-left" | "top-right" | "bottom-left" | "bottom-right"
    | "left-top" | "right-top" | "left-bottom" | "right-bottom";

// function round(rect: DOMRectReadOnly): DOMRectReadOnly {
//     return new DOMRectReadOnly(
//         Math.round(rect.x),
//         Math.round(rect.y),
//         Math.round(rect.width),
//         Math.round(rect.height)
//     );
// }

function positionAt(
    anchor: HTMLElement, note: HTMLElement,
    position?: PositionAt | null | undefined, outside?: boolean | null | undefined
) {

    function getAnchorCoords(elem: HTMLElement): DOMRectReadOnly {
        const rect = elem.getBoundingClientRect();
        // document.documentElement.scrollLeft/scrollTop
        // ===
        // window.pageXOffset/pageYOffset
        return new DOMRectReadOnly(
            Math.round(rect.x + window.pageXOffset),
            Math.round(rect.y + window.pageYOffset),
            Math.round(rect.width),
            Math.round(rect.height)
        );
    }

    const copyOfNote = note.cloneNode(true) as HTMLElement;
    copyOfNote.style.position = "absolute";

    // console.log(anchor.getBoundingClientRect());
    // console.log(round(anchor.getBoundingClientRect()));

    // const scrollTop = Math.round(document.documentElement.scrollTop);
    // const scrollLeft = Math.round(document.documentElement.scrollLeft);
    // console.log("scrollTop:", scrollTop, "scrollLeft:", scrollLeft);

    // const {
    //     top: anchorTop,
    //     right: anchorRight,
    //     bottom: anchorBottom,
    //     left: anchorLeft
    // } = round(anchor.getBoundingClientRect());

    const {
        top: anchorTop,
        right: anchorRight,
        bottom: anchorBottom,
        left: anchorLeft
    } = getAnchorCoords(anchor);

    const noteStyle: { top: string; left: string } = copyOfNote.style;

    switch (position ?? 1) {
        default:
        case 1:
        case "top-left":
        case "left-top":
            // noteStyle.top = scrollTop + anchorTop + 2 + "px";
            // noteStyle.left = scrollLeft + anchorLeft + 2 + "px";
            copyOfNote.dataset["pos"] = String(1);
            noteStyle.top = anchorTop + 2 + "px";
            noteStyle.left = anchorLeft + 2 + "px";
            break;
        case 2:
        case "top-right":
        case "right-top":
            // noteStyle.top = scrollTop + anchorTop + 2 + "px";
            // noteStyle.left = scrollLeft + anchorRight + 2 + "px";
            copyOfNote.dataset["pos"] = String(2);
            noteStyle.top = anchorTop + 2 + "px";
            noteStyle.left = anchorRight + 2 + "px";
            break;
        case 3:
        case "bottom-right":
        case "right-bottom":
            // noteStyle.top = scrollTop + anchorBottom + 2 + "px";
            // noteStyle.left = scrollLeft + anchorRight + 2 + "px";
            copyOfNote.dataset["pos"] = String(3);
            noteStyle.top = anchorBottom + 2 + "px";
            noteStyle.left = anchorRight + 2 + "px";
            break;
        case 4:
        case "bottom-left":
        case "left-bottom":
            // noteStyle.top = scrollTop + anchorBottom + 2 + "px";
            // noteStyle.left = scrollLeft + anchorLeft + 2 + "px";
            copyOfNote.dataset["pos"] = String(4);
            noteStyle.top = anchorBottom + 2 + "px";
            noteStyle.left = anchorLeft + 2 + "px";
            break;
    }

    if ((copyOfNote.textContent ?? "").trim().length === 0) {
        copyOfNote.textContent = "note\xA0@\xA0" + String(position);
    }

    if (outside) {
        document.body.append(copyOfNote);
    } else {
        anchor.append(copyOfNote);
        const noteRect = getAnchorCoords(copyOfNote);
        const pos = copyOfNote.dataset["pos"];
        switch (pos) {
            case "1":
                // OK
                break;
            case "2":
                noteStyle.left = (noteRect.left - noteRect.width - 4) + "px";
                break;
            case "3":
                noteStyle.top = (noteRect.top - noteRect.height - 4) + "px";
                noteStyle.left = (noteRect.left - noteRect.width - 4) + "px";
                break;
            case "4":
                noteStyle.top = (noteRect.top - noteRect.height - 4) + "px";
                break;
        }

    }
}

function showNote(
    anchor: HTMLElement, html: string,
    position?: PositionAt, outside?: boolean | null | undefined
) {
    const note = document.createElement('div');
    note.className = "note";
    note.innerHTML = html;
    positionAt(anchor, note, position, outside);
}

const blockquote: HTMLQuoteElement | null = document.querySelector('blockquote');
if (blockquote) {

    document.body.addEventListener("click", (ev: MouseEvent) => {
        if (ev.target instanceof HTMLDivElement) {
            const div = ev.target;
            if (div.classList.contains("note")) {
                div.style.backgroundColor = "beige";
                div.style.borderColor = "darkgreen";
                ev.stopPropagation();
            }
        }
    })

    function getShowNote(outside: boolean) {
        return (
            anchor: HTMLElement, html: string,
            position?: PositionAt | undefined
        ) => showNote(anchor, html, position, outside);
    }

    let outside = false;
    const timeout = 2000;
    while (true) {
        const showNote = getShowNote(outside);
        outside = !outside;

        showNote(blockquote, "note @ top/left", "top-left");
        showNote(blockquote, "note @ top/right", "top-right");
        showNote(blockquote, "note @ bottom/left", "bottom-left");
        showNote(blockquote, "note @ bottom/right", "bottom-right");
        await removeNotes(timeout);

        showNote(blockquote, "", "top-left");
        showNote(blockquote, "", "top-right");
        showNote(blockquote, "", "bottom-left");
        showNote(blockquote, "", "bottom-right");
        await removeNotes(timeout);

        showNote(blockquote, "", 1);
        showNote(blockquote, "", 2);
        showNote(blockquote, "", 3);
        showNote(blockquote, "", 4);
        await removeNotes(timeout);

        showNote(blockquote, "");
        await removeNotes(timeout);

        showNote(blockquote, "", null as unknown as PositionAt);
        await removeNotes(timeout);

        showNote(blockquote, "", "kuku" as PositionAt);
        await removeNotes(timeout);
    }
}

function removeNotes(timeout: number = 1000): Promise<void> {

    return new Promise(resolve => {
        setTimeout(() => {
            const notes = document.querySelectorAll(".note");
            for (const note of notes) {
                note.remove();
            }
            resolve();
        }, timeout);
    });
}

export { };
