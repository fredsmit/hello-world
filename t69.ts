let str = "We will, we will rock you";

let result = str.match(/we/i) ?? []; // without flag g
//if (result && result.length > 0) {
console.log(result[0]);     // We (1st match)
console.log(result.length); // 1

// Details:
console.log(result.index);  // 0 (position of the match)
console.log(result.input);  // We will, we will rock you (source string)
console.log(result);
//}

console.log("I love HTML".replace(/HTML/, "$& and JavaScript"));
console.log(/ku/i.test("KUKU"));

let str2 = "+7(903)-123-45-67";

let regexp = /\d/g;

const result2: RegExpMatchArray | null = str2.match(regexp);
console.log(result2);
console.log(result2?.join());

const s3 = "\n\n\nABC";
const result3: RegExpMatchArray | null = s3.match(/^\s+A/mg);
console.log("r3:", result3?.[0], result3?.[0].length, result3);

let r = "123 456".match(/\d+? \d+?/g);
//const r = "123 456".match(/\d+? \d+?/);
console.log(r, r?.length, r?.index, r?.input); // 123 4


const re3 = /<!-- (.*? |)-->/sg;

let str3 = `... <!-- My -- comment
 test --> ..  <!-- --> ..
`;

r = str3.match(re3);
console.log(r, r?.length, r?.index, r?.input);

console.log("---");

let rall = str3.matchAll(re3);
for (const r of rall) {
    console.log(r, r.length);

}

console.log("---");

let dateRegexp1 = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})(?<nothing>)()/g;
let strDate1 = "aa 2019-04-30 2020-03-31 xx";

r = strDate1.match(dateRegexp1);
console.log(r, "\nlength:", r?.length, "\nindex:", r?.index, "\ngroups:", r?.groups, "\ninput:", r?.input);

console.log("---");
rall = strDate1.matchAll(dateRegexp1);
//console.log(rall);
for (const r of rall) {
    console.log(r, r.length);
}

//let regexp2 = /([0-9a-fA-F]{2}:){5}([0-9a-fA-F]{2}){1}/;
let regexp2 = /(\p{Hex_Digit}{2}:){5}\p{Hex_Digit}{2}/u;

console.log(regexp2.test('01:32:54:67:89:AB')); // true
console.log(regexp2.test('0132546789AB')); // false (no colons)
console.log(regexp2.test('01:32:54:67:89')); // false (5 numbers, must be 6)
console.log(regexp2.test('01:32:54:67:89:ZZ')) // false (ZZ at the end)

console.log("--------------");

//regexp = /#\p{Hex_Digit}{3}(?:\p{Hex_Digit}{3})?\b/ug;
regexp = /#\p{Hex_Digit}{3}(\p{Hex_Digit}{3})?\b/ug;

str = "color: #3f3; background-color: #AA00ef; and: #abcd";

r = str.match(regexp); // #3f3 #AA00ef
console.log(r, "\nlength:", r?.length, "\nindex:", r?.index, "\ngroups:", r?.groups, "\ninput:", r?.input);

rall = str.matchAll(regexp); // #3f3 #AA00ef
for (const r of rall) {
    console.log(r, r.length);
}

const arithmeticExpressions = [
    "    1 + 2",
    "   1.2 * 3.4",
    "  -3 / -6",
    " -2 - 2"
];

//console.log(1. + 2);

type ArithmeticExpression = { left: number, right: number, op: "+" | "-" | "*" | "/" | "," };

