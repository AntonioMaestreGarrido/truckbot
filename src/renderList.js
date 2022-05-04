import {
  FIELD,
  getLocalStorage,
  saveLocalStorage,
  truckData,
} from "../index.js";
import { addColumn, deleteColumn, refineArray } from "./arrayAux.js";
import { fetchSscData } from "./sesameGate.js";
import { getEpoch } from "./arrayAux.js";
import { writeNotiHistory } from "./noti.js";

export function renderList(listado) {
  console.log(listado);
  //
  //saveLocalStorage(listado)

  // listado.forEach(ele => {
  //   if(ele[0]!="Time"){
  //   ele[0]=new Date(getEpoch(ele))

  //   console.log(ele[4])
  //   }
  // });
  // saveLocalStorage(listado)

  //listado=[["Time","Date","Action","VRID","Lane","Reason","Arrived","Logged","Dock"],["2:00:00 AM","2022-04-18","Pickup","1148T5NLW","DQA2->MAD7","ATSBagsCartsMixed",false,false,"-"],["1:00:00 AM","2022-04-18","Dropoff","1131RCF5Q","MAD6->DQA2","ATSOutbound",false,false,"-"],["2:45:00 AM","2022-04-18","Dropoff","1139K535C","MAD8->DQA2","ATSOutbound",false,false,"-"],["3:45:00 AM","2022-04-18","Dropoff","11112FZWB","RMU1->DQA2","ATSOutbound",false,false,"-"],["6:40:00 AM","2022-04-18","Dropoff","113PKMLD1","MAD8->DQA2","ATSOutbound",false,false,"-"],["7:00:00 AM","2022-04-18","Dropoff","11353FL3V","MAD6->DQA2","ATSOutbound",false,false,"-"],["7:15:00 AM","2022-04-18","Dropoff","116JWPMNK","MAD9->DQA2","ATSOutbound",false,false,"-"],["7:40:00 AM","2022-04-18","Dropoff","112PR3XG8","MAD8->DQA2","ATSOutbound",false,false,"-"],["10:00:00 AM","2022-04-18","Pickup","111PBVPSZ","DQA2->MAD7","ATSBagsCartsMixed",false,false,"-"],["1:30:00 PM","2022-04-18","Pickup","116GCKN5T","DQA2->MAD4","TransfersEmptyPalletsOB",false,false,"-"],["12:00:00 AM","2022-04-18","Dropoff","112V2DT4F","MAD8->DQA2","ATSOutbound",false,false,"-"],["9:15:00 AM","2022-04-18","Pickup","11684ZT76","DQA2->EQA2","ATSVirtualTruck",false,false,"-"],["5:00:00 PM","2022-04-17","Dropoff","112GL71GJ","SVQ1->DQA2","ATSOutbound",false,false,"-"],["11:05:00 PM","2022-04-18","Dropoff","11484WWCZ","SVQ1->DQA2","ATSOutbound",false,false,"-"],["1:00:00 AM","2022-04-19","Pickup","115LJR5KB","DQA2->MAD7","TransfersCarts",false,false,"-"],["3:15:00 AM","2022-04-19","Dropoff","111JFNT48","SVQ1->DQA2","ATSOutbound",false,false,"-"],["3:45:00 AM","2022-04-19","Dropoff","112MYZKGN","RMU1->DQA2","ATSOutbound",false,false,"-"],["4:00:00 AM","2022-04-19","Dropoff","115QK2X5D","MAD8->DQA2","ATSOutbound",false,false,"-"]]
  //saveLocalStorage(listado)
  const container = document.getElementById("tableContainer");
  //document.getElementById("trucksDrawsContainer").innerHTML = ""
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
  filacabecera.appendChild(th);

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
    j % 2 ? fila.classList.add("even") : fila.classList.add("odd");
    let input = document.createElement("input");
    let tdInput = document.createElement("td");
    input.setAttribute("type", "checkbox");
    input.setAttribute("row", j);
    tdInput.appendChild(input);
    fila.appendChild(tdInput);
    for (let i = 0; i < listado[0].length; i++) {
      //      console.log("posisiocion " + i, listado[j][i]);
      let th = document.createElement("td");
      //th.setAttribute("contenteditable","true")
      th.classList.add(listado[0][i]);
      if (i === 0) {
        // se sustituye el valor time por el epoch time
        let d = new Date(listado[j][i]);

        th.textContent =
          d.getHours().toString().padStart(2, "0") +
          ":" +
          d.getMinutes().toString().padStart(2, "0");
      } else {
        th.textContent = listado[j][i];
      }
      if (i === 8) {
        th.classList.add("ok");
      }
      fila.appendChild(th);
    }
    cuerpo.appendChild(fila);
    fila.setAttribute("VRID", listado[j][4]);
  }
  cuerpo.addEventListener("dblclick", (e) => selectSimilar(e));
  tabla.appendChild(cabecera);
  tabla.appendChild(cuerpo);
  container.innerHTML = "";
  writeNotiHistory();

  //**********************************test******************* */
  //listado[3][6] = true

  container.appendChild(tabla);
  renderIcons(listado);
  createTruckDraw(listado);
  saveLocalStorage("listadoCamiones", listado);
}
async function selectSimilar(e) {
  let rowEle = e.target.parentNode;
  let value = rowEle.querySelector(`input`).checked;
  value = !value;
  console.log(e.target.textContent);
  let valueToFind = e.target.textContent;
  let listado = await getLocalStorage("listadoCamiones");
  console.log(listado.filter((ele) => ele.includes(valueToFind)));
  listado.forEach((ele, i) => {
    if (ele.includes(valueToFind)) {
      document.querySelector(`input[row='${i}']`).checked = value;
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
  console.log(i);
  let listado = await getLocalStorage("listadoCamiones");
  
  let sortKey = await getLocalStorage("sortKey");
  if (listado[0][i] === sortKey.key) {
    sortKey.orderDescen = !sortKey.orderDescen;
  }else{ sortKey.orderDescen=true}
  let cabecera = listado.splice(0, 1);
  //const defaultSort=()

  listado.sort((a, b) => {
    if (listado.indexOf(a) !== 100) {
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
if(sortKey.orderDescen){listado.reverse()}
  listado.unshift(cabecera[0]);
  console.log(listado);

  saveLocalStorage("listadoCamiones", listado);
  saveLocalStorage("sortKey", { key: listado[0][i], orderDescen: sortKey.orderDescen });
  renderList(listado);
}

export function testTruckAnimation() {
  let camiones = document.querySelectorAll("img.drawTruck");

  let t = camiones[Math.floor(Math.random() * 19)];
  let a = Math.floor(Math.random() * 19);
  let b = Math.floor(Math.random() * 2) + 1;
  console.log(a, b);
  TruckAnimate(t, a, b);
}
export function TruckAnimate(camion, row, posicion) {
  //posiciones
  // 0 off izquierda
  // 1 izquerda fila
  // 2 dereha fila
  // 3 off derecha

  // row = 10
  // posicion=3

  const filas = document.querySelectorAll("tbody tr");
  const fila = filas[row];

  const position = fila.getBoundingClientRect();
  //const camion = truck

  const camionStyle = getComputedStyle(camion);

  let top = Math.floor(position.top);
  let left;
  switch (posicion) {
    case 0:
      left = -200;
      break;
    case 1:
      left = Math.floor(position.left - parseInt(camionStyle.width));

      break;
    case 2:
      left = Math.floor(position.left + parseInt(position.width));

      break;
    case 3:
      left = window.innerWidth + 200;

      break;

    default:
      break;
  }

  camion.style.left = `${left}px`;
  camion.style.top = `${top}px`;
}
function createTruckDraw(listado) {
  let truck;
  listado
    .filter((ele, index) => index > 0)
    .forEach((camion, index) => {
      let vrid = camion[FIELD.VRID]; // cambiar TEST

      if (!document.getElementById(vrid)) {
        truck = document.querySelector("#testTruck").cloneNode(true);
        truck.id = vrid;
        document.querySelector("#trucksDrawsContainer").appendChild(truck);
      } else {
        truck = document.getElementById(vrid);
      }
      let posicion = 0;

      if (camion[FIELD.ARRIVED]) {
        posicion = 1;
      } //changue test
      if (camion[FIELD.LOGGED]) {
        posicion = 2;
      }
      //console.log("el truck es ",truck)
      truck.addEventListener("click", (e) => toolTipRender(e));
      TruckAnimate(truck, index, posicion);
    });
}

function renderIcons() {
  const list = document.querySelectorAll("td.Arrived,td.Logged");
  list.forEach((ele) => {
    let value = ele.innerHTML;
    console.log(value);
    let style = getComputedStyle(ele);
    if (value === "true") {
      ele.classList.remove("checkNotOK");
      ele.classList.add("checkOK");
    } else {
      ele.classList.remove("checkOK");
      ele.classList.add("checkNotOK");
    }
    ele.innerHTML = "";
  });

  //document.querySelectorAll("tr").forEach((ele) => console.log(ele.querySelector(".Logged")))
}
export async function testTime() {
  let listado = await getLocalStorage("listadoCamiones");
  console.log(listado);
  listado
    .filter((ele, i) => i > 0)
    .forEach((ele) => {
      console.log(getEpoch(ele));

      let dt = ele[1].split("-");

      let horaArray = ele[0].split(/:| /);
      if (horaArray[3] === "PM") {
        horaArray[0] = parseInt(parseInt(horaArray[0]) + 12);
      }

      let d = new Date(
        dt[0],
        parseInt(dt[1]) - 1,
        dt[2],
        horaArray[0],
        horaArray[1]
      );
      let h = d.getHours().toString();
      console.log(typeof d);
      console.log(
        d.getHours().toString().padStart(2, "0") +
          ":" +
          d.getMinutes().toString().padStart(2, "0")
      );
      let e = "eee";
      e.padStart(2, "0");
      console.log(d.getDate());
    });
}
export function loading(start) {
  if (start) {
    document.getElementById("truckLoader").style.display = "initial";
  } else {
    document.getElementById("truckLoader").style.display = "none";
  }
}
function toolTipRender(e) {
  let tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");

  let tooltext = document.createElement("span");
  tooltext.innerText = e.target.id;
  tooltip.append(tooltext);

  tooltip.style.left = e.target.style.left;
  tooltip.style.top = e.target.style.top;

  document.body.appendChild(tooltip);
}
function saveSort(key, ascen) {
  saveLocalStorage("sortKey", { key, ascen });
}
