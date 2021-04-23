import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GameOptionsComponent } from './../game-options/game-options.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: string[];
  xGoesFirst: boolean | null;
  xIsNext: boolean;
  winner: string;
  movesLeft: number;
  private static winningLines: number[][];

  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.newGameOptions();
    BoardComponent.winningLines = [
      [0, 1, 2], // Top Row
      [3, 4, 5], // Middle Row
      [6, 7, 8], // Bottom Row
      [0, 3, 6], // Left Column
      [1, 4, 7], // Middle Column
      [2, 5, 8], // Right Column
      [0, 4, 8], // Back Diagonal \
      [2, 4, 6], // Forward Diagonal /
    ];
  }

  /**
   * Start a new game with new options set.
   *
   * @param xGoesFirst True for X first, false for O first, null for random.
   */
  newGameOptions(xGoesFirst: boolean | null = true) {
    this.xGoesFirst = xGoesFirst;
    this.newGame();
  }

  /**
   * Start a new game with the current options.
   */
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = (this.xGoesFirst === null ? Math.random() >= 0.5 : this.xGoesFirst);
    this.movesLeft = 9;
  }

  showDialog() {
    const gameOptionsDialog = this.dialogService.open(GameOptionsComponent);
    gameOptionsDialog.onClose.subscribe(config => {
      if (config?.isValid) {
        this.newGameOptions(config.xGoesFirst);
      }
    });
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    // Do not allow any moves to be made if there is a winner
    if (this.winner !== null) {
      return;
    }

    if (!this.squares[idx]) { // If move is on an empty square
      this.squares[idx] = this.player; // Set value to current player character
      this.xIsNext = !this.xIsNext; // Set it to the next players turn
      this.movesLeft--; // Subtract from the total number of moves remaining
    }

    this.calculateWinner();
  }

  calculateWinner() {
    // Loop through all win cases to see if a player won
    for (let line of BoardComponent.winningLines) {
      const [a, b, c] = line;
      if ( // @-- Make sure the square is defined; can't have 3 nulls in a row
        this.squares[a] && // <--@
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) { // When there is 3 in a row...
        this.winner = this.squares[a]; // Set the winner
        for (let index of line) { // Mark the 3 that are in a row
          this.squares[index] += '!';
        }
        return;
      }
    }
  }
}
