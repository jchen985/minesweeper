'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (rowIndex >= this._numberOfRows || columnIndex >= this._numberOfColumns) {
        console.log('\tYour input is out of index, buddy \n');
      } else if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        //not empty
        console.log('\tThis tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        //it is a Bomb
        this._playerBoard[rowIndex][columnIndex] = "B";
      } else {
        //show number of bombs
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [1, -1], [0, -1], [0, 1], [1, 1], [1, 0]];

      var numRows = this._bombBoard.length;
      var numColumns = this._bombBoard[0].length;
      var numBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];

        if (neighborRowIndex >= 0 && neighborRowIndex <= numRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numBombs++;
          }
        }
      });
      return numBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }, {
    key: 'numberOfRows',
    get: function get() {
      return this._numberOfRows;
    }
  }, {
    key: 'numberOfColumns',
    get: function get() {
      return this._numberOfColumns;
    }
  }, {
    key: 'numberOfBombs',
    get: function get() {
      return this._numberOfBombs;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rows = 0; rows < numberOfRows; rows++) {
        var the_row = [];
        for (var columns = 0; columns < numberOfColumns; columns++) {
          the_row.push(' ');
        }
        board.push(the_row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];

      for (var rows = 0; rows < numberOfRows; rows++) {
        var the_row = [];

        for (var columns = 0; columns < numberOfColumns; columns++) {
          the_row.push(' ');
        }
        board.push(the_row);
      }
      var numberOfBombsPlaced = 0;

      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        var bombMe = board[randomRowIndex][randomColumnIndex];

        if (bombMe !== 'B') {
          //check no B at the position already
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();