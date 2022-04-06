///<reference path="station-details/station-details.component.ts"/>
///<reference path="station-list/station-list.component.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StationListComponent } from './station-list/station-list.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";

import {StationDetailsComponent} from "./station-details/station-details.component";



@NgModule({
  declarations: [
    AppComponent,
    StationListComponent,
    StationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
