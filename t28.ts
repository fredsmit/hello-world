
addTooltipHandler(document.body);

function addTooltipHandler(htmlElement: HTMLElement): void {
    const tooltipHandler = getTooltipHandler(htmlElement);
    document.addEventListener("mouseover", tooltipHandler);
    document.addEventListener("mouseout", tooltipHandler);
}

function getTooltipHandler(htmlElement: HTMLElement): EventListenerObject {

    const buttons = Array.from(htmlElement.querySelectorAll("button[data-tooltip]")) as HTMLElement[];

    function positionTooltip(target: HTMLElement, tooltip: HTMLDivElement) {
        const targetRect: DOMRectReadOnly = target.getBoundingClientRect();

        htmlElement.append(tooltip);

        const tooltipRect: DOMRectReadOnly = tooltip.getBoundingClientRect();

        if (tooltipRect.height + 5 > targetRect.top) {
            tooltip.style.top = Math.round(targetRect.bottom + 5) + "px";
        } else {
            tooltip.style.top = Math.round(targetRect.top - tooltipRect.height - 5) + "px";
        }

        const diffX = targetRect.left + Math.max(tooltipRect.width, targetRect.width) - window.innerWidth;

        if (diffX > 0) {
            tooltip.style.left = Math.round(targetRect.left + 5 - diffX) + "px";
        } else {
            tooltip.style.left = Math.max(Math.round(targetRect.left + 5), 1) + "px";
        }
    }


    let currentTooltip: HTMLElement | null | undefined;

    function handleEventMouseOver(ev: MouseEvent, target: HTMLElement) {
        if (buttons.includes(target)) {
            const tooltipHtml = (target.dataset["tooltip"] ?? "").trim();
            if (tooltipHtml) {
                const tooltip = document.createElement('div');
                currentTooltip = tooltip;
                tooltip.className = "tooltip";
                tooltip.innerHTML = tooltipHtml;
                positionTooltip(target, tooltip);
            }
        }
    }

    function handleEventMouseOut(ev: MouseEvent, target: HTMLElement) {
        if (currentTooltip) {
            currentTooltip.remove();
            currentTooltip = null;
        }
    }

    return {
        handleEvent(ev: MouseEvent): void {
            if (ev.target instanceof HTMLElement) {
                if (ev.type === "mouseover")
                    handleEventMouseOver(ev, ev.target);
                else if (ev.type === "mouseout")
                    handleEventMouseOut(ev, ev.target);
            }
        }
    };
}

export { };

