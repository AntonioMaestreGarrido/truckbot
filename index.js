// Retrieve info from sesamegate
// async function fetchSesameData() {
//   let listado = await fetch("http://localhost:3001/sesame")
//     .then((response) => response.json())
//     .then((data) => {

import { refineArray, truckListaFiltered } from "./src/arrayAux.js";
import {
  loading,
  renderList,
  testTime,
  testTruckAnimation,
} from "./src/renderList.js";
import {
  fetchMmatTruckData,
  fetchMmatTruckStopsData,
  fetchSesameData,
  fetchSscData,
  fetchYardData,
  testets,
} from "./src/sesameGate.js";
import { notiChime, sendNotification, writeNotiHistory } from "./src/noti.js";
import { testMap } from "./src/maps.js";
import { createModal, setListenerModal } from "./src/modal.js";

//listado de constantes que definen la posicion en el array
const SITE = {
  latitude: 36.69600329644401,
  longitude: -4.477451896032319,
  name: "DQA2",
};
const CONFIG = {
  site: {
    code: "DQA2",
    latitude: 36.69600329644401,
    longitude: -4.477451896032319,
  },
  notifications: true,
  notificationSound: "claxon1.mp3",
};

export const FIELD = {
  EXPECTED: 1,
  ACTION: 3,
  VRID: 4,

  VOLUME: 7,
  ARRIVED: 8,
  LOGGED: 9,
  DOCK: 10,
};
const CABECERA = [
  "Time",
  "Date",
  "Action",
  "VRID",
  "Lane",
  "Reason",
  "Arrived",
  "Logged",
  "Dock",
];

document.getElementById("tableContainer").style.cursor = "pointer";

