import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton [hero]="!!value" [status]="
      value === 'X' ? 'success' :
      value === 'O' ? 'info' :
      value?.length > 1 ? 'warning' : '' ">
        {{ value?.charAt(0) }}
    </button>
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
