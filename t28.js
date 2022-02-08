addTooltipHandler(document.body);
function addTooltipHandler(htmlElement) {
    const tooltipHandler = getTooltipHandler(htmlElement);
    document.addEventListener("mouseover", tooltipHandler);
    document.addEventListener("mouseout", tooltipHandler);
}
function getTooltipHandler(htmlElement) {
    //const buttons = Array.from(htmlElement.querySelectorAll("button[data-tooltip]")) as HTMLElement[];
    const buttons = Array.from(htmlElement.querySelectorAll("*[data-tooltip]"));
    function positionTooltip(target, tooltip) {
        const targetRect = target.getBoundingClientRect();
        htmlElement.append(tooltip);
        const tooltipRect = tooltip.getBoundingClientRect();
        if (tooltipRect.height + 5 > targetRect.top) {
            tooltip.style.top = Math.round(targetRect.bottom + 5) + "px";
        }
        else {
            tooltip.style.top = Math.round(targetRect.top - tooltipRect.height - 5) + "px";
        }
        const diffX = targetRect.left + Math.max(tooltipRect.width, targetRect.width) - window.innerWidth;
        if (diffX > 0) {
            tooltip.style.left = Math.round(targetRect.left + 5 - diffX) + "px";
        }
        else {
            tooltip.style.left = Math.max(Math.round(targetRect.left + 5), 1) + "px";
        }
    }
    let currentTooltip;
    function handleEventMouseOver(ev, target) {
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
    function handleEventMouseOut(ev, target) {
        if (currentTooltip) {
            currentTooltip.remove();
            currentTooltip = null;
        }
    }
    return {
        handleEvent(ev) {
            if (ev.target instanceof HTMLElement) {
                if (ev.type === "mouseover")
                    handleEventMouseOver(ev, ev.target);
                else if (ev.type === "mouseout")
                    handleEventMouseOut(ev, ev.target);
            }
        }
    };
}
export { addTooltipHandler };
