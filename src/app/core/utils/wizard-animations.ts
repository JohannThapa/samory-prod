import { animate, query, style, transition, trigger, group } from '@angular/animations';

export const stepSlide = trigger('stepSlide', [
  transition(':increment', [
    style({ position: 'relative', overflow: 'hidden' }),
    query(':enter, :leave', [style({ position: 'absolute', top: 0, left: 0, right: 0 })]),
    query(':enter', [style({ opacity: 0, transform: 'translateX(24px)' })]),
    query(':leave', [style({ opacity: 1, transform: 'translateX(0)' })]),
    group([
      query(':leave', [animate('220ms ease', style({ opacity: 0, transform: 'translateX(-24px)' }))]),
      query(':enter', [animate('260ms 60ms ease', style({ opacity: 1, transform: 'translateX(0)' }))]),
    ]),
  ]),
  transition(':decrement', [
    style({ position: 'relative', overflow: 'hidden' }),
    query(':enter, :leave', [style({ position: 'absolute', top: 0, left: 0, right: 0 })]),
    query(':enter', [style({ opacity: 0, transform: 'translateX(-24px)' })]),
    group([
      query(':leave', [animate('220ms ease', style({ opacity: 0, transform: 'translateX(24px)' }))]),
      query(':enter', [animate('260ms 60ms ease', style({ opacity: 1, transform: 'translateX(0)' }))]),
    ]),
  ]),
]);
