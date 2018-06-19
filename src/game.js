// To play Minesweeper, instances of MineSweeperGame will be generated in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit` */

import {Board} from './board';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    this._startTime = Date.now();
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);

    if(rowIndex >= this._board.numberOfRows || columnIndex >= this._board.numberOfColumns){
      return;
    }else if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('\tGAME OVER, GG \n New game board is created for you if you want to try again, buddy\n');
      let finishTime = (Date.now() - this._startTime)/1000; //divided by 1000 so that it is in seconds
      console.log('\tYou lost the game in: ' + finishTime + 'seconds\n')
      this._board.print();
      this._board = new Board(this._board.numberOfRows, this._board.numberOfColumns, this._board.numberOfBombs);
    }else if (this._board.hasSafeTiles() === false){
      let finishTime = (Date.now() - this._startTime)/1000; //divided by 1000 so that it is in seconds
      console.log('\tYOU WIN, GG \n\tNew game board is created for you if you want to try again, buddy\n\tYou finished in: ' + finishTime + 'seconds\n');
      this._board = new Board(this._board.numberOfRows, this._board.numberOfColumns, this._board.numberOfBombs);
    }else{
      console.log('Current Board:');
      this._board.print();
    }

  }

}
