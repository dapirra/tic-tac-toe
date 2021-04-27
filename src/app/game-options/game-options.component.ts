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
  vsComputerOption: boolean;
  computerIsXOption: boolean;
  computerDifficultyOption: number;
  computerVsComputerOption: boolean;
  private static alternatePlayer = true;
  private static savedOptions = {
    'xGoesFirst': true,
    'vsComputer': false,
    'computerIsX': false,
    'computerVsComputer': false,
    'computerDifficulty': 0,
  };

  constructor(protected ref: NbDialogRef<GameOptionsComponent>) {}

  ngOnInit(): void {
    document.getElementById('beginButton').focus();
    this.loadData();
  }

  begin() {
    this.saveData();
    this.ref.close({
      ...GameOptionsComponent.savedOptions
    });
  }

  private loadData() {
    this.xGoesFirstOption = GameOptionsComponent.savedOptions.xGoesFirst;
    this.computerDifficultyOption = GameOptionsComponent.savedOptions.computerDifficulty;
    this.vsComputerOption = GameOptionsComponent.savedOptions.vsComputer;
    this.computerIsXOption = GameOptionsComponent.savedOptions.computerIsX;
    this.computerVsComputerOption = GameOptionsComponent.savedOptions.computerVsComputer;
  }

  private saveData() {
    GameOptionsComponent.savedOptions.xGoesFirst = this.xGoesFirstOption;
    GameOptionsComponent.savedOptions.computerDifficulty = this.computerDifficultyOption;
    GameOptionsComponent.savedOptions.vsComputer = this.vsComputerOption;
    GameOptionsComponent.savedOptions.computerIsX = this.computerIsXOption;
    GameOptionsComponent.savedOptions.computerVsComputer = this.computerVsComputerOption;
  }

  randomFirstPlayer(): boolean {
    return Math.random() >= 0.5;
  }

  alternateFirstPlayer(): boolean {
    return GameOptionsComponent.alternatePlayer = !GameOptionsComponent.alternatePlayer;
  }
}
