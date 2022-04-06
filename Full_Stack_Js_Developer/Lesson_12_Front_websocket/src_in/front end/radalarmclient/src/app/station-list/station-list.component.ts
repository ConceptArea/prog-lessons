import {Component, Input, OnInit} from '@angular/core';

import {Station} from "../../entities/station";
import {Observable} from "rxjs";
import {StationService} from "../../services/station.service";

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  stations?: Station[];

  constructor(private stationService:StationService) { }

  ngOnInit(): void {
    this.stationService.getStations().subscribe(st => {
      this.stations = st;
    })
  }

}
