//const cats: (string | null)[] = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion', null];
const cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion', null, undefined, ""];
//const cats2 = cats.filter((cat: string | null): cat is string => cat !== null);
const cats2 = cats.filter((cat): cat is string =>
    //cat !== null && cat !== void 0 && cat.length > 0
    cat !== null && cat !== void 0 && cat.length === 4
);

console.log(cats2);

// A type predicate's type must be assignable to its parameter's type.
// Type 'number' is not assignable to type 'string'.
// const cats3 = cats.filter((cat): cat is number =>
//     //cat !== null && cat !== void 0 && cat.length > 0
//     cat !== null && cat !== void 0 && cat.length === 4
// );

const cats3 = cats.filter((cat): cat is "???" =>
    cat === "Lion"
);

console.log(cats3);

class Base {
    // ...
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

type Action =
    | { kind: "NumberContents", payload: number }
    | { kind: "StringContents", payload: string };

function processAction(action: Action): void {
    if (action.kind === "NumberContents") {
        // `action.payload` is a number here.
        let num = action.payload * 2
        // ...
    }
    else if (action.kind === "StringContents") {
        // `action.payload` is a string here.
        const str = action.payload.trim();
        // ...
    }
}

function processAction2(action: Action): void {
    const { kind, payload } = action;
    if (kind === "NumberContents") {
        let num = payload * 2
        // ...
    }
    else if (kind === "StringContents") {
        const str = payload.trim();
        // ...
    }
}

interface Foo<T> {
    prop: T;
}

declare let x: Foo<Foo<Foo<Foo<Foo<Foo<string>>>>>>;
declare let y: Foo<Foo<Foo<Foo<Foo<string>>>>>;

//x = y;

interface TypeMap {
    "number": number;
    "string": string;
    "boolean": boolean;
}

type UnionRecord<P extends keyof TypeMap> = { [K in P]:
    {
        kind: K;
        v: TypeMap[K];
        f: (p: TypeMap[K]) => void;
    }
}[P];

function processRecord<K extends keyof TypeMap>(record: UnionRecord<K>) {
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
})

processRecord({
    kind: "number",
    v: 123,

    // 'val' used to implicitly have the type 'string | number | boolean',
    // but now is correctly inferred to just 'string'.
    f: val => {
        console.log(val * 2);
    }
})

export { };

