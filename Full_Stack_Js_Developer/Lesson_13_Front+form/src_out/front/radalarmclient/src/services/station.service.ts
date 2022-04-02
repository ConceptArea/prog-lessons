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
    return this.http.get<Station[]>(`http://127.0.0.1:8086/stations`)
  }

  public getStation(stationId: number): Observable<Station> {
    return this.http.get<Station>(`http://127.0.0.1:8086/stations/${stationId}`)
  }

  public getMetrics(stationId: number): Observable<Metric[]> {
    return this.http.get<Metric[]>(`http://127.0.0.1:8086/stations/${stationId}/metrics`)
  }

  public getLatestValues(): Observable<any[]> {
    return this.http.get<any[]>(`http://127.0.0.1:8086/metrics/latest`)
  }

  public addStation(body: Station): Observable<Station> {
    return this.http.post<Station>('http://127.0.0.1:8086/stations', body)
  }

}


