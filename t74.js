//const cats: (string | null)[] = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion', null];
const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion', null, undefined, ""];
const cats2 = cats.filter((cat) => cat !== null && cat !== void 0 && cat.length === 4);
console.log('cats:', cats.join('; '));
console.log('cats2:', cats2.join('; '));
// A type predicate's type must be assignable to its parameter's type.
// Type 'number' is not assignable to type 'string'.
// const cats3 = cats.filter((cat): cat is number =>
//     //cat !== null && cat !== void 0 && cat.length > 0
//     cat !== null && cat !== void 0 && cat.length === 4
// );
const cats3 = cats.filter((cat) => cat === "Lion");
console.log('cats3:', cats3.join('; '));
class Base {
}
class Derived extends Base {
    someProperty = true;
    constructor() {
        // error!
        // have to call 'super()' first because it needs to initialize 'someProperty'.
        doSomeStuff();
        super();
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
        const num = action.payload * 2;
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
        const num = payload * 2;
        // ...
    }
    else if (kind === "StringContents") {
        const str = payload.trim();
        // ...
    }
}
function processAction3(action) {
    const { kind: actionKind, payload: cargo } = action;
    if (actionKind === "NumberContents") {
        const num = cargo * 2;
        // ...
    }
    else if (actionKind === "StringContents") {
        const str = cargo.trim();
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
        console.log("val.toUpperCase() ==>", val.toUpperCase());
    }
});
processRecord({
    kind: "number",
    v: 123,
    // 'val' used to implicitly have the type 'string | number | boolean',
    // but now is correctly inferred to just 'string'.
    f: val => {
        console.log("val * 2 ==>", val * 2);
    }
});
export {};
