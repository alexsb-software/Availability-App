import {trigger, state, animate, style, transition} from '@angular/core';


export function leftFadeInOut(){
    return trigger('leftFadeInOut',[
        state('in',
            style({opacity:1,transform:'translateX(0)'})
        ),
        transition('void => *',[
            style({opacity:0,transform:'translateX(-20%)'}),
            animate(400)
        ]),
        transition('* => void',[
            animate(400,
                style({opacity:0,transform:'translateX(20%)'}))
        ])
    ])
}

export function leftFadeIn(){
    return trigger('leftFadeIn',[
        state('in',style({opacity:1})),
        transition('void => *', [
            style({transform: 'translateX(-100%)'}),
            animate(300)
        ]),
    ])
}

export function slide(){
    return trigger('slide', [
      state('active', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
}

export function fallIn(){
  return trigger('fallIn', [
    transition(':enter', [
      style({opacity:'0', transform: 'translateY(40px)'}),
      animate('.4s .2s ease-in-out', style({opacity:'1', transform: 'translateY(0)'}))
    ]),
    transition(':leave', [
      style({opacity:'1', transform: 'translateX(0)'}),
      animate('.3s ease-in-out', style({opacity:'0', transform: 'translateX(-200px)'}))
    ])
  ]);
}
