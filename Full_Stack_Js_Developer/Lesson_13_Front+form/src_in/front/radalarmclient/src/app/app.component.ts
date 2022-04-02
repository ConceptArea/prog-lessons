import { Component } from '@angular/core';
import {from, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'Radalarm Client';

  constructor( ){ }

  ngOnInit(): void {
  }

}
