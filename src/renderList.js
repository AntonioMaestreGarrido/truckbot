import { getLocalStorage, saveLocalStorage } from "../index.js";
import { addColumn, deleteColumn } from "./arrayAux.js";
import { fetchSscData } from "./sesameGate.js";

export function renderList(listado) {

  //listado=[["Time","Date","Action","VRID","Lane","Reason","Arrived","Logged","Dock"],["2:00:00 AM","2022-04-18","Pickup","1148T5NLW","DQA2->MAD7","ATSBagsCartsMixed",false,false,"-"],["1:00:00 AM","2022-04-18","Dropoff","1131RCF5Q","MAD6->DQA2","ATSOutbound",false,false,"-"],["2:45:00 AM","2022-04-18","Dropoff","1139K535C","MAD8->DQA2","ATSOutbound",false,false,"-"],["3:45:00 AM","2022-04-18","Dropoff","11112FZWB","RMU1->DQA2","ATSOutbound",false,false,"-"],["6:40:00 AM","2022-04-18","Dropoff","113PKMLD1","MAD8->DQA2","ATSOutbound",false,false,"-"],["7:00:00 AM","2022-04-18","Dropoff","11353FL3V","MAD6->DQA2","ATSOutbound",false,false,"-"],["7:15:00 AM","2022-04-18","Dropoff","116JWPMNK","MAD9->DQA2","ATSOutbound",false,false,"-"],["7:40:00 AM","2022-04-18","Dropoff","112PR3XG8","MAD8->DQA2","ATSOutbound",false,false,"-"],["10:00:00 AM","2022-04-18","Pickup","111PBVPSZ","DQA2->MAD7","ATSBagsCartsMixed",false,false,"-"],["1:30:00 PM","2022-04-18","Pickup","116GCKN5T","DQA2->MAD4","TransfersEmptyPalletsOB",false,false,"-"],["12:00:00 AM","2022-04-18","Dropoff","112V2DT4F","MAD8->DQA2","ATSOutbound",false,false,"-"],["9:15:00 AM","2022-04-18","Pickup","11684ZT76","DQA2->EQA2","ATSVirtualTruck",false,false,"-"],["5:00:00 PM","2022-04-17","Dropoff","112GL71GJ","SVQ1->DQA2","ATSOutbound",false,false,"-"],["11:05:00 PM","2022-04-18","Dropoff","11484WWCZ","SVQ1->DQA2","ATSOutbound",false,false,"-"],["1:00:00 AM","2022-04-19","Pickup","115LJR5KB","DQA2->MAD7","TransfersCarts",false,false,"-"],["3:15:00 AM","2022-04-19","Dropoff","111JFNT48","SVQ1->DQA2","ATSOutbound",false,false,"-"],["3:45:00 AM","2022-04-19","Dropoff","112MYZKGN","RMU1->DQA2","ATSOutbound",false,false,"-"],["4:00:00 AM","2022-04-19","Dropoff","115QK2X5D","MAD8->DQA2","ATSOutbound",false,false,"-"]]
  //saveLocalStorage(listado)
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
      if(i===8){th.classList.add("ok")}
      fila.appendChild(th);
    }
    cuerpo.appendChild(fila);
    fila.setAttribute("VRID", listado[j][4]);
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
  
  saveLocalStorage(listado)
  renderList(listado);
}
export async function getVolume(){
  let scc= await fetchSscData
}
