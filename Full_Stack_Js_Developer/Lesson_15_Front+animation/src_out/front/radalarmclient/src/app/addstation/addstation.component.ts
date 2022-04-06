import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {StationService} from "../../services/station.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Station} from "../../entities/station";


@Component({
  selector: 'app-addstation',
  templateUrl: './addstation.component.html',
  styleUrls: ['./addstation.component.css']
})
export class AddstationComponent implements OnInit {

  stationForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    status: new FormControl(true)
  });

  constructor(private stationService: StationService){}




  onSubmit() {
    this.stationService.addStation(this.stationForm.value).subscribe(st => alert(st))
  }

  ngOnInit(): void {
  }
}
