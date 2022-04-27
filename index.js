// Retrieve info from sesamegate
// async function fetchSesameData() {
//   let listado = await fetch("http://localhost:3001/sesame")
//     .then((response) => response.json())
//     .then((data) => {

import { refineArray } from "./src/arrayAux.js";
import { renderList, testTime, testTruckAnimation } from "./src/renderList.js";
import {
  fetchMmatTruckData,
  fetchMmatTruckStopsData,
  fetchSesameData,
  fetchSscData,
  fetchYardData,
} from "./src/sesameGate.js";
import { sendNotification } from "./src/noti.js";
import { testMap } from "./src/maps.js";

//listado de constantes que definen la posicion en el array
const SITE = {
  latitude: 36.69600329644401,
  longitude: -4.477451896032319,
  name: "DQA2",
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

export async function getLocalStorage() {
  //localStorage.clear()
  if (!localStorage.listadoCamiones) {
    console.log("listado vacio");
    listado = await fetchSesameData();
    console.log(listado);
    const listadoCamiones = refineArray(listado);
    localStorage.setItem("listadoCamiones", JSON.stringify(listadoCamiones));
    console.log(localStorage.listadoCamiones);
  } else {
    //console.log(localStorage.getItem("listadoCamiones"));
    listado = JSON.parse(localStorage.getItem("listadoCamiones"));
    return listado;
  }
}
export function saveLocalStorage(array) {
  if (Array.isArray(array)) {
    localStorage.setItem("listadoCamiones", JSON.stringify(array));
    //    console.log(localStorage.listadoCamiones);
  }
}
async function handleRefreshSesameButton() {
  document.getElementById("tableContainer").classList.add("loader");
  let oldList = await getLocalStorage();

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
  saveLocalStorage(oldList);
  renderList(oldList);

  document.getElementById("tableContainer").classList.remove("loader");
  //let newLista=[...oldList,...newLista,]
}
function setListeners() {
  document
    .getElementById("refreshSesame")
    .addEventListener("click", () => handleRefreshSesameButton());

  document
    .getElementById("render")
    .addEventListener("click", () =>
      renderList(JSON.parse(localStorage.getItem("listadoCamiones")))
    );
  document.getElementById("test").addEventListener("click", () => testTruck());
  document
    .getElementById("deleteTruck")
    .addEventListener("click", (e) => deleteTrucks(e));

  document
    .getElementById("testArrived")
    .addEventListener("click", (e) => testArrive(e));
  document
    .getElementById("testYard")
    .addEventListener("click", (e) => testYard(e));
  document
    .getElementById("testNotification")
    .addEventListener("click", (e) => sendNotification(e));

  document
    .getElementById("testSCC")
    .addEventListener("click", (e) => fetchSscData(e));
  document
    .getElementById("clear")
    .addEventListener("click", (e) => localStorage.clear());

  document
    .getElementById("testTruckAnimation")
    .addEventListener("click", (e) => testTruckAnimation(3, 1, e));
  document
    .getElementById("testTime")
    .addEventListener("click", (e) => testTime());
    document
    .getElementById("testMap")
    .addEventListener("click", (e) => testMap());

  //testSCC;
  //testTruckAnimation
  //testYard
}
async function testYard() {
  //truckData("113NSNYB4", FIELD.DOCK, "IBO 01");
  let data = await fetchYardData();
  //console.log(data);
  let listado = await getLocalStorage();
  data.forEach((dock) => {
    //console.log(dock)
    if (dock.yardAssets.length > 0) {
      console.log(dock);
      let dockCode = dock.code;
      dock.yardAssets.forEach((dock) => {
        if (dock.load.identifiers[0] !== null) {
          console.log(dock.load.identifiers[0].identifier);
          listado = truckData(
            listado,
            dock.load.identifiers[0].identifier,
            FIELD.DOCK,
            dockCode
          );
        }
      });
      //console.log(dock.code,dock.yardAssets[0].load.identifiers[0].identifier)
      //console.log(dock.code,dock.yardAssets)[1].load.identifiers[0].identifier
    }
  });
  saveLocalStorage(listado);
  renderList(listado)
}
async function testArrive() {
  // let test = [
  //   "7:00:00 AM",
  //   "7:00:00 AM",
  //   "2022-04-21",
  //   "Dropoff",
  //   "114BFJQXK",
  //   "MAD6->DQA2",
  //   "ATSOutbound",
  //   "-",
  //   false,
  //   false,
  //   "-",
  // ];
  let listado = await getLocalStorage();
  // listado.push(test);
  saveLocalStorage(listado);
  // listado.forEach(async (ele)=>{
  //   if(!ele[ARRIVED]){
  //     console.log(ele[VRID])

  //      let data = await fetchMmatTruckData(ele[VRID])
  //      console.log(ele[VRID],data)

  //   }
  // })
  const sccList = await fetchSscData();
  //console.log(sccList);
  //'115H7Y9HP', 'MAD4', 'In Yard', 'IB08', '08:15', '07:15', '1271', 'View'
  //console.log(sccList.filter((ele) => ele.length > 1));
  sccList
    .filter((ele) => ele.length > 1)
    .forEach((ele) => {
      listado.forEach((e) => {
        // console.log(ele);
        console.log(ele[0], e[FIELD.VRID]);

        if (e.includes(ele[0])) {
          console.log(`Vris encontrado ${ele[0]} con ${ele[6]} paquetes`);
          if (!e[FIELD.ARRIVED] && ele[2] === "In Yard") {
            e[FIELD.ARRIVED] = true;
            sendNotification(e);
          }
          e[FIELD.VOLUME] = ele[6];
          e[FIELD.EXPECTED] = ele[5];
        }
      });
    });

  listado.forEach(async (camion) => {
    if (!camion[FIELD.ARRIVED] || !camion[FIELD.LOGGED]) {
      let vrid = camion[FIELD.VRID];

      let data = await fetchMmatTruckStopsData(camion[FIELD.VRID]);
      //console.log(ele[VRID],data[SITE.name])
      data.forEach((ele) => {
        console.log(ele.timelineEvent.title);
        if (
          ele.timelineEvent.title === SITE.name &&
          ele.timelineEvent.stopActions[0].events > 0
        ) {
          //console.log(vrid,ele.timelineEvent.stopActions[0].events)
          let events = ele.timelineEvent.stopActions[0].events;
          events.forEach((e) => {
            if (e.localizableDescription.enumValue === "CHECKED_IN") {
              if (e.eventSource === "YMS") {
                camion[FIELD.LOGGED] = true;
                camion[FIELD.ARRIVED] = true;
                console.log(
                  `Camion ${vrid} metido en el sistema a las ${new Date(
                    e.timeAndFacilityTimeZone.instant
                  )}`
                );

                //console.log(vrid, e, new Date(e.timeAndFacilityTimeZone.instant));
              }
              if (e.eventSource === "MOBILE_GEOFENCED") {
                camion[FIELD.ARRIVED] = true;
                sendNotification(camion);
                console.log(camion);
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
    saveLocalStorage(listado);
    renderList(listado);
  });
}

// borra el local storage y carga listado desde el sesame
async function deleteTrucks(e) {
  let listado = await getLocalStorage();
  let newListado;
  const checkBoxes = document.querySelectorAll("input");
  checkBoxes.forEach((ele) => {
    if (ele.checked) {
      let vridToDelete = ele.parentElement.parentElement.getAttribute("VRID");

      listado.forEach((ele, index) => {
        if (ele[FIELD.VRID] == vridToDelete) {
          console.log(listado[index]);
          listado.splice(index, 1);
        }
      });
    }
  });
  saveLocalStorage(listado);
  renderList(listado);
}
async function getSCCdata() {}
async function testTruck() {
  let listado = await getLocalStorage();
  //const listadoToTest=listado.filter((ele)=>console.log(ele))
  //const stationCommandCenter=await fetchSscData()
  //7 arrr 8 lo
for (let i = 1; i < listado.length; i++) {
  // listado[i][6]=false
  //  listado[i][7]=false
}
listado[0][7]="Logged"
let row=Math.floor(Math.random()*listado.length)+1
let columns=Math.ceil(Math.random() *2)+5
console.log(row,columns)
console.log(listado[row][columns])
//listado[ ][ ]=false
  
listado[row][columns]=!listado[row][columns]
console.table(listado)
  renderList(listado)
   

 
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
