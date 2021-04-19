import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;
  movesLeft: number;
  winningLine: number[];

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.movesLeft = 9;
    this.winningLine = null;
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

    this.winner = this.calculateWinner();
    if (this.winner) {
      for (let index of this.winningLine) {
        this.squares[index] = this.squares[index] + '!';
      }
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2], // Top Row
      [3, 4, 5], // Middle Row
      [6, 7, 8], // Bottom Row
      [0, 3, 6], // Left Column
      [1, 4, 7], // Middle Column
      [2, 5, 8], // Right Column
      [0, 4, 8], // Back Diagonal \
      [2, 4, 6], // Forward Diagonal /
    ];

    // Loop through all win cases to see if a player won
    for (let line of lines) {
      const [a, b, c] = line;
      if ( // @-- Make sure the square is defined; can't have 3 nulls in a row
        this.squares[a] && // <--@
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.winningLine = line;
        return this.squares[a];
      }
    }

    return null;
  }
}
