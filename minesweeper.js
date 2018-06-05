// const blankline = '   |   |   ';
// console.log('This is the empty one:');
// console.log(blankline);
// console.log(blankline);
// console.log(blankline);
//
// const guessline = ' 1 |   |   ';
// const bombline = '   | B |   ';
// console.log('This is what a board with a guess line look like: ');
// console.log(guessline);
// console.log(bombline);
// console.log(blankline);
const printBoard = (board) =>{
  console.log('Current Board: \n');
  let i = 0;
  while (i < 3){
    console.log(board[i].join(' | '));
    i ++;
  }
}

let board = [];
board = [
  [' ',' ',' '],
  [' ',' ',' '],
  [' ',' ',' ']
];

printBoard(board);
board[0][1] = '1';
board[2][2] = 'B';
printBoard(board);
