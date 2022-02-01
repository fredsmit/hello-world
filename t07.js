document.documentElement.addEventListener("dblclick", dblclickListener);
function dblclickListener(ev) {
    console.log("Wait:", Date.now());
    // const td = document.createElement("td");
    // let dt0 = Date.now();
    // for (let index = 0; index < 10_000_000; index++) {
    //     //const text = document.createTextNode("KUKU"); // faster than new 4 vs 6
    //     const td = document.createElement("td");
    //     td.appendChild(document.createTextNode("KUKU"));
    // }
    // console.log("create dt:", Date.now() - dt0);
    // dt0 = Date.now();
    // for (let index = 0; index < 10_000_000; index++) {
    //     //const text = new Text("KUKU");
    //     const td1 = td.cloneNode();
    //     td1.appendChild(document.createTextNode("KUKU"));
    // }
    // console.log("clone dt:", Date.now() - dt0);
    const scriptText = `
(async () => {
  const { getCommonColors } = await import("./commonColors.js");
  console.dir(getCommonColors());
})();
    `;
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bye</title>
</head>
<body>
  <b>... Bye for now ...</b>
  <p>${new Date()}</p>
  <p><a href="${window.location.href}">Refresh</a></p>
  <script>${scriptText}</script>
</body>
</html>
`;
    document.body.innerHTML = "... Bye for now ...";
    document.body.innerText = "... Bye for now ...";
    document.body.textContent = "... Bye for now ...";
    setTimeout((html) => {
        document.write(html);
    }, 2000, html);
}
export {};
