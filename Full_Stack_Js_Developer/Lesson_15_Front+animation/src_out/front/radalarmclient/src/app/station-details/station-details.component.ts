import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {StationService} from "../../services/station.service";
import {Station} from "../../entities/station";
import {Metric} from "../../entities/metric";
import {flyIn} from "../station-list/station-list-animation";

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css',
  ],
  animations:[flyIn]
})
export class StationDetailsComponent implements OnInit {

  station?: Station;
  metrics: Metric [] = [];
  id: number = 0;
  value: any;

  constructor(private stationService:StationService, private route:ActivatedRoute) {  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

      this.stationService.getStation(this.id).subscribe((st?: Station) => {
        this.station = st;
      });

      this.stationService.getMetrics(this.id).subscribe((mt: Metric[]) => {
        this.metrics = mt;
      })
    })
  }
}