let listado;
// localStorage.clear();
// getLocalStorage();
// [["Time","Date","Action","VRID","Lane","Reason","Arrived","Logged","Dock"],["2:00:00 AM","2022-04-18","Pickup","1148T5NLW","DQA2->MAD7","ATSBagsCartsMixed",false,false,"-"],["1:00:00 AM","2022-04-18","Dropoff","1131RCF5Q","MAD6->DQA2","ATSOutbound",false,false,"-"],["2:45:00 AM","2022-04-18","Dropoff","1139K535C","MAD8->DQA2","ATSOutbound",false,false,"-"],["3:45:00 AM","2022-04-18","Dropoff","11112FZWB","RMU1->DQA2","ATSOutbound",false,false,"-"],["6:40:00 AM","2022-04-18","Dropoff","113PKMLD1","MAD8->DQA2","ATSOutbound",false,false,"-"],["7:00:00 AM","2022-04-18","Dropoff","11353FL3V","MAD6->DQA2","ATSOutbound",false,false,"-"],["7:15:00 AM","2022-04-18","Dropoff","116JWPMNK","MAD9->DQA2","ATSOutbound",false,false,"-"],["7:40:00 AM","2022-04-18","Dropoff","112PR3XG8","MAD8->DQA2","ATSOutbound",false,false,"-"],["10:00:00 AM","2022-04-18","Pickup","111PBVPSZ","DQA2->MAD7","ATSBagsCartsMixed",false,false,"-"],["1:30:00 PM","2022-04-18","Pickup","116GCKN5T","DQA2->MAD4","TransfersEmptyPalletsOB",false,false,"-"],["12:00:00 AM","2022-04-18","Dropoff","112V2DT4F","MAD8->DQA2","ATSOutbound",false,false,"-"],["9:15:00 AM","2022-04-18","Pickup","11684ZT76","DQA2->EQA2","ATSVirtualTruck",false,false,"-"],["5:00:00 PM","2022-04-17","Dropoff","112GL71GJ","SVQ1->DQA2","ATSOutbound",false,false,"-"],["11:05:00 PM","2022-04-18","Dropoff","11484WWCZ","SVQ1->DQA2","ATSOutbound",false,false,"-"],["1:00:00 AM","2022-04-19","Pickup","115LJR5KB","DQA2->MAD7","TransfersCarts",false,false,"-"],["3:15:00 AM","2022-04-19","Dropoff","111JFNT48","SVQ1->DQA2","ATSOutbound",false,false,"-"],["3:45:00 AM","2022-04-19","Dropoff","112MYZKGN","RMU1->DQA2","ATSOutbound",false,false,"-"],["4:00:00 AM","2022-04-19","Dropoff","115QK2X5D","MAD8->DQA2","ATSOutbound",false,false,"-"]]
//saveLocalStorage([["Time","Date","Action","VRID","Lane","Reason","Arrived","Logged","Dock"],["2:00:00 AM","2022-04-18","Pickup","1148T5NLW","DQA2->MAD7","ATSBagsCartsMixed",false,false,"-"],["1:00:00 AM","2022-04-18","Dropoff","1131RCF5Q","MAD6->DQA2","ATSOutbound",false,false,"-"],["2:45:00 AM","2022-04-18","Dropoff","1139K535C","MAD8->DQA2","ATSOutbound",false,false,"-"],["3:45:00 AM","2022-04-18","Dropoff","11112FZWB","RMU1->DQA2","ATSOutbound",false,false,"-"],["6:40:00 AM","2022-04-18","Dropoff","113PKMLD1","MAD8->DQA2","ATSOutbound",false,false,"-"],["7:00:00 AM","2022-04-18","Dropoff","11353FL3V","MAD6->DQA2","ATSOutbound",false,false,"-"],["7:15:00 AM","2022-04-18","Dropoff","116JWPMNK","MAD9->DQA2","ATSOutbound",false,false,"-"],["7:40:00 AM","2022-04-18","Dropoff","112PR3XG8","MAD8->DQA2","ATSOutbound",false,false,"-"],["10:00:00 AM","2022-04-18","Pickup","111PBVPSZ","DQA2->MAD7","ATSBagsCartsMixed",false,false,"-"],["1:30:00 PM","2022-04-18","Pickup","116GCKN5T","DQA2->MAD4","TransfersEmptyPalletsOB",false,false,"-"],["12:00:00 AM","2022-04-18","Dropoff","112V2DT4F","MAD8->DQA2","ATSOutbound",false,false,"-"],["9:15:00 AM","2022-04-18","Pickup","11684ZT76","DQA2->EQA2","ATSVirtualTruck",false,false,"-"],["5:00:00 PM","2022-04-17","Dropoff","112GL71GJ","SVQ1->DQA2","ATSOutbound",false,false,"-"],["11:05:00 PM","2022-04-18","Dropoff","11484WWCZ","SVQ1->DQA2","ATSOutbound",false,false,"-"],["1:00:00 AM","2022-04-19","Pickup","115LJR5KB","DQA2->MAD7","TransfersCarts",false,false,"-"],["3:15:00 AM","2022-04-19","Dropoff","111JFNT48","SVQ1->DQA2","ATSOutbound",false,false,"-"],["3:45:00 AM","2022-04-19","Dropoff","112MYZKGN","RMU1->DQA2","ATSOutbound",false,false,"-"],["4:00:00 AM","2022-04-19","Dropoff","115QK2X5D","MAD8->DQA2","ATSOutbound",false,false,"-"]])
setListeners();

