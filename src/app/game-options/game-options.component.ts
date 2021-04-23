import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss']
})
export class GameOptionsComponent implements OnInit {

  @Input() title: string = 'Game Options';
  selectedOption: string;
  private static savedOptions = {'selectedOption': '0'};
  private whoGoesFirst = [
    true,  // X
    false, // O
    null   // Random
  ];

  constructor(protected ref: NbDialogRef<GameOptionsComponent>) {}

  ngOnInit(): void {
    document.getElementById('beginButton').focus();
    this.selectedOption = GameOptionsComponent.savedOptions.selectedOption;
  }

  begin() {
    GameOptionsComponent.savedOptions.selectedOption = this.selectedOption;
    this.ref.close({
      'isValid': true,
      'xGoesFirst': this.whoGoesFirst[this.selectedOption],
    });
  }
}
