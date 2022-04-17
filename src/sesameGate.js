//https://trans-logistics-eu.amazon.com/fmc/api/v2/execution/load/115T7ZQ13/




export async function fetchSesameData() {
    let listado = await fetch("http://localhost:3001/sesame")
                                
      .then((response) => response.json())
      .then((data) => {
          
          let listado=data
          console.log(listado)
          return listado
        
      })
      .catch((error) => console.log("No se ha podido acceder a Sesame Gate", error));
      return listado
  }
  export async function fetchSscData() {
     let scc=await fetch("http://localhost:3001/scc")
                                
                                
      .then((response) => response.json())
      .then((data) => {
          
          let scc=data
          console.log(scc)
          return scc
        
      })
      .catch((error) => console.log("No se ha podido acceder a SSC", error));
      return scc
  }
  export async function fetchMmatTruckData(vrid) {
   let data =await fetch("http://localhost:3001/truckData/"+vrid)
                               
                               
     .then((response) => response.json())
     .then((data) => {
         
         return data
       
     })
     .catch((error) => console.log("No se ha podido acceder a SSC", error));
     
     return data
 }
 export async function checkArrive(vrid) {
    let data =await fetch("http://localhost:3001/truckData/"+vrid)
                                
                                
      .then((response) => response.json())
      .then((data) => {
          
          return data
        
      })
      .catch((error) => console.log("No se ha podido acceder a SSC", error));
      console.log(data)
      return data
  }