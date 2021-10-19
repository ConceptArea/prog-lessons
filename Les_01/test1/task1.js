let jso ='[{"id":"0","addres":"690 Collins Avenue. Worthington","status":"0"},{"id":"1","addres":"2681 Doctors Drive. Santa Monica","status":"1"},{"id":"2","addres":"2582 Kidd Avenue. Huslia","status":"1"},{"id":"3","addres":"2199 Lake Road. Absecon","status":"0"},{"id":"4","addres":"874 Philli Lane. Van Buren","status":"1"},{"id":"5","addres":"2401 Ingram Street. Dayton","status":"0"},{"id":"6","addres":"1481 Pinewood Avenue. Marquette","status":"1"},{"id":"7","addres":"1218 Cabell Avenue. Reston","status":"1"},{"id":"8","addres":"3971 Romano Street. Needham","status":"0"}]';
let jsonIn = prompt('Enter JSON');
let stations = JSON.parse(jsonIn);

let hasActiveStations = false

for(let i = 0; i < stations.length; i++){
    let status;
    if(+stations[i].status){
       status = 'active'
        hasActiveStations = true
    } else {
        status = 'stopped'
    }
    console.log(`Stations №${stations[i].id} is ${status }`)
}

if(!hasActiveStations){
    alert('NO ACTIVE STATION')
}