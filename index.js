// Retrieve info from sesamegate
// async function fetchSesameData() {
//   let listado = await fetch("http://localhost:3001/sesame")
//     .then((response) => response.json())
//     .then((data) => {

import { refineArray } from "./src/arrayAux.js";
import { renderList } from "./src/renderList.js";
import { fetchMmatTruckData, fetchMmatTruckStopsData, fetchSesameData, fetchSscData, fetchYardData } from "./src/sesameGate.js";


//listado de constantes que definen la posicion en el array
const SITE={"latitude":36.69600329644401,"longitude": -4.477451896032319,"name":"DQA2"}

const VRID = 3;
const ARRIVED = 6;
const CABECERA=["Time","Date","Action","VRID","Lane","Reason","Arrived","Logged","Dock"]

document.getElementById("tableContainer").style.cursor = "pointer"

let listado;
//localStorage.clear();
//checkLocalStorage();
setListeners();

export async function getLocalStorage() {
  if (!localStorage.listadoCamiones) {
    console.log("listado vacio");
    listado = await fetchSesameData();
    console.log(listado);
    const listadoCamiones = refineArray(listado);
    localStorage.setItem("listadoCamiones", JSON.stringify(listadoCamiones));
    console.log(localStorage.listadoCamiones);
  } else {
    listado = JSON.parse(localStorage.getItem("listadoCamiones"));
    return listado;
  }
}
function saveLocalStorage(array){
  localStorage.setItem("listadoCamiones", JSON.stringify(array));
    console.log(localStorage.listadoCamiones);

}
async function handleRefreshSesameButton() {
 document.getElementById("tableContainer").classList.add("loader")
  let oldList = await getLocalStorage();
  
  // fantastic oneliner to find keys in 2d arrays
  // console.log(oldList.some(row=>row.includes( "VRID")))

 
  let newLista = refineArray( await fetchSesameData())
  
  newLista.forEach(ele => {
    let vrid=ele[VRID]
    
    if(!oldList.some(row=>row.includes( vrid))){
      oldList.push(ele)
      console.log("se ha incluido "+vrid)
    }else{
      console.log("no se ha incluido:"+vrid)
    }
    
    
  });
  saveLocalStorage(oldList)
  renderList(oldList)
  
  document.getElementById("tableContainer").classList.remove("loader")
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
  document.getElementById("deleteTruck").addEventListener("click",(e)=>deleteTrucks(e))
  document.getElementById("testSort").addEventListener("click",(e)=>sortListado(e))
  document.getElementById("testArrived").addEventListener("click",(e)=>testArrive(e))
  document.getElementById("testYard").addEventListener("click",(e)=>testYard(e))
  //testYard
  
  
}
async function testYard(){
  let data= await fetchYardData()
  console.log(data)
  let listado= await getLocalStorage()
  listado.forEach(ele => {
    let vrid=ele[VRID]
    data.forEach((ele)=>{
      if(ele.includes(vrid)){
        console.log(vrid,ele)
      }
    })
    
  });
}
async function testArrive(){
  let listado = await getLocalStorage()
  // listado.forEach(async (ele)=>{
  //   if(!ele[ARRIVED]){
  //     console.log(ele[VRID])
      
  //      let data = await fetchMmatTruckData(ele[VRID])
  //      console.log(ele[VRID],data)

  //   }
  // })
  listado.forEach(async (ele)=>{
    if(!ele[ARRIVED]){
      let vrid=ele[VRID]
      
       let data = await fetchMmatTruckStopsData(ele[VRID])
       //console.log(ele[VRID],data[SITE.name])
       data.forEach((ele)=>{
         if(ele.timelineEvent.title===SITE.name){
           //console.log(vrid,ele.timelineEvent.stopActions[0].events)
           let events=ele.timelineEvent.stopActions[0].events

           events.forEach(e=>{if(e.localizableDescription.enumValue==="CHECKED_IN"){
             
              console.log(vrid,e,new Date( e.timeAndFacilityTimeZone.instant))
           }})
         }
         //[0].timelineEvent.title
         //timelineEvent.stopActions[0].events
       })

    }
  })
}


// borra el local storage y carga listado desde el sesame
async function deleteTrucks(e){
  let listado= await getLocalStorage()
  let newListado
  const checkBoxes=document.querySelectorAll("input")
  checkBoxes.forEach(ele => {
    if(ele.checked){
      let vridToDelete=ele.parentElement.parentElement.getAttribute("VRID")
      
      listado.forEach((ele,index)=>{
        if(ele[VRID]==vridToDelete){
          console.log(listado[index])
          listado.splice(index,1)
        }})
      
  }});
  saveLocalStorage(listado)
  renderList(listado)
  
}
async function getSCCdata() {}
async function testTruck() {
  let listado = await getLocalStorage();
  //const listadoToTest=listado.filter((ele)=>console.log(ele))
  //const stationCommandCenter=await fetchSscData()
  listado[3][6] = true;
  console.log(listado);
  renderList(listado.filter((ele, i) => ele[ARRIVED] === false || i === 0));

  testfecth();
}
async function testfecth() {
 
  
let listado=await checkLocalStorage()

listado.forEach(async (ele) => {
  let v=ele[VRID]
  if (v!=="VRID"){
  let d = await  fetchMmatTruckData(v)
  console.log(d)}
  
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


