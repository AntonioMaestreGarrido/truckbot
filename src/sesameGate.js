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
 export async function fetchMmatTruckStopsData(vrid) {
    let data =await fetch("http://localhost:3001/truckStopData/"+vrid)
                                
                                
      .then((response) => response.json())
      .then((data) => {
          
          return data
        
      })
      .catch((error) => console.log("No se ha podido acceder a SSC", error));
      
      return data
  }
  //http://localhost:3001/getYardInfo/

  export async function fetchYardData() {


    let scc=await fetch("http://localhost:3001/getYardInfo")
                               
                               
     .then((response) => response.json())
     .then((data) => {
         
         let scc=data
         console.log(scc)
         return scc
       
     })
     .catch((error) => console.log("No se ha podido acceder a SSC", error));
     
     return scc
 }
 export async function testets(){
    let a= await fetch("https://jwmjkz3dsd.execute-api.eu-west-1.amazonaws.com/call/getYardStateWithPendingMoves", {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "api": "getYardStateWithPendingMoves",
            "method": "POST",
            //"token": "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTE5OTgyNDYsInZpc2l0b3ItaWQiOiJmZWMwNTE0Ni1lY2U3LWVjZDUtNTZiZi02OGYxZTA2YjA2ZjciLCJpcCI6IjUyLjk0LjM2LjUifQ.yNwq3tchjajCZeyHVWNKv6Eg0g_W1umofm3vMhiutxs",
             "token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJZTVMtMS4wIiwiY29udGV4dCI6eyJhY2NvdW50SWQiOiJBMktFTkVMNFYzNlg4NCIsInlhcmQiOiJEUUEyIiwidXNlclR5cGUiOiJ3ZWJhcHAiLCJ1c2VyTmFtZSI6ImFtbWFlc3RyQGFtYXpvbi5jb20iLCJ1c2VySWQiOiJBMzZOQ1FRRDhKMlI1SCIsInRlcm1pbmFsU29mdHdhcmVOYW1lIjoid2ViYXBwIn0sIm5iZiI6MTY1MTk5NjAxMSwiZXhwIjoxNjUyNjAwOTMxLCJpYXQiOjE2NTE5OTYxMzF9.jrvktSQsxhRR3UXM-2diA_DEIN2iVfGCA6P0bSz1s-Q",
               
            "Content-Type": "application/json;charset=utf-8",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site"
        },
        "referrer": "https://trans-logistics-eu.amazon.com/",
        "body": "{\"requester\":{\"system\":\"YMSWebApp\"}}",
        "method": "POST",
        "mode": "cors"
    })
    .then((response) => response.json()).then(data=>console.log(data))
    console.log(JSON.parse(a))
    
 }