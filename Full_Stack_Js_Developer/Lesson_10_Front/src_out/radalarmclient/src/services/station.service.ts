import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Station} from "../entities/station";
import {Metric} from "../entities/metric";

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) {
  }

  public getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(`http://127.0.0.1:8087/stations`)
  }

  public getStation(stationId: number): Observable<Station> {
    return this.http.get<Station>(`http://127.0.0.1:8087/stations/${stationId}`)
  }

  public getMetrics(stationId: number): Observable<Metric[]> {
    return this.http.get<Metric[]>(`http://127.0.0.1:8087/stations/${stationId}/metrics`)
  }


}


