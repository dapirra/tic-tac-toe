import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton *ngIf="!value">{{ value }}</button>
    <button nbButton *ngIf="value == 'X'" hero status="success">{{ value }}</button>
    <button nbButton *ngIf="value == 'O'" hero status="info">{{ value }}</button>
  `,
  styles: [`
    button {
      width: 100%;
      height: 100%;
      font-size: 5em !important;
    }`
  ]
})
export class SquareComponent {
  @Input() value: 'X' | 'O';
}
