import * as $ from 'jquery'

$(document).ready(() => {
    $("#refreshStations").click(()=>{
        $.get('http://192.168.42.172:8082/stations', (data) => {
            $("tbody#stationsTable").empty();
            $("#detailStation").hide();
            data.map((station) => {
                const style = +station.status ? 'active' : null;

                const tr = $(`<tr id=${station.id} class="${style}"/>`);
                if (station.status) {
                    tr.click((e) => {
                        $.get('http://192.168.42.172:8082/stations/' + station.id, (data) => {
                            fillStationDetails(data);
                        })
                    })
                }
                tr.append(`<td>${station.id}</td>`);
                tr.append(`<td>${station.address}</td>`);
                tr.append(`<td>${station.status}</td>`);
                $("tbody#stationsTable").append(tr);
            })
        })
    });
})

function fillStationDetails(data) {
    $("#detailStation").show();
    $("#stationId").text(`Station ${data.id}`);
    $("#temperature").text(data.temperature);
    $("#dose_rate").text(data.radiation.toFixed(3));
}