export function getLocalStorage(key) {
  //localStorage.clear()
  if (!localStorage.listadoCamiones) {
    console.log("listado vacio");
    // listado = await fetchSesameData();
    // console.log(listado);
    // const listadoCamiones = refineArray(listado);
    // localStorage.setItem("listadoCamiones", JSON.stringify(listadoCamiones));
    // console.log(localStorage.listadoCamiones);
  } else {
    //console.log(localStorage.getItem("listadoCamiones"));
    listado = JSON.parse(localStorage.getItem(key));
    return listado;
  }
}
export function saveLocalStorage(key, array) {
  if (Array) {
    localStorage.setItem(key, JSON.stringify(array));
    //    console.log(localStorage.listadoCamiones);
  }
}
async function handleRefreshSesameButton() {
  //document.getElementById("tableContainer").classList.add("loader");
  loading(true);
  let oldList = await getLocalStorage("listadoCamiones");

  // fantastic oneliner to find keys in 2d arrays
  // console.log(oldList.some(row=>row.includes( "VRID")))

  let newLista = refineArray(await fetchSesameData());
  if (oldList === undefined) {
    oldList = [...newLista];
  } else {
    newLista.forEach((ele) => {
      console.log("ele[FIELD.VRID]", ele[FIELD.VRID], FIELD.VRID);
      let vrid = ele[FIELD.VRID];
      if (!oldList.some((row) => row.includes(vrid))) {
        oldList.push(ele);
        console.log("se ha incluido " + vrid);
      } else {
        console.log("no se ha incluido:" + vrid);
      }
    });
  }
  saveLocalStorage("listadoCamiones", oldList);
  renderList(oldList);

  document.getElementById("tableContainer").classList.remove("loader");
  //let newLista=[...oldList,...newLista,]
  loading();
}
function setListeners() {
  setListenerModal()
  document
    .getElementById("refreshSesame")
    .addEventListener("click", () => handleRefreshSesameButton());
document.getElementById("tableContainer").addEventListener("click",(e)=> setTimeout(()=> createModal(e),5000))
  document
    .getElementById("render")
    .addEventListener("click", () =>
      renderList(JSON.parse(localStorage.getItem("listadoCamiones")))
    );
  //document.getElementById("test").addEventListener("click", () => testTruck());
  document
    .getElementById("deleteTruck")
    .addEventListener("click", (e) => deleteTrucks(e));

  document
    .getElementById("testArrived")
    .addEventListener("click", (e) => start(e));
  document
    .getElementById("testYard")
    .addEventListener("click", (e) => testYard(e));
  document
    .getElementById("testNotification")
    .addEventListener("click", (e) => sendNotification(e));

  document.getElementById("test").addEventListener("click", (e) => {
    notiChime("rtrtrsgcbbcidcidcbdicjb")
    
  });
  document
    .getElementById("clear")
    .addEventListener("click", (e) => localStorage.clear());

  document
    .getElementById("testTruckAnimation")
    .addEventListener("click", (e) => testTruckAnimation(3, 1, e));
  document
    .getElementById("testTime")
    .addEventListener("click", (e) =>
      addNotiHistory("Esta es la septima notificacion de prueba")
    );
  document
    .getElementById("testMap")
    .addEventListener("click", (e) => testMap());
  document
    .getElementById("startButton")
    .addEventListener("change", (e) => handleStartButton(e));

  //testSCC;
  //testTruckAnimation
  //testYard
}
async function testYard() {
  //truckData("113NSNYB4", FIELD.DOCK, "IBO 01");
  let data = await fetchYardData();


  console.table(data);
  let listado = await getLocalStorage("listadoCamiones");
  listado[0][FIELD.DOCK]="Dock"
  const listaDock = data.filter((ele) => ele.length > 0);
  listado.forEach((camion) => {
    if(camion[FIELD.DOCK] ==="Dock"){return}
    camion[FIELD.DOCK] = "-"
    let found = false;

    listaDock.forEach((dock, index) => {
      if (camion[FIELD.VRID] !== "VRID" && dock.includes(camion[FIELD.VRID])) {
        console.log(camion[FIELD.VRID], dock, "index=" + index);
        let firstLetter = dock.substring(0, 2);
        if (firstLetter !== "OB" && firstLetter !== "IB") {
          index = index - 1;
        }
        console.log(listaDock[index].substring(0, 4));
        camion[FIELD.DOCK] = listaDock[index].substring(0, 4);
        found = true;
      }
    });
    if (
      found === false &&
      camion[FIELD.LOGGED] === true &&
      camion[FIELD.ARRIVED] === true 
      //camion[FIELD.DOCK] !== "-"
    ) {
      camion[FIELD.DOCK] = "Out";
    }
  });
  listaDock;
  //console.log(listaDock);
  saveLocalStorage("listadoCamiones", listado);
  //renderList(listado);
}
async function testArrive() {
  let listado = await getLocalStorage("listadoCamiones");
  await getSCCdata(listado);

  console.log("despues sccdata");
  console.log(await getMmaData(listado));
  //console.log  (await Promise.allSettled(listado.map(camion=> fetchMmatTruckStopsData(camion[FIELD.VRID]))))
  // await Promise.all(files.map(async (file) => {
  //   const contents = await fs.readFile(file, 'utf8')
  //   console.log(contents)

  console.log("despues mmat");
  //renderList(listado);

  return true;
}
async function getMmaData(listado) {
  //const test = await listado.forEach(async (camion, index) => {
  const test = await Promise.allSettled(
    listado.map(async (camion, index) => {
      if (!camion[FIELD.ARRIVED] || !camion[FIELD.LOGGED]) {
        let vrid = camion[FIELD.VRID];

        let data = await fetchMmatTruckStopsData(camion[FIELD.VRID]);
        //console.log(ele[VRID],data[SITE.name])
        data.forEach((ele) => {
          if (
            ele.timelineEvent.title === SITE.name &&
            ele.timelineEvent.stopActions[0].events.length > 0
          ) {
            //console.log(vrid,ele.timelineEvent.stopActions[0].events)
            let events = ele.timelineEvent.stopActions[0].events;
            events.forEach((e) => {
              if (e.localizableDescription.enumValue === "CHECKED_IN") {
                if (
                  e.eventSource === "YMS" &&
                  listado[index][FIELD.LOGGED] === false
                ) {
                  console.log(index);
                  console.log(listado[index]);
                  listado[index][FIELD.LOGGED] = true;
                  //listado[index][FIELD.ARRIVED] = true;
                  saveLocalStorage("listadoCamiones", listado);
                  console.log(listado[index]);
                  writeNotiHistory(
                    `Camion ${vrid} metido en el sistema a las ${new Date(
                      e.timeAndFacilityTimeZone.instant
                    )}`
                  );
                  console.log(
                    `Camion ${vrid} metido en el sistema a las ${new Date(
                      e.timeAndFacilityTimeZone.instant
                    )}`
                  );

                  //console.log(vrid, e, new Date(e.timeAndFacilityTimeZone.instant));
                }
                if (
                  e.eventSource === "MOBILE_GEOFENCED" &&
                  listado[index][FIELD.ARRIVED] === false
                ) {
                  listado[index][FIELD.ARRIVED] = true;
                  saveLocalStorage("listadoCamiones", listado);

                  console.log(camion);
                  sendNotification(camion);
                  if ((listado[index][FIELD.LOGGED] = false)) {
                    // sendNotification(camion);
                  }
                  writeNotiHistory(
                    `Camion ${vrid} marca llegada a las ${new Date(
                      e.timeAndFacilityTimeZone.instant
                    )}`
                  );
                  console.log(
                    `Camion ${vrid} marca llegada a las ${new Date(
                      e.timeAndFacilityTimeZone.instant
                    )}`
                  );
                }
              }
            });
            //[0].timelineEvent.title
            //timelineEvent.stopActions[0].events
          }
        });
      }
    })
  );
  return test;
}
// borra el local storage y carga listado desde el sesame
async function deleteTrucks(e) {
  let listado = await getLocalStorage("listadoCamiones");
  const listTrackDraws = document.querySelectorAll(".drawTruck");
  let newListado;
  const checkBoxes = document.querySelectorAll("input");
  checkBoxes.forEach((ele) => {
    if (ele.checked) {
      let vridToDelete = ele.parentElement.parentElement.getAttribute("VRID");
      if (document.getElementById(vridToDelete)) {
        document.getElementById(vridToDelete).remove();
      }

      listado.forEach((ele, index) => {
        if (ele[FIELD.VRID] == vridToDelete) {
          console.log(listado[index]);
          listado.splice(index, 1);
        }
      });
    }
  });
  saveLocalStorage("listadoCamiones", listado);
  renderList(listado);
}
async function getSCCdata(listado) {
  console.log("inicio SSC data");
  const sccList = await fetchSscData();

  console.log("DATOS DE SSC**********************************");
  const waitForSCC = await sccList
    .filter((ele) => ele.length > 1)
    .forEach((ele) => {
      listado.forEach((e) => {
        // console.log(ele);
        //console.log(ele[0], e[FIELD.VRID]);

        if (e.includes(ele[0])) {
          console.log(`Vris encontrado ${ele[0]} con ${ele[6]} paquetes`);
          if (!e[FIELD.ARRIVED] && ele[2] === "In Yard") {
            // e[FIELD.ARRIVED] = true;
            // sendNotification(e);
          }
          e[FIELD.VOLUME] = ele[6];
          e[FIELD.EXPECTED] = ele[5];
        }
      });
    });
  saveLocalStorage("listadoCamiones", listado);
  return true;
}
async function testTruck() {
  let listado = await getLocalStorage("listadoCamiones");
  //const listadoToTest=listado.filter((ele)=>console.log(ele))
  //const stationCommandCenter=await fetchSscData()
  //7 arrr 8 lo
  for (let i = 1; i < listado.length; i++) {
    // listado[i][6]=false
    //  listado[i][7]=false
  }
  listado[0][7] = "Logged";
  let row = Math.floor(Math.random() * listado.length) + 1;
  let columns = Math.ceil(Math.random() * 2) + 5;
  console.log(row, columns);
  console.log(listado[row][columns]);
  //listado[ ][ ]=false

  listado[row][columns] = !listado[row][columns];
  console.table(listado);
  renderList(listado);
}
async function testfecth() {
  let listado = await checkLocalStorage();

  listado.forEach(async (ele) => {
    let v = ele[VRID];
    if (v !== "VRID") {
      let d = await fetchMmatTruckData(v);
      console.log(d);
    }
  });

  // let se= await fetch("https://sesamegateservice-eu-ext.amazon.com/listLoadsWithInYardDestinationMetadata", {
  //     "credentials": "omit",
  //     "headers": {
  //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
  //         "Accept": "application/json, text/plain, */*",
  //         "Accept-Language": "en-US,en;q=0.5",
  //         "Content-Type": "application/json;charset=utf-8",
  //         "x-amz-yardtech-sesame-sessionToken": "eyJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2NTAxNDAwODEsImlzcyI6IllNUy0xLjAiLCJjb250ZXh0Ijp7ImFjY291bnRJZCI6IkEyS0VORUw0VjM2WDg0IiwieWFyZCI6InlhcmQiLCJ1c2VyVHlwZSI6IndlYmFwcCIsInVzZXJOYW1lIjoiYW1tYWVzdHJAYW1hem9uLmNvbSIsInVzZXJJZCI6IkEzNk5DUVFEOEoyUjVIIiwidGVybWluYWxTb2Z0d2FyZU5hbWUiOiJHRU0ifSwiZXhwIjoxNjUwNzQ1MDAxLCJpYXQiOjE2NTAxNDAyMDF9.eWSNtF3yIQj45ga-H3YR_OK5RaX9A3hWvSTmlV37nXs",
  //         "Sec-Fetch-Dest": "empty",
  //         "Sec-Fetch-Mode": "cors",
  //         "Sec-Fetch-Site": "same-site"
  //     },
  //     "referrer": "https://trans-logistics-eu.amazon.com/",
  //     "body": "{\"buildingCode\":\"DQA2\",\"yardId\":\"amzn1.ydlr.yard.EU.d2b62273-28f4-95f8-9dc6-4891f7115472\",\"startTime\":1650053807,\"endTime\":1650226607,\"context\":{\"requester\":\"GEM\",\"login\":\"ammaestr@amazon.com\",\"accountId\":\"A2KENEL4V36X84\",\"customerId\":\"A36NCQQD8J2R5H\"}}",
  //     "method": "POST",
  //     "mode": "cors"
  // })
  // let se =await fetch("https://jwmjkz3dsd.execute-api.eu-west-1.amazonaws.com/call/getYardStateWithPendingMoves", {
  //     "credentials": "omit",
  //     "headers": {
  //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
  //         "Accept": "application/json, text/plain, */*",
  //         "Accept-Language": "en-US,en;q=0.5",
  //         "api": "getYardStateWithPendingMoves",
  //         "method": "POST",
  //         "token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJZTVMtMS4wIiwiY29udGV4dCI6eyJhY2NvdW50SWQiOiJBMktFTkVMNFYzNlg4NCIsInlhcmQiOiJEUUEyIiwidXNlclR5cGUiOiJ3ZWJhcHAiLCJ1c2VyTmFtZSI6ImFtbWFlc3RyQGFtYXpvbi5jb20iLCJ1c2VySWQiOiJBMzZOQ1FRRDhKMlI1SCIsInRlcm1pbmFsU29mdHdhcmVOYW1lIjoid2ViYXBwIn0sIm5iZiI6MTY1MDE0MTgyMiwiZXhwIjoxNjUwNzQ2NzQyLCJpYXQiOjE2NTAxNDE5NDJ9.FgRtB2xv7rShEZbRjRf6QcKWaHoSflCLHO1QoiE_Hts",
  //         "Content-Type": "application/json;charset=utf-8",
  //         "Sec-Fetch-Dest": "empty",
  //         "Sec-Fetch-Mode": "cors",
  //         "Sec-Fetch-Site": "cross-site"
  //     },
  //     "referrer": "https://trans-logistics-eu.amazon.com/",
  //     "body": "{\"requester\":{\"system\":\"YMSWebApp\"}}",
  //     "method": "POST",
  //     "mode": "cors"
  // })
  // .then((response) => response.json())
  // .then((data) => {console.log(data);return  data})
  //https://trans-logistics-eu.amazon.com/fmc/api/v2/execution/load/112V2DT4F/mapFeature/stops
}
export function truckData(lista, vrid, field, value) {
  let index = lista.findIndex((ele) => ele[FIELD.VRID] === vrid);
  if (index !== -1) {
    lista[index][field] = value;
  }
  return lista;
}

