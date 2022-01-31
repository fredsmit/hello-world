import { getCommonColors } from "./commonColors.js";
let commonColors = getCommonColors();
console.log("commonColors:", commonColors);
// @ts-ignore
commonColors[1] = 1;
console.log("commonColors2:", commonColors);
commonColors = getCommonColors();
console.log("commonColors3:", commonColors);
