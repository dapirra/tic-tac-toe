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

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    // Don't allow any moves to be made if there is a winner
    if (this.winner !== null) {
      return;
    }

    if (!this.squares[idx]) {
      this.squares[idx] = this.player;
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
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

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }

    return null;
  }
}
