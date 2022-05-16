import { getLocalStorage } from "../index.js";

export function refineArray(listado) {
  // 1: (9) ['Time', 'Carrier', 'Reason', 'VRID/ISA #', 'Lane', 'Account', 'Planned Location', 'Comment (optional)', 'Action']
  // 2: (8) ['9:15:00 AM', '2022-04-15', 'DUMMY', 'Pickup', 'Scheduled', '1123CMS8F', 'DQA2->AMZL-EQA2-ND', 'ATSVirtualTruck']

  //listado.splice(0,1) //retirar al refrescar datos
  listado = deleteColumn(listado, 2);
  listado = deleteColumn(listado, 3);

  listado[0].splice(5, 1);
  console.log(listado.length); //10
  console.log(listado[1].length); //11

  listado[0][0] = "Time"
  listado[0][1] = "Date"
  listado[0][2] = "Action"
  listado[0][3] = "VRID"
  listado[0][4] = "Lane"
  listado[0][5] = "Reason"
  //refine Lane
  listado.forEach(ele => {
    ele[4] = ele[4].replace("AMZL-", "")
    ele[4] = ele[4].replace("-ND", "")

    console.log(ele[4])

  });
  //cambia hora por date
  listado.forEach(ele => {
    if (ele[0] != "Time") {
      ele[0] = new Date(getEpoch(ele))


      console.log(ele[4])
    }
  });

  // se añaden columnas para "arrived""logged"y dock
  addColumn(listado, 1, "Actual", "-");
  addColumn(listado, undefined, "Volume", "-");
  addColumn(listado, undefined, "Arrived", false);
  addColumn(listado, undefined, "Logged", false);
  addColumn(listado, undefined, "Dock", "-");

  return listado;
}

export function deleteColumn(array = [[]], col) {
  console.log("before", array);

  for (let j = 0; j < array.length; j++) {
    array[j].splice(col, 1);

    //console.log(array[j][2])
  }
  console.log("afeter", array);
  return array;
}
export function addColumn(
  array = [[]],
  col = array[0].length,
  header,
  defecto
) {
  console.log("array", array.length)
  console.log("array[]", array[0].length)
  console.log("col=", col);
  console.log(array)
  array[0].splice(col, 0, header);
  for (let i = 1; i < array.length; i++) {
    array[i].splice(col, 0, defecto);
  }
  console.log(array);
}
export function arrayRemove(arr, value) {

  return arr.filter(function (ele) {
    return ele != value;
  });
}
export function getEpoch(ele) {
  console.log(ele)

  let dt = ele[1].split("-")

  let horaArray = ele[0].split(/:| /)
  if (horaArray[3] === "PM") { horaArray[0] = parseInt(parseInt(horaArray[0]) + 12) }




  let d = new Date(dt[0], parseInt(dt[1]) - 1, dt[2], horaArray[0], horaArray[1])


  return d

}
// devuelve el numero de columna en un array a partir de la clave
export async function getCoulmnNum(key) {
  const listado = await getLocalStorage("listadoCamiones")

  return listado.indexOf(key)
}
 export function truckListaFiltered() {

  let listado =  getLocalStorage("listadoCamiones");
  const listTrackDraws = document.querySelectorAll(".drawTruck");
  let newListado=[];
  const checkBoxes = document.querySelectorAll("input");
  checkBoxes.forEach((ele) => {
    if (ele.checked) {
      console.log(ele.getAttribute("row"))
      newListado.push ( listado[parseInt( ele.getAttribute("row"))])



    }
  });
  if (newListado.length === 0) { return listado } else {
    return  newListado
  }

 }