import {animate, state, style, transition, trigger} from "@angular/animations";

export const flyIn = trigger('flyIn',[
  state('in', style({transform: 'translateX(0)', height:'50px'})),
  transition(':enter',[
    style({backgroundColor:'#dddddd', transform: 'translateX(-100px)'}),
    animate('2s 100ms ease-out')
  ])
])
