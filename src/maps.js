













export async  function testMap(){

    var myIcon = L.icon({
        iconUrl: './src/imgs/amazonTruckFijo.jpg',
        iconSize: [ 30,10],
        iconAnchor: [30, 10],
        popupAnchor: [-3, -76]
        
    });
    
    var map = L.map('map').setView([36.69602184585762, -4.477389731532122], 13);
    let a=L.marker([36.703, -4.4747], {icon: myIcon})
    a.addTo(map);
    //L.marker([36.703, -4.4747]).addTo(map);
    // L.tileLayer('https://tile.openstreetmap.org/${z}/${x}/${y}.png').addTo(map);}
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
maxZoom: 18
}).addTo(map);}