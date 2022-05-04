import { FIELD, getLocalStorage, saveLocalStorage } from "../index.js";

export function sendNotification(ele) {
  //console.log(ele);
  let vrid = ele[FIELD.VRID];
  let asunto = "carga";
  if (ele[FIELD.ACTION] === "Dropoff") {
    asunto = "descarga";
  }

  if (Notification.permission !== "granted") {
    askFroNoti();
  }
  let claxon = new Audio("./src/sounds/claxon3.mp3");
  claxon.play();

  var img = "./src/imgs/truck-noti.jpg";
  let ico = "./src/imgs/peccy.jpg";

  let title = "Truck";
  var text = `Llega camion de ${asunto} VRID:${vrid}`;
  var notification = new Notification("Truck Arrived", {
    body: text,
    image: img,
    icon: ico,
    requireInteraction: true,
    silent: true,
  });
  notification.addEventListener("show", () => console.log("dededededede"));
}
function askFroNoti() {
  {
    Notification.requestPermission().then(function (result) {
      console.log(result);
    });
  }
}

export async function writeNotiHistory(noti = "") {
  let list = await getLocalStorage("notificationsHistory");
  if (!list) {
    list = [];
  }
  const container = document.getElementById("notificationHistory");
  if (container.childElementCount === 0) {
    for (let i = list.length - 1; i >= 0; i--) {
      let newP = document.createElement("p");
      newP.innerText = list[i];
      newP.classList.add("historicNoti");
      container.appendChild(newP);
    }
  }
  if (noti.length > 0) {
    list.push(noti);
    saveLocalStorage("notificationsHistory", list);
    let newP = document.createElement("p");
    newP.innerText = list[list.length - 1];
    newP.classList.add("historicNoti");
    container.prepend(newP);
  }
}
