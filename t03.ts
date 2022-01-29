

const buffer = new Uint8Array(64);


// let elements = document.querySelectorAll('ul > li:last-child');

for (const byte of buffer) {
    console.log(byte.toString(16)); // "test", "passed"
}

export { }

