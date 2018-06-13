class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile = (rowIndex, columnIndex) => {
    if(this._playerBoard[rowIndex][columnIndex] !== ' '){ //not empty
      console.log('This tile has already been flipped!');
      return;
    }else if(this._bombBoard[rowIndex][columnIndex] === 'B') { //it is a Bomb
      this._playerBoard[rowIndex][columnIndex] = "B";
    }else{ //show number of bombs
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs = function(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1],[-1, 0],[-1, 1],[1, -1],[0, -1],[0, 1],[1, 1],[1, 0]];

    const numRows = this._bombBoard.length;
    const numColumns = this._bombBoard[0].length;
    let numBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if(neighborRowIndex >=0
        && neighborRowIndex <= numRows
        && neighborColumnIndex >=0
        && neighborColumnIndex <= numColumns){
          if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numBombs ++;
          }
      }
    });
    return numBombs;
  }

}

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let rows = 0; rows < numberOfRows; rows++){
    let the_row = [];
    for (let columns = 0; columns < numberOfColumns; columns++){
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
