import {Component, Input, OnInit} from '@angular/core';

import {Station} from "../../entities/station";
import {Observable} from "rxjs";
import {StationService} from "../../services/station.service";
import {WebsocketService, MessageTypes} from "../../services/websocket.service";
import {flyIn} from "./station-list-animation";

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css'],
  animations:[flyIn]
})
export class StationListComponent implements OnInit {

  stations: Station[] = [];
  value: number = 0;

  constructor(private stationService: StationService,
              private websocketService: WebsocketService) {
  }

  setValueStation(station_id: number, value: number) {
    var st = this.stations.find(s => s.id == station_id)
    if (st) {
      st.value = value;
    }
  }

  setStation(address: string, status: boolean, id: number) {
    this.stations.push({
      address,
      status,
      id
    });
  }

  ngOnInit(): void {
    this.websocketService.ws.onmessage = response => {
      var message = JSON.parse(response.data)
      if (message.type == MessageTypes.MetricLastValue){
        this.setValueStation(message.payload.station_id, message.payload.value)
      }
      if (message.type == MessageTypes.CreateStation){
        this.setStation(message.payload.status, message.payload.address, message.payload.id)
      }
    };




    this.stationService.getStations().subscribe(st => {
      this.stations = st;
      this.stationService.getLatestValues().subscribe((vl: any[]) => {
        vl.forEach(val => {
          this.setValueStation(val.station_id, val.value);
        })
      })
    });

  }
}
