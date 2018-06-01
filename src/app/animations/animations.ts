import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

const TIMING = "250ms";


export const openState = trigger('openState', [
  state('closed', style({
    overflow: 'hidden',
    height: '0',
    'box-shadow': '0px 1px 2px 1px #00000047',
  })),
  // Void should be identical to closed. Void can occur in edge cases when
  // really they should be closed. For example, when running array.reverse() on
  // EnrollmentList, the rows openState become void.
  state('void', style({
    overflow: 'hidden',
    height: '0',
    'box-shadow': '0px 1px 2px 1px #00000047',
  })),
  state('opened', style({
    overflow: 'hidden',
    height: '*',
    'box-shadow': '0px 3px 7px 2px #00000047',
    'z-index' : 10,
    transform: 'scale(1.005)'
  })),
  transition('* => opened', animate(`${TIMING} ease-in`)),
  transition('opened => *', animate(`${TIMING} ease-out`))
]);


export const openStateChild = trigger('openStateChild', [
  state('closed', style({
    transform: 'translateY(-100%)',
  })),
  state('opened', style({
    transform: 'translateY(0px)',
  })),
  transition('closed => opened', animate(`${TIMING} ease-in`)),
  transition('opened => closed', animate(`${TIMING} ease-out`))
]);

export const openStateDisable = trigger('openStateDisable', [
  state('closed', style({
    opacity: 1,
  })),
  state('opened', style({
    opacity: 0.75,
    background: '#e9ecef' //$gray-200
  })),
  transition('closed => opened', animate(`${TIMING} ease-in`)),
  transition('opened => closed', animate(`${TIMING} ease-out`))
]);

export const loadInOut = trigger('loadInOut', [
  transition('void => *', [
    animate(TIMING, keyframes([
      style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
      style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
      style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
    ]))
  ]),
  transition('* => void', [
    animate(TIMING, keyframes([
      style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
      style({opacity: 1, transform: 'translateX(-15px)', offset: 0.5}),
      style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
    ]))
  ])
])


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

