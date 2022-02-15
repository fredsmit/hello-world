function concat(...arrays) {
    const sumLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
    const sum = arrays.reduce((sum, arr) => {
        sum[0].set(arr, sum[1]);
        sum[1] += arr.length;
        return sum;
    }, [new Uint16Array(sumLength), 0]);
    return sum[0];
}
const chunks = [
    new Uint16Array([0, 1, 2]),
    new Uint16Array([3, 4, 5]),
    new Uint16Array([6, 7, 8, 9])
];
const res = concat(...chunks);
console.log("res:", Array.from(res)); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
console.log("ctor:", res.constructor.name); // Uint16Array
console.log("res:", res); // res: Uint16Array(10) [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
export {};
