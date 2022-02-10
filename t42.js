import { queryElements } from "./pageUtils.js";
const images = queryElements(document.body, "img", "data-src");
/**
 * Tests if the element is visible (within the visible part of the page)
 * It's enough that the top or bottom edge of the element are visible
 */
function isVisible(img) {
    const windowHightExtension = window.innerHeight;
    return img.offsetTop + img.offsetHeight > window.scrollY - windowHightExtension && // bottom visible
        img.offsetTop < window.scrollY + window.innerHeight + windowHightExtension; // top visible
}
function showVisible() {
    for (const img of images) {
        const realSrc = img.dataset.src;
        if (!realSrc)
            continue;
        if (isVisible(img)) {
            // disable caching, this should be removed in production code
            img.src = realSrc + '?nocache=' + Math.random();
            console.log("Load:", realSrc);
            img.dataset.src = '';
        }
    }
}
window.addEventListener('scroll', showVisible);
showVisible();
