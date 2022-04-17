export function refineArray(listado) {
  // 1: (9) ['Time', 'Carrier', 'Reason', 'VRID/ISA #', 'Lane', 'Account', 'Planned Location', 'Comment (optional)', 'Action']
  // 2: (8) ['9:15:00 AM', '2022-04-15', 'DUMMY', 'Pickup', 'Scheduled', '1123CMS8F', 'DQA2->AMZL-EQA2-ND', 'ATSVirtualTruck']

  //listado.splice(0,1) //retirar al refrescar datos
  listado = deleteColumn(listado, 2);
  listado = deleteColumn(listado, 3);

  listado[0].splice(5, 1);
  console.log(listado.length); //10
  console.log(listado[1].length); //11

  listado[0][0]="Time"
  listado[0][1]="Date"
  listado[0][2]="Action"
  listado[0][3]="VRID"
  listado[0][4]="Lane"
  listado[0][5]="Reason"
  //refine Lane
  listado.forEach(ele => {
    ele[4]=ele[4].replace("AMZL-","")
    ele[4]=ele[4].replace("-ND","")

    console.log(ele[4])
    
  });

  // se añaden columnas para "arrived""logged"y dock
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
  console.log("array",array.length)
  console.log("array[]",array[0].length)
  console.log("col=",col );
  console.log(array)
  array[0].splice(col, 1, header);
  for (let i = 1; i < array.length; i++) {
    array[i].splice(col, 1, defecto);
  }
  console.log(array);
}
export    function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}