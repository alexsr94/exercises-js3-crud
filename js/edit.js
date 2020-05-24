const queryString = window.location.search;
const param = new URLSearchParams(queryString);
const titleValue = document.getElementById("title");
const hrefValue = document.getElementById("href");
let objeto = "";

document.getElementById("save").addEventListener("click", function (event) {
  updateData();
});

const idForm = param.get("id");
function getData() {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer DkMhgW8aV8uh9dzRF45mArAmPEw5QtV39ER5rjvUrjYQ"
  );
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch("https://api.typeform.com/forms/" + idForm, requestOptions).then(
    (response) => {
      response.json().then((data) => {
        objeto = data;
        

        titleValue.value = data.title;
        hrefValue.value = data._links.display;
      });
    }
  );
}

function updateData() {
  objeto.title = titleValue.value;
  objeto._links.display = hrefValue.value;
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer DkMhgW8aV8uh9dzRF45mArAmPEw5QtV39ER5rjvUrjYQ"
  );
  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(objeto),
  };
  fetch("https://api.typeform.com/forms/" + idForm, requestOptions)
    .then((x) => {
      x.json();
    })
    .then((data) => {
      window.location.href = "../index.html";
    });
}
getData();
