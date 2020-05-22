const queryString = window.location.search;
const param = new URLSearchParams(queryString);
const idForm = param.get("id");

fetch("/json/list.json").then((response) => {
  response.json().then((x) => {
    let values = x.filter((x) => x.id === idForm);

    document.getElementById("title").value = values[0].title;
    document.getElementById("href").value = values[0].href;
  });
}); console.log(document.getElementById(idForm))

