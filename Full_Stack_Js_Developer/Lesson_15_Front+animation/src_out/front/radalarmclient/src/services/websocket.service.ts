import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public ws = new WebSocket('ws://localhost:3000');

  constructor() {
    this.ws.onopen = () => console.log('ONLINE');
    this.ws.onclose = () => console.log('DISCONNECTED');
    this.ws.onmessage = (event) => console.log(event.data);
  }
}


export const MessageTypes = {
  MetricLastValue: 'Metric Last Value',
  CreateStation: 'Create Station'
}
