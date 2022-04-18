import { getLocalStorage } from "../index.js";
import { addColumn, deleteColumn } from "./arrayAux.js";

export function renderList(listado) {
  const container = document.getElementById("tableContainer");

  let tabla = document.createElement("table");
  let cabecera = document.createElement("thead");
  let cuerpo = document.createElement("tbody");
  let filacabecera = document.createElement("tr");
  let inputall = document.createElement("input");
  //se añade un event para seleccionar todos los inputs
  inputall.setAttribute("type", "checkbox");
  //filacabecera.appendChild(inputall);
  inputall.addEventListener("change", (e) => changeAllInputs(e.target.checked));
  let th = document.createElement("th");
  th.appendChild(inputall);
  filacabecera.appendChild(th)


  //se crea la cabecera
  for (let i = 0; i < listado[0].length; i++) {
    let th = document.createElement("th");
    th.textContent = listado[0][i];
    // se añade el index del array como attributo para facilitar los accesos
    th.setAttribute("index", i);
    th.addEventListener("click", (e) =>
      sortListado(e.target.getAttribute("index"))
    );
    filacabecera.appendChild(th);
  }
  cabecera.appendChild(filacabecera);
  // se crea el Body
  for (let j = 1; j < listado.length; j++) {
    let fila = document.createElement("tr");
    let input = document.createElement("input");
    let tdInput=document.createElement("td")
    input.setAttribute("type", "checkbox");
    input.setAttribute("row", j);
    tdInput.appendChild(input);
    fila.appendChild(tdInput)
    for (let i = 0; i < listado[0].length; i++) {
      //      console.log("posisiocion " + i, listado[j][i]);
      let th = document.createElement("td");
      //th.setAttribute("contenteditable","true")
      th.classList.add(listado[0][i]);
      th.textContent = listado[j][i];
      fila.appendChild(th);
    }
    cuerpo.appendChild(fila);
    fila.setAttribute("VRID", listado[j][3]);
  }
  cuerpo.addEventListener("dblclick", (e) => selectSimilar(e));
  tabla.appendChild(cabecera);
  tabla.appendChild(cuerpo);
  container.innerHTML = "";
  container.appendChild(tabla);
}
async function selectSimilar(e) {
  let rowEle=e.target.parentNode
  let value= rowEle.querySelector(`input`).checked
  value=!value
  console.log(e.target.textContent);
  let valueToFind = e.target.textContent;
  let listado = await getLocalStorage();
  console.log(listado.filter((ele) => ele.includes(valueToFind)));
  listado.forEach((ele, i) => {
    if (ele.includes(valueToFind)) {
      document.querySelector(`input[row='${i}']`).checked= value
      console.log(valueToFind, i);
    }
  });
}
function changeAllInputs(inputstate) {
  //alert(inputstate)
  let inputs = document.querySelectorAll("input[type='checkbox']");
  console.log(inputs.length);
  inputs.forEach((ele) => {
    ele.checked = inputstate;
  });
}
async function sortListado(i) {
  let listado = await getLocalStorage();
  let cabecera = listado.splice(0, 1);
  console.log("cbeceraaa", cabecera);
  listado.sort((a, b) => {
    if (listado.indexOf(a) !== 0) {
      a[i] - b[i];
      if (a[i] < b[i]) {
        return -1;
      }
      if (a[i] > b[i]) {
        return 1;
      }
      return 0;
    }
  });
  listado.unshift(cabecera[0]);
  console.log(listado);
  renderList(listado);
}

