let newForm = {};
document.getElementById("POST").addEventListener("click", function () {
  createForm();
});
const title = document.getElementById("title");
const welcomeTitle = document.getElementById("welcomeTitle");

const fieldTitle = document.getElementById("field");
const description = document.getElementById("description");

async function getJSON() {
  const formD = await fetch("../json/addForm.json");
  const dataForm = await formD.json();
  newForm = dataForm;
}
getJSON();

function createForm() {
  newForm.title = title.value;
  newForm.fields[0].title = fieldTitle.value;
  newForm.welcome_screens[0].title = welcomeTitle.value;

  newForm.fields[0].properties.description = description.value;
  console.log(newForm);
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer DkMhgW8aV8uh9dzRF45mArAmPEw5QtV39ER5rjvUrjYQ"
  );
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newForm),
  };
  fetch("https://api.typeform.com/forms", requestOptions).then((response) => {
    response.json().then((x) => {
      window.location.href = "../index.html";
    });
  });
}
