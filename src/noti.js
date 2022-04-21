import { FIELD } from "../index.js";

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
