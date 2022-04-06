import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StationListComponent} from "./station-list/station-list.component";
import {StationDetailsComponent} from "./station-details/station-details.component";
import {AddstationComponent} from "./addstation/addstation.component";



const routes: Routes =
  [{path: 'stations', component: StationListComponent },
   {path: 'stations/:id', component: StationDetailsComponent},
    {path: 'stations/addstation', component: AddstationComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
