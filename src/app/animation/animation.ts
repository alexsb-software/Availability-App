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

export function shrink(){
    return trigger('shrink',[
        state('active',style({height:'*'})),
        state('inactive',style({height:0})),
        transition('active => inactive',
            animate(400)
        ),
        transition('inactive => active',
            animate(400)
        )
    ])
}
