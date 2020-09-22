const fs = require('fs');
const readline = require('readline-sync');

function parcer(file, index) {
  let fileContent = fs.readFileSync(file, "utf8");
  const sudokuArrays = fileContent.split('\n');
  let boardString = sudokuArrays[index].split('');
  let k = 0;
  let x = [];
  const board = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      x.push(+boardString[k]);
      if (isNaN(x[j])) {
        x[j] = 0;
      }
      k++;
    }
    board.push(x);
    x = [];
  }
  return board;
}


function isSolved(board, row, col, number) {
  for (let i = 0; i < board.length; i++) {
    if (i !== row && board[i][col] === number) {
      return false;
    }
    if (i !== col && board[row][i] === number) {
      return false;
    }
  }
  let boardEl = [];
  let board2 = [];
  let kv = 0;
  let g = 0;
  for (let m = 0; m < 3; m++) {
    for (let l = 0; l < 3; l++) {
      for (let i = 0 + m * 3; i < 3 + m * 3; i++) {
        for (let j = 0 + l * 3; j < 3 + l * 3; j++) {
          boardEl.push(board[i][j]);
          if (row === i && col === j) {
            kv = g;
          }
        }
      }
      board2.push(boardEl);
      boardEl = [];
      g++;
    }
  }
  for (let i = 0; i < board2[kv].length; i++) {
    if (board2[kv][i] === number) {
      return false;
    }
  }
  return true;
}

function prettyBoard(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        for (let number = 1; number <= 9; number++) {
          if (isSolved(board, row, col, number)) {
            board[row][col] = number;
            let rec = prettyBoard(board);
            if (rec) return board;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return board;
}

let play = readline.question('Запустить судоку?');

function pentagon() {
  console.table(prettyBoard(parcer('sudoku-puzzles.txt', 14)));
  console.log('Судоку решен!');
}
setTimeout(pentagon, 2000);


