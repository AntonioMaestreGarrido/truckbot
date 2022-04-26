













export async  function testMap(){
    let link="https://es.wikipedia.org/wiki/Wikipedia:Portada"
    let text=await fetch(link)
    console.log(text)
    }