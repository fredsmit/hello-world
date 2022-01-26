const url = "https://raw.githubusercontent.com/fredsmit/hello-world/master/t01.ts"

const promise = fetch(url)
  .then(response => response.json())
  .catch(err => alert(err))

  promise.then(async response => {

    const dvHead = document.getElementById("dvHead");
    if (dvHead && dvHead.tagName === "H1") {
        dvHead.innerText = "Cool, the data is loaded.";
    }

    const div = document.createElement('code');
    const json = await response.json();

    div.innerText = JSON.stringify(json, null, 2);
    document.body.append(div);
}).catch(error => {
    console.error(error);
});

