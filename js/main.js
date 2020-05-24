let data = {};
const table = document.getElementById("tbody");
function getData() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer DkMhgW8aV8uh9dzRF45mArAmPEw5QtV39ER5rjvUrjYQ"
  );
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch("https://api.typeform.com/forms", requestOptions).then((result) => {
    result.json().then((response) => {
      data = response.items;
      updateData();
    });
  });
}

 function deleteJSONElement(param1ID) {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer DkMhgW8aV8uh9dzRF45mArAmPEw5QtV39ER5rjvUrjYQ"
  );
  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };
  let confirmMessage = confirm("Are you sure you want to delete the form?");
  if (confirmMessage === true) {
     fetch(
      "https://api.typeform.com/forms/" + param1ID,
      requestOptions
    ).then((deleteForm)=>{
      if(deleteForm.ok){
        document.getElementById(param1ID).remove();
      }
      deleteForm.json().then(()=>{
        
      })

    })
    
  }
}
function updateData() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer DkMhgW8aV8uh9dzRF45mArAmPEw5QtV39ER5rjvUrjYQ"
  );
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  data.forEach(function (x) {
    const nresponses = document.createElement("td");
    async function numeroRespuestas() {
      const responseNumero = await fetch(
        "https://api.typeform.com/forms/" + x.id + "/responses",
        requestOptions
      );

      const JSONresponse = await responseNumero.json();

      nresponses.innerText = JSONresponse.items.length;
    }
    numeroRespuestas();

    const rowData = document.createElement("tr");
    rowData.id = x.id;
    const titleData = document.createElement("td");
    const hrefData = document.createElement("td");
    const lastUpdateData = document.createElement("td");
    const actionsData = document.createElement("td");
    const ahrefLink = document.createElement("a");
    ahrefLink.setAttribute("href", "'" + x.href + "'");
    hrefData.innerText = x.self.href;
    ahrefLink.appendChild(hrefData);
    const edit = document.createElement("a");
    const trashSpan = document.createElement("p");
    trashSpan.addEventListener("click", function () {
      deleteJSONElement(x.id);
    });
    edit.innerText = "Edit";
    edit.setAttribute("href", "/pages/edit.html?id=" + x.id);
    trashSpan.innerText = "Delete";

    actionsData.appendChild(edit);
    actionsData.appendChild(trashSpan);

    titleData.innerText = x.title;
    lastUpdateData.innerText = x.last_updated_at.slice(0, 10);
    rowData.appendChild(titleData);
    rowData.appendChild(ahrefLink);
    rowData.appendChild(lastUpdateData);
    rowData.appendChild(nresponses);
    rowData.appendChild(actionsData);

    table.appendChild(rowData);
  });
}

getData();
