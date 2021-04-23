import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss']
})
export class GameOptionsComponent implements OnInit {

  @Input() title: string = 'Game Options';
  xGoesFirstOption: boolean | null;
  private static savedOptions = {'xGoesFirstOption': true};

  constructor(protected ref: NbDialogRef<GameOptionsComponent>) {}

  ngOnInit(): void {
    document.getElementById('beginButton').focus();
    this.xGoesFirstOption = GameOptionsComponent.savedOptions.xGoesFirstOption;
  }

  begin() {
    GameOptionsComponent.savedOptions.xGoesFirstOption = this.xGoesFirstOption;
    this.ref.close({
      'xGoesFirst': this.xGoesFirstOption,
    });
  }
}
