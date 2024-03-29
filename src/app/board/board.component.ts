import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GameOptionsComponent } from './../game-options/game-options.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private static winningLines: number[][];

  gameID: number;
  squares: string[];
  xGoesFirst: boolean | (() => boolean);
  xIsNext: boolean;
  winner: string;
  vsComputer: boolean;
  computerIsX: boolean;
  computerGoesFirst: boolean;
  computersTurn: boolean;
  computerVsComputer: boolean;
  availableSquares: Set<number>;

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.gameID = 0;
    this.newGameOptions();
    BoardComponent.winningLines = [
      [0, 4, 8], // Back Diagonal \
      [2, 4, 6], // Forward Diagonal /
      [0, 1, 2], // Top Row
      [3, 4, 5], // Middle Row
      [6, 7, 8], // Bottom Row
      [0, 3, 6], // Left Column
      [1, 4, 7], // Middle Column
      [2, 5, 8], // Right Column
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
    computerVsComputer: boolean = false,
  ): void {
    this.xGoesFirst = xGoesFirst;
    this.vsComputer = vsComputer;
    this.computerIsX = computerIsX;
    this.computerVsComputer = computerVsComputer;
    this.newGame();
  }

  /**
   * Start a new game with the current options.
   */
  newGame(): void {
    this.gameID++;
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = (typeof this.xGoesFirst === 'function' ? this.xGoesFirst() : this.xGoesFirst);
    this.availableSquares = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    this.computersTurn = false;
    this.computerGoesFirst = this.vsComputer && (this.xIsNext === this.computerIsX);
    if (this.computerVsComputer) {
      this.xIsNext = !this.xIsNext;
      this.makeComputerMove();
    } else if (this.computerGoesFirst) {
      this.makeMove(-1);
      this.xIsNext = !this.xIsNext;
    }
  }

  showDialog(): void {
    const gameOptionsDialog = this.dialogService.open(GameOptionsComponent);
    gameOptionsDialog.onClose.toPromise().then(config => {
      if (config) {
        this.newGameOptions(
          config.xGoesFirst,
          config.vsComputer,
          config.computerIsX,
          config.computerVsComputer,
        );
      }
    });
  }

  get player(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(index: number): void {
    if (
      !this.squares[index] && // If move is not on an empty square and
      !this.computersTurn && // If it's not the computer's turn and
      this.winner === null && // If a winner has not been determined and
      !this.computerVsComputer // If the computer is not versing itself
    ) {
      this.squares[index] = this.player; // Set value to current player
      this.availableSquares.delete(index); // <--@
      // @-- Delete square from the set of available squares.
      // This helps the computer to determine which squares are left.

      this.calculateWinner();

      if (this.vsComputer) {
        this.computersTurn = !this.computersTurn;
        this.makeComputerMove();
      } else {
        this.xIsNext = !this.xIsNext; // Set it to the next players turn
      }
    }
  }

  private makeComputerMove(): void {
    const tempGameID = this.gameID;
    this.xIsNext = !this.xIsNext;
    setTimeout(() => {
      if (tempGameID !== this.gameID) {
        return; // Prevent computer from accidentally making a move in the next match
      }
      if (this.availableSquares.size !== 0 && this.winner === null) {
        const move = this.computerEasyMove();
        this.squares[move] = this.computerVsComputer ? this.player : (this.computerIsX ? 'X' : 'O');
        this.availableSquares.delete(move);

        this.calculateWinner();

        if (this.computerVsComputer) {
          this.xIsNext = !this.xIsNext;
          this.makeComputerMove();
        } else {
          this.computersTurn = !this.computersTurn;
        }
      }
      this.xIsNext = !this.xIsNext;
    }, this.computerVsComputer ? 250 : 750);
  }

  calculateWinner(): void {
    // Loop through all win cases to see if a player won
    for (const line of BoardComponent.winningLines) {
      const [a, b, c] = line;
      if ( // @-- Make sure the square is defined; can't have 3 nulls in a row
        this.squares[a] && // <--@
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) { // When there is 3 in a row...
        this.winner = this.squares[a]; // Set the winner
        for (const index of line) { // Mark the 3 that are in a row
          this.squares[index] += '!';
        }
        return;
      }
    }
  }

  get headerText(): string {
    if (this.winner) {
      return `Player ${this.winner} won!`;
    } else if (this.availableSquares.size === 0) {
      return `It's a draw!`;
    } else {
      return `Current Player: ${this.player}`;
    }
  }

  private computerEasyMove(): number {
    return Array.from(this.availableSquares.values())[Math.floor(Math.random() * this.availableSquares.size)];
  }
}
