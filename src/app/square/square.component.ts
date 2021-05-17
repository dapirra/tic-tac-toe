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
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | 'X!' | 'O!';
  @Input() id: string;
}