function handleStartButton(e) {
  start();
  if (e.target.checked) {
    handleStartButton.start = setInterval(start, 120000);
  } else {
    console.log("STOP");
    clearInterval(handleStartButton.start);
  }
}
async function start() {
  console.log("Empezando", new Date().toTimeString());

  await testArrive();
  await testYard();
  renderList(getLocalStorage("listadoCamiones"));

  console.log("Fin", new Date().toTimeString());
}

// sso()
// async function sso(){
//   const data=await fetch("https://jwmjkz3dsd.execute-api.eu-west-1.amazonaws.com/call/getYardStateWithPendingMoves", {
//     "credentials": "omit",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
//         "Accept": "application/json, text/plain, */*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "api": "getYardStateWithPendingMoves",
//         "method": "POST",

//         "token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJZTVMtMS4wIiwiY29udGV4dCI6eyJhY2NvdW50SWQiOiJBMktFTkVMNFYzNlg4NCIsInlhcmQiOiJEUUEyIiwidXNlclR5cGUiOiJ3ZWJhcHAiLCJ1c2VyTmFtZSI6ImFtbWFlc3RyQGFtYXpvbi5jb20iLCJ1c2VySWQiOiJBMzZOQ1FRRDhKMlI1SCIsInRlcm1pbmFsU29mdHdhcmVOYW1lIjoid2ViYXBwIn0sIm5iZiI6MTY1Mjc0NzAwMSwiZXhwIjoxNjUzMzUxOTIxLCJpYXQiOjE2NTI3NDcxMjF9.ho4yfqUmXYxDxHPQgaAYQc-t5Mh0JcojtyLJ_WBBmbM",

//         "Content-Type": "application/json;charset=utf-8",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "cross-site"
//     },
//     "referrer": "https://trans-logistics-eu.amazon.com/",
//     "body": "{\"requester\":{\"system\":\"YMSWebApp\"}}",
//     "method": "POST",
//     "mode": "cors"
// }).then((response) => response.json()).then(data=>console.log(data))
// }
