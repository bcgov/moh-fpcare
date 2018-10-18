import { trigger, style, animate, transition, keyframes } from '@angular/animations';

const TIMING = '250ms';


export const growVertical = trigger('growVertical', [
  transition('void => *', [
    animate(TIMING, keyframes([
      style({height: '0', overflow: 'hidden'}),
      style({height: '*', overflow: 'hidden'}),
    ]))
  ]),
  transition('* => void', [
    animate(TIMING, keyframes([
      style({height: '*', overflow: 'hidden'}),
      style({height: '0', overflow: 'hidden'}),
    ]))
  ])
])

export const growHorizontal = trigger('growHorizontal', [
  transition('void => *', [
    animate(TIMING, keyframes([
      style({width: '0', overflow: 'hidden'}),
      style({width: '*', overflow: 'hidden'}),
    ]))
  ]),
  transition('* => void', [
    animate(TIMING, keyframes([
      style({width: '*', overflow: 'hidden'}),
      style({width: '0', overflow: 'hidden'}),
    ]))
  ])
])

