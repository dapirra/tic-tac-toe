import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton [id]="id" [hero]="!!value" [status]="
      value === 'X' ? 'success' :
      value === 'O' ? 'info' :
      value?.length > 1 ? 'warning' : '' ">
        {{ value?.charAt(0) }}
    </button>
  `,
  styles: [`
    @for $i from 0 through 8 {
      button#square#{$i} {
        width: 100%;
        height: 100%;
        transition-property: none;
        font-size: 5em;
        background-color: #323259;
        border: 0;
      }
    }
  `]
  // styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | 'X!' | 'O!';
  @Input() id: string;
}
