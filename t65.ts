import { queryRequiredElement } from "./pageUtils.js";
const area = queryRequiredElement(document.body, "textarea", "area");
const btnSave = queryRequiredElement(document.body, "button", "btnSave");
btnSave.addEventListener(
    "click",
    function (this: HTMLButtonElement, ev: MouseEvent): void {
        const text = area.value ?? "";
        console.log("text:", text);
        const openRequest = window.indexedDB.open("store", 1);
        openRequest.onsuccess = function (this: IDBRequest<IDBDatabase>, ev: Event): void {
            const db: IDBDatabase = openRequest.result;
            const transaction: IDBTransaction = db.transaction("books", "readwrite");
            const books: IDBObjectStore = transaction.objectStore("books");
            const book = {
                id: 'js' + new Date().getTime(),
                price: 10,
                text: text,
                created: new Date()
            };
            books.add(book);
        };
    }
);

// let deleteRequest = indexedDB.deleteDatabase("store");
// deleteRequest.addEventListener("success", function (this: IDBOpenDBRequest, ev: Event): void {
//     console.log("deleteRequest:", ev.type);
// });

const openRequest: IDBOpenDBRequest = globalThis.indexedDB.open("store", 1);

openRequest.onupgradeneeded = function (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent): void {
    console.log("upgradeneeded:", ev.newVersion, ev.oldVersion);
    console.log(this);

    let db = openRequest.result;
    if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
        db.createObjectStore('books', { keyPath: 'id' }); // create it
    }

    // triggers if the client had no database
    // ...perform initialization...
};

openRequest.onerror = function (this: IDBRequest<IDBDatabase>, ev: Event): void {
    console.error("Error1:", this);
    console.error("Error2:", ev);
    console.error("Error3:", openRequest.error);
};

openRequest.onsuccess = function (this: IDBRequest<IDBDatabase>, ev: Event): void {
    console.log("et:", this);
    console.log("ev:", ev.type, "isTrusted:", ev.isTrusted);

    const db: IDBDatabase = openRequest.result;
    console.log("db:", db);

    const transaction: IDBTransaction = db.transaction("books", "readwrite"); // (1)

    // get an object store to operate on it
    const books: IDBObjectStore = transaction.objectStore("books"); // (2)

    const book = {
        id: 'js',
        price: 10,
        created: new Date()
    };

    /*
    Short explanation: your object store was created with an in-line keyPath
    (the store expects the key to be a property inside the object),
    but your add() call passed a separate key argument.
    IndexedDB forbids providing an external key when the store uses an in-line keyPath.
    */
    //const dbRequest: IDBRequest<IDBValidKey> = books.add(book, book.id); // (3)
    const dbRequest: IDBRequest<IDBValidKey> = books.add(book); // (3)

    dbRequest.onsuccess = function () { // (4)
        console.info("Book added to the store:", dbRequest.result);
    };

    dbRequest.onerror = function (this: IDBRequest<IDBValidKey>, ev: Event): void {
        //console.error("Error:", dbRequest.error);
        if (dbRequest.error?.name == "ConstraintError") {
            console.log("Book with such id already exists."); // handle the error
            ev.preventDefault(); // don't abort the transaction
            ev.stopPropagation(); // don't bubble error up, "chew" it
        } else {
            // do nothing
            // transaction will be aborted
            // we can take care of error in transaction.onabort
        }
    };
    // continue working with database using db object
};

export { };
