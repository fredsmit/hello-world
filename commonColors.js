const commonColorsDefinition = {
    0: [0x000000, "black"],
    1: [0xFFFFFF, "white"],
    2: [0xC0C0C0, "silver"],
    3: [0x808080, "grey"],
    4: [0x800000, "maroon"],
    5: [0xFF0000, "red"],
    6: [0x800080, "purple"],
    7: [0xFF00FF, "fuchsia"],
    8: [0x008000, "green"],
    9: [0x00FF00, "lime"],
    10: [0x808000, "olive"],
    11: [0xFFFF00, "yellow"],
    12: [0x000080, "navy"],
    13: [0x0000FF, "blue"],
    14: [0x008080, "teal"],
    15: [0x00FFFF, "aqua"]
};
const commonColors = Uint32Array.from(Object.values(commonColorsDefinition), entry => entry[0]);
const commonColorNames = Array.from(Object.values(commonColorsDefinition), entry => entry[1]);
function getCommonColors() {
    return commonColors.slice();
}
function getCommonColorNames() {
    return commonColorNames.slice();
}
export { getCommonColors, getCommonColorNames };
