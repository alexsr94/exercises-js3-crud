
function getData() {
  fetch("/json/list.json").then((result) => {
    result.json().then((data) => {
      data.forEach(function (x) {
        const table = document.getElementById("tbody");
        const rowData = document.createElement("tr");
        rowData.id=x.id;
        const titleData = document.createElement("td");
        const hrefData = document.createElement("td");
        const lastUpdateData = document.createElement("td");
        const actionsData = document.createElement("td");
        const ahrefLink = document.createElement("a");
        ahrefLink.setAttribute("href", "'" + x.href + "'");
        hrefData.innerText = x.href;
        ahrefLink.appendChild(hrefData);
        const edit = document.createElement("a");
        const trashSpan = document.createElement("p");
        trashSpan.addEventListener("click",function (){deleteJSONElement(x.id)});
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
        rowData.appendChild(actionsData);

        table.appendChild(rowData);
      });
    });
  });
}

getData();
/*
function deleteJSONElement(object, param1ID) {
  let index = object.filter((z) => z.id !== param1ID);

  fetch("/json/list.json", {
    method: "POST",
    body: JSON.stringify(index),
    headers: {
      "Content-type": "application/json; charset =UTF-8",
    },
  }).then((response) => {
    console.log(response);
  });
}
*/
function deleteJSONElement(param1ID) {
  document.getElementById(param1ID).remove();
  
}
