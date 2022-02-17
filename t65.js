// let deleteRequest = indexedDB.deleteDatabase("store");
// deleteRequest.addEventListener("success", function (this: IDBOpenDBRequest, ev: Event): void {
//     console.log("deleteRequest:", ev.type);
// });
let openRequest = indexedDB.open("store", 1);
openRequest.onupgradeneeded = function (ev) {
    console.log("upgradeneeded:", ev.newVersion, ev.oldVersion);
    let db = openRequest.result;
    if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
        db.createObjectStore('books', { keyPath: 'id' }); // create it
    }
    // triggers if the client had no database
    // ...perform initialization...
};
openRequest.onerror = function () {
    console.error("Error", openRequest.error);
};
openRequest.onsuccess = function () {
    let db = openRequest.result;
    console.log(db);
    let transaction = db.transaction("books", "readwrite"); // (1)
    // get an object store to operate on it
    let books = transaction.objectStore("books"); // (2)
    let book = {
        id: 'js',
        price: 10,
        created: new Date()
    };
    let request = books.add(book); // (3)
    request.onsuccess = function () {
        console.log("Book added to the store", request.result);
    };
    request.onerror = function () {
        console.log("Error", request.error);
    };
    // continue working with database using db object
};
export {};
