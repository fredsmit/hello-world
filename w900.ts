if (true || !globalThis.alert) { globalThis.alert = console.log; }

if (globalThis.window) {
    window.addEventListener('unhandledrejection', function (ev: PromiseRejectionEvent) {
        // console.log("ev:", ev);
        ev.preventDefault();
        console.log("PromiseRejectionEvent.promise:", ev.promise); // [object Promise] - the promise that generated the error
        console.log("PromiseRejectionEvent.reason)", ev.reason); // Error: Whoops! - the unhandled error object
    });
}


// the execution: catch -> then
new Promise(async (resolve, reject) => {
    throw new Error("Whoops!");
    // try {
    // } catch (error) {
    //     reject(error);
    // }
}).catch(function (error) {

    console.log("The error is handled, continue normally");

}).then(() =>
    console.log("Next successful handler runs")
);

export { };
