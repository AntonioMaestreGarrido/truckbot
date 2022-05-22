import { fetchMmatTruckData } from "./sesameGate.js";

export async function createModal(e) {
  let vrid;
  if (e.target.parentElement.getAttribute("VRID") === null) {
    return;
  }
  vrid = e.target.parentElement.getAttribute("VRID");

  
  const modal = document.getElementById("modalInfo");
  resetModal(modal)
  modal.style.display = "block";
  modal.setAttribute("vrid", vrid);
  modal.querySelector("#modalVRID").textContent = `VRID: ${vrid}`;
  let datos = await fetchMmatTruckData(vrid);
  modal.querySelector("#modalEmpresa").textContent = `Carrier: ${datos.carrier}`;
  modal.querySelector("#modalAcount").textContent = `${datos.shipperAccounts[0]}`;
  modal.querySelector("#modalRuta").textContent = `${datos.route}`;
  
  
  console.log(datos)
  console.log(vrid);
}
function getVridFromModal() {
  if (document.getElementById("modalInfo").getAttribute("VRID") === null) {
    return;
  }
  return document.getElementById("modalInfo").getAttribute("VRID");
}
export function setListenerModal() {
  const modal = document.getElementById("modalInfo");

  modal
    .querySelector("#closeModal")
    .addEventListener("click", (e, vrid) => (modal.style.display = "none"));
  modal
    .querySelector("button.fmc")
    .addEventListener("click", (e, vrid) =>
      window.open(
        `https://trans-logistics-eu.amazon.com/fmc/execution/search/${getVridFromModal()}`
      )
    );
  modal.querySelector("button.map").addEventListener("click", (e) => {
    window.open(
      `https://trans-logistics-eu.amazon.com/fmc/map?loadType=VRID&loadId=${getVridFromModal()}`
    );
  });

  modal
    .querySelector("button.yard")
    .addEventListener("click", (e, vrid) =>
      window.open(
        "https://trans-logistics-eu.amazon.com/yms/shipclerk/#/yard?availability=false"
      )
    );
  modal
    .querySelector("button.yardEvents")
    .addEventListener("click", (e, vrid) =>
      window.open(
        `https://trans-logistics-eu.amazon.com/yms/eventHistory#/eventReport?yard=DQA2&fromDate=1651960800000&toDate=1653256799999&loadIdentifier=${getVridFromModal()}`
      )
    );
  modal
    .querySelector("button.gate")
    .addEventListener("click", (e) =>
      window.open(
        "https://trans-logistics-eu.amazon.com/yms/sesameGateConsole#/entry"
      )
    );

  modal
    .querySelector("button.test")
    .addEventListener("click", (e) => console.log(getVridFromModal()));
}
function resetModal(modal){
    
  
  modal.querySelector("#modalEmpresa").textContent = `Carrier: `;
  modal.querySelector("#modalAcount").textContent = `Account:`;
  modal.querySelector("#modalRuta").textContent = `Route:`;

}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
