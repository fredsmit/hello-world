function addTooltipHandler(htmlElement) {
    //const buttons = Array.from(htmlElement.querySelectorAll("button[data-tooltip]")) as HTMLElement[];
    //const buttons = Array.from(htmlElement.querySelectorAll("button,div,p,a[data-tooltip]")) as HTMLElement[];
    const buttons = Array.from(htmlElement.querySelectorAll("*[data-tooltip]"));
    //console.log(buttons);
    let currentTooltip;
    buttons.forEach(button => {
        const tooltipHandler = getTooltipHandler(button);
        button.addEventListener("mouseenter", tooltipHandler);
        button.addEventListener("mouseleave", tooltipHandler);
    });
    function getTooltipHandler(htmlElement) {
        function positionTooltip(target, tooltip) {
            setTimeout((tooltip) => {
                if (currentTooltip && currentTooltip === tooltip) {
                    position();
                }
            }, 500, tooltip);
            function position() {
                const targetRect = target.getBoundingClientRect();
                //console.log("targetRect", targetRect);
                htmlElement.append(tooltip);
                const tooltipRect = tooltip.getBoundingClientRect();
                //console.log("tooltipRect:", tooltipRect);
                if (tooltipRect.height + 5 > targetRect.top) {
                    tooltip.style.top = Math.round(targetRect.bottom + 5) + "px";
                }
                else {
                    tooltip.style.top = Math.round(targetRect.top - tooltipRect.height - 5) + "px";
                }
                const diffX = targetRect.left + Math.max(tooltipRect.width, targetRect.width) - window.innerWidth;
                //console.log("diffX:", diffX, window.innerWidth, window.innerHeight);
                if (diffX > 0) {
                    tooltip.style.left = Math.round(targetRect.left + 5 - diffX) + "px";
                }
                else {
                    tooltip.style.left = Math.max(Math.round(targetRect.left + 5), 1) + "px";
                }
            }
            //console.log("tooltipRect2:", tooltip.getBoundingClientRect());
            // window.pageXOffset
            // window.pageYOffset
            // console.log("window.scrollX:", window.scrollX);
            // console.log("window.scrollY:", window.scrollY);
            // console.log("window.outerWidth:", window.outerWidth);
            // console.log("document.body.offsetLeft:", document.body.offsetLeft);
            // console.log("document.body.offsetWidth:", document.body.offsetWidth);
            // console.log("document.body.clientLeft:", document.body.clientLeft);
            // console.log("document.body.clientWidth:", document.body.clientWidth);
        }
        function handleEventMouseEnter(ev, target) {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }
            if (target === htmlElement) {
                //console.log("enter:", htmlElement);
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
        function handleEventMouseLeave(ev, target) {
            if (target === htmlElement) {
                //console.log("leave:", htmlElement);
                if (currentTooltip) {
                    currentTooltip.remove();
                    currentTooltip = null;
                }
            }
        }
        return {
            handleEvent(ev) {
                if (ev.target instanceof HTMLElement) {
                    if (ev.type === "mouseenter")
                        handleEventMouseEnter(ev, ev.target);
                    else if (ev.type === "mouseleave")
                        handleEventMouseLeave(ev, ev.target);
                }
            }
        };
    }
}
export { addTooltipHandler };