function parseArithmeticExpression(expressionLiteral: string): [ArithmeticExpression | null, string | undefined] {
    //console.log(expressionLiteral);

    const re = /^(?<left>(-?\d+(\.\d*)?))\s+(?<op>[-+/*])\s+(?<right>(-?\d+(\.\d*)?))$/;
    const r = expressionLiteral.match(re);
    //console.log(r, "\nlength:", r?.length, "\nindex:", r?.index, "\ngroups:", r?.groups, "\ninput:", r?.input);
    if (r === null || !r.groups) {
        return [null, expressionLiteral];
    } else {
        return [{
            left: parseFloat(r.groups["left"] ?? ""),
            right: parseFloat(r.groups["right"] ?? ""),
            op: (r.groups["op"] ?? ",") as ArithmeticExpression["op"],
        }, r.input];
    }
}

function calc(arithmeticExpression: ArithmeticExpression): number {
    const op: ArithmeticExpression["op"] = arithmeticExpression.op;
    let result: number;
    switch (op) {
        case "+":
            result = arithmeticExpression.left + arithmeticExpression.right;
            break;
        case "-":
            result = arithmeticExpression.left - arithmeticExpression.right;
            break;
        case "*":
            result = arithmeticExpression.left * arithmeticExpression.right;
            break;
        case "/":
            result = arithmeticExpression.left / arithmeticExpression.right;
            break;
        case ",":
            result = arithmeticExpression.right;
            break;
    }
    return result;
}

arithmeticExpressions.forEach(arithmeticExpression => {
    const norm_arithmeticExpression = (arithmeticExpression ?? "").trim();
    const [arithmeticExpressionParsed, input] = parseArithmeticExpression(norm_arithmeticExpression);
    if (arithmeticExpressionParsed) {
        console.log(input, "=", calc(arithmeticExpressionParsed));
        console.log(
            arithmeticExpressionParsed.left,
            arithmeticExpressionParsed.op,
            arithmeticExpressionParsed.right, "=", calc(arithmeticExpressionParsed));
    } else {
        console.log("Error:", arithmeticExpression);
    }
});

//console.log(parseArithmeticExpression((arithmeticExpressions[0] ?? "").trim()));

console.log("---");

str = `He said: "She's the one!".`;
regexp = /(?<quote>['"])(.*?)\k<quote>/g;
rall = str.matchAll(regexp);
for (const r of rall) {
    console.log(r, r.length);
}

str = `He said: 'She\'s the one!'.`;
regexp = /(?<quote>['"])(.*?)\k<quote>/g;
rall = str.matchAll(regexp);
for (const r of rall) {
    console.log(r, r.length);
}

console.log("----------------------------------");

str = "..[link]Google: [url]http://google.com[/url][/link].. [b]kuku[/b]  [x]  [y]  [/y][/x]";

function* bbtags<T>(
    text: string,
    mapf?: (match: RegExpMatchArray) => T
): IterableIterator<RegExpMatchArray | T> {

    const unmappedResult = bbtags(text);
    if (mapf) {
        for (const regExpMatchArray of unmappedResult) {
            yield mapf(regExpMatchArray);
        }
    } else {
        yield* unmappedResult;
    }

    function* bbtags(text: string): IterableIterator<RegExpMatchArray> {
        if (!text)
            return;

        const regexp = /\[(?<tag>\p{Alphabetic}+)\](?<content>.*)\[\/\k<tag>\]/gius;
        const matches: IterableIterator<RegExpMatchArray> = text.matchAll(regexp);

        for (const match of matches) {
            yield match;
            const content = match.groups?.["content"];
            if (content) {
                const nested: IterableIterator<RegExpMatchArray> = bbtags(content);
                yield* nested;
            }
        }
    }
}


console.log("==========================================");

for (const m of bbtags(str)) { console.log(m); }

console.log("===");

for (const m of bbtags(str, match => ({
    url: match.groups?.["tag"], content: match.groups?.["content"]
}))) {
    console.log(m);
}

str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

console.log("===");

for (const m of bbtags(str)) { console.log(m); }

console.log("---");


str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';
console.log(str);

//str = ' .. "test me" .. "Say \"Hello\"!" .. "\\ \"" .. ';
regexp = /"(\\.|[^"\\])*"/g;
regexp2 = /"(\\"|[^"])*"/g;

for (const r of str.matchAll(regexp)) {
    console.log(r[0]);
}
for (const r of str.matchAll(regexp2)) {
    console.log(r[0]);
}

str = "  123 ";
//console.log(str.replace(/\s*(.*)\s*/, "$1"));
console.log(/(?<=\s*)\S+(?=\s*)/[Symbol.match]("   1234   ")?.[0] ?? "");
console.log(/(?<=\s*)\S+(?=\s*)/[Symbol.match]("      ")?.[0] ?? "");

console.log('<style> <styler> <style test="...">'.match(/\<style(|\s+[^\>]*)\>/g));
console.log('<style> <styler> <style test="...">'.match(/\<style(\s+[^\>]*)?\>/g));

str = "2 turkeys cost 60€";

console.log(str.match(/\d+\b(?!€)/g)); // 2 (the price is not matched)
console.log(str.match(/\d+\b/g)); // 2 (the price is not matched)

str = "2 turkeys cost 60€ 1 turkeys cost 30$";

for (const r of str.matchAll(/\d+(?=(?<currency>[€$]))/g)) {
    console.log(r);
}

for (const r of str.matchAll(/\d+(?=(?<currency>(€|\$)))/g)) {
    console.log(r);
}

str = "0 12 -5 123 -18";
for (const r of str.matchAll(/(?<![-\d])\d+/g)) {
    console.log(r);
}

console.log("-------------------");

regexp = /(?<=<body style="height: 200px">)/gm;

str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

for (const r of str.matchAll(regexp)) {
    console.log(r);
}

str = str.replace(regexp, `<h1>Hello</h1>`);
console.log(str);

regexp = /^(\d+\b)*$/;
str = "012345678901234567890123456789a";
//str = "012345678901234567890123456a";

// will take a very long time (careful!)
console.log(regexp.test(str));


//regexp = /^(\w+\s?)*$/;
regexp = /^(\w+\s)*\w+$/;
str = "An input string that takes a long time or even makes this regexp hang!";

// will take a very long time
console.log(regexp.test(str));

console.log("******************");

// parentheses are named ?<word>, referenced as \k<word>
regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/g;
regexp = /^((?=(?<word>\w+))\k<word>[\s\?]?)*$/g;
regexp = /^((?=(?<word>\w+))\k<word>[\s\p{Po}]?)*$/ug;

str = "An input string that takes a long time or even makes this regex hang?";
for (const r of str.matchAll(regexp)) {
    console.log(r);
}

str = "A correct string";
for (const r of str.matchAll(regexp)) {
    console.log(r);
}


export { };
