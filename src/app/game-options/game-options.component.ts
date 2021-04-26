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
  private static alternatePlayer = true;

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

  randomFirstPlayer(): boolean {
    return Math.random() >= 0.5;
  }

  alternateFirstPlayer(): boolean {
    return GameOptionsComponent.alternatePlayer = !GameOptionsComponent.alternatePlayer;
  }
}
