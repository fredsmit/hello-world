//const cats: (string | null)[] = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion', null];
const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion', null, undefined, ""];
//const cats2 = cats.filter((cat: string | null): cat is string => cat !== null);
const cats2 = cats.filter((cat) => 
//cat !== null && cat !== void 0 && cat.length > 0
cat !== null && cat !== void 0 && cat.length === 4);
console.log(cats2);
// A type predicate's type must be assignable to its parameter's type.
// Type 'number' is not assignable to type 'string'.
// const cats3 = cats.filter((cat): cat is number =>
//     //cat !== null && cat !== void 0 && cat.length > 0
//     cat !== null && cat !== void 0 && cat.length === 4
// );
const cats3 = cats.filter((cat) => cat === "Lion");
console.log(cats3);
class Base {
}
class Derived extends Base {
    constructor() {
        // error!
        // have to call 'super()' first because it needs to initialize 'someProperty'.
        doSomeStuff();
        super();
        this.someProperty = true;
    }
}
function doSomeStuff() {
    console.log("KUKU");
}
const derived = new Derived();
console.log("derived:", derived);
function processAction(action) {
    if (action.kind === "NumberContents") {
        // `action.payload` is a number here.
        let num = action.payload * 2;
        // ...
    }
    else if (action.kind === "StringContents") {
        // `action.payload` is a string here.
        const str = action.payload.trim();
        // ...
    }
}
function processAction2(action) {
    const { kind, payload } = action;
    if (kind === "NumberContents") {
        let num = payload * 2;
        // ...
    }
    else if (kind === "StringContents") {
        const str = payload.trim();
        // ...
    }
}
function processRecord(record) {
    record.f(record.v);
}
// This call used to have issues - now works!
processRecord({
    kind: "string",
    v: "hello!",
    // 'val' used to implicitly have the type 'string | number | boolean',
    // but now is correctly inferred to just 'string'.
    f: val => {
        console.log(val.toUpperCase());
    }
});
processRecord({
    kind: "number",
    v: 123,
    // 'val' used to implicitly have the type 'string | number | boolean',
    // but now is correctly inferred to just 'string'.
    f: val => {
        console.log(val * 2);
    }
});
export {};
