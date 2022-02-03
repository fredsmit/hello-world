type PositionAt = "default" | 1 | 2 | 3 | 4
    | "top-left" | "top-right" | "bottom-left" | "bottom-right"
    | "left-top" | "right-top" | "left-bottom" | "right-bottom";

function round(rect: DOMRectReadOnly): DOMRectReadOnly {
    return new DOMRectReadOnly(
        Math.round(rect.x),
        Math.round(rect.y),
        Math.round(rect.width),
        Math.round(rect.height)
    );
}

function positionAt(anchor: HTMLElement, note: HTMLElement, position?: PositionAt | null | undefined) {

    const copyOfNote = note.cloneNode(true) as HTMLElement;
    copyOfNote.style.position = "absolute";

    // console.log(anchor.getBoundingClientRect());
    // console.log(round(anchor.getBoundingClientRect()));

    const scrollTop = Math.round(document.documentElement.scrollTop);
    const scrollLeft = Math.round(document.documentElement.scrollLeft);
    // console.log("scrollTop:", scrollTop, "scrollLeft:", scrollLeft);

    const {
        top: anchorTop,
        right: anchorRight,
        bottom: anchorBottom,
        left: anchorLeft
    } = round(anchor.getBoundingClientRect());

    const noteStyle: { top: string; left: string } = copyOfNote.style;


    switch (position ?? 1) {
        default:
        case 1:
        case "top-left":
        case "left-top":
            noteStyle.top = scrollTop + anchorTop + 2 + "px";
            noteStyle.left = scrollLeft + anchorLeft + 2 + "px";
            break;
        case 2:
        case "top-right":
        case "right-top":
            noteStyle.top = scrollTop + anchorTop + 2 + "px";
            noteStyle.left = scrollLeft + anchorRight + 2 + "px";
            break;
        case 3:
        case "bottom-left":
        case "left-bottom":
            noteStyle.top = scrollTop + anchorBottom + 2 + "px";
            noteStyle.left = scrollLeft + anchorLeft + 2 + "px";
            break;
        case 4:
        case "bottom-right":
        case "right-bottom":
            noteStyle.top = scrollTop + anchorBottom + 2 + "px";
            noteStyle.left = scrollLeft + anchorRight + 2 + "px";
            break;
    }

    if ((copyOfNote.textContent ?? "").trim().length === 0) {
        copyOfNote.textContent = "note\xA0@\xA0" + String(position);
    }

    document.body.append(copyOfNote);
}

function showNote(anchor: HTMLElement, html: string, position?: PositionAt) {
    const note = document.createElement('div');
    note.className = "note";
    note.innerHTML = html;
    positionAt(anchor, note, position);
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

    while (true) {
        showNote(blockquote, "note @ top/left", "top-left");
        showNote(blockquote, "note @ top/right", "top-right");
        showNote(blockquote, "note @ bottom/left", "bottom-left");
        showNote(blockquote, "note @ bottom/right", "bottom-right");
        await removeNotes(5000);

        showNote(blockquote, "", "top-left");
        showNote(blockquote, "", "top-right");
        showNote(blockquote, "", "bottom-left");
        showNote(blockquote, "", "bottom-right");
        await removeNotes(5000);

        showNote(blockquote, "", 1);
        showNote(blockquote, "", 2);
        showNote(blockquote, "", 3);
        showNote(blockquote, "", 4);
        await removeNotes(5000);

        showNote(blockquote, "");
        await removeNotes(5000);

        showNote(blockquote, "", null as unknown as PositionAt);
        await removeNotes(5000);

        showNote(blockquote, "", "kuku" as PositionAt);
        await removeNotes(5000);
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
