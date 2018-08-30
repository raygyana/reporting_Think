import { trigger, transition, animate, style, group, keyframes, state } from '@angular/core';



export const rotateX = trigger('rotateX', [
      transition(':enter', [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate(500, style({ opacity: 0 }))])
]);






// export const rotateX = trigger('rotateX', [
//       transition(':enter', [style({ transform: 'translateX(-100%)' }), animate(200, style({ transform: 'translateX(0%)' }))]),
//       transition(':leave', [animate(500, style({ transform: 'rotateX(360deg)' }))])
// ]);



export const popInAnimation = trigger('dialog', [
      transition('void => *', [
            style({ transform: 'scale3d(.3, .3, .3)' }),
            animate('1000ms')
      ]),
      transition('* => void', [
            animate(1000, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
]);
