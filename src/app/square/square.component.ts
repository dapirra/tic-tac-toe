import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton *ngIf="!value">{{ value }}</button>
    <button nbButton *ngIf="value == 'X'" hero status="success">{{ value }}</button>
    <button nbButton *ngIf="value == 'O'" hero status="info">{{ value }}</button>
    <button nbButton *ngIf="value?.length > 1" hero status="warning">{{ value.charAt(0) }}</button>
  `,
  styles: [`
    button {
      width: 100%;
      height: 100%;
      transition-property: none !important;
      font-size: 5em !important;
      background-color: #323259 !important;
      border: 0 !important;
    }
  `]
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | 'X!' | 'O!';
}
