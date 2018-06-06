const generatePlayerBoard = (numberOfRows, numberOfcolumns) => {
  let board = [];
  for (let rows = 0; rows < numberOfRows; rows++){
    let the_row = [];
    for (let columns = 0; columns < numberOfcolumns; columns++){
      the_row.push(' ');
    }
    board.push(the_row);
  }
  return board;
}


const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let rows = 0; rows < numberOfRows; rows++){
    let the_row = [];
    for (let columns = 0; columns < numberOfColumns; columns++){
      the_row.push(' ');
    }
    board.push(the_row);
  }
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs){ //may place B on a B
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return board;
}


const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player board: ');
printBoard(playerBoard);
console.log('Bomb board: ');
printBoard(bombBoard);
