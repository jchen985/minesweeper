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

  while (numberOfBombsPlaced < numberOfBombs){
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    bombMe = board[randomRowIndex][randomColumnIndex];

    if(bombMe !== 'B'){ //check no B at the position already
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced ++;
    }
  }
  return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1, -1],[-1, 0],[-1, 1],[1, -1],[0, -1],[0, 1],[1, 1],[1, 0]];

  const numRows = bombBoard.length;
  const numColumns = bombBoard[0].length;
  let numBombs = 0;

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    if(neighborRowIndex >=0
      && neighborRowIndex <= numRows
      && neighborColumnIndex >=0
      && neighborColumnIndex <= numColumns){
        if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
          numBombs ++;
        }
    }
  });
  return numBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] !== ' '){ //not empty
    console.log('This tile has already been flipped!');
    return;
  }else if(bombBoard[rowIndex][columnIndex] === 'B') { //it is a Bomb
    playerBoard[rowIndex][columnIndex] = "B";
  }else{ //show number of bombs
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
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

flipTile(playerBoard,bombBoard,0,0);
console.log('After flipped: ');
printBoard(playerBoard);
