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
  xGoesFirst: boolean | Function;
  xIsNext: boolean;
  winner: string;
  vsComputer: boolean;
  computerIsX: boolean;
  computerGoesFirst: boolean;
  computersTurn: boolean;
  availableSquares: Set<number>;
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
  newGameOptions(
      xGoesFirst: boolean | null = true,
      vsComputer: boolean = false,
      computerIsX: boolean = false,
    ) {
    this.xGoesFirst = xGoesFirst;
    this.vsComputer = vsComputer;
    this.computerIsX = computerIsX;
    this.newGame();
  }

  /**
   * Start a new game with the current options.
   */
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = (typeof this.xGoesFirst === 'function' ? this.xGoesFirst() : this.xGoesFirst);
    this.availableSquares = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    this.computersTurn = false;
    this.computerGoesFirst = this.vsComputer && (this.xIsNext === this.computerIsX);
    if (this.computerGoesFirst) {
      this.makeMove(-1);
      this.xIsNext = !this.xIsNext;
    }
  }

  showDialog() {
    const gameOptionsDialog = this.dialogService.open(GameOptionsComponent);
    gameOptionsDialog.onClose.toPromise().then(config => {
      if (config) {
        this.newGameOptions(
          config.xGoesFirst,
          config.vsComputer,
          config.computerIsX,
        );
      }
    });
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(index: number) {
    if (
      !this.squares[index] && // If move is not on an empty square and
      !this.computersTurn && // If it's not the computer's turn and
      this.winner === null // If a winner has not been determined
    ) {
      if (this.vsComputer) {
        this.computersTurn = !this.computersTurn;
      }

      this.squares[index] = this.player; // Set value to current player
      if (!this.vsComputer) {
        this.xIsNext = !this.xIsNext; // Set it to the next players turn
      }
      this.availableSquares.delete(index);
      this.calculateWinner();

      if (this.vsComputer) {
        this.makeComputerMove();
      }
    }
  }

  private makeComputerMove() {
    this.xIsNext = !this.xIsNext;
    setTimeout(() => {
      if (this.availableSquares.size !== 0 && this.winner === null) {
        let move = this.computerEasyMove();
        this.squares[move] = this.computerIsX ? 'X' : 'O'; // Set value to current player
        this.availableSquares.delete(move);
        this.calculateWinner();
        this.computersTurn = !this.computersTurn;
      }
      this.xIsNext = !this.xIsNext;
    }, 1000);
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

  private computerEasyMove() {
    return Array.from(this.availableSquares.values())[Math.floor(Math.random() * this.availableSquares.size)];
  }
}
