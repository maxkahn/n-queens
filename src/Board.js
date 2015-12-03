// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      var results;
      var self = this;

      var makeRows = function(){
        results = _(_.range(self.get('n'))).map(function(rowIndex) {
          return self.get(rowIndex);
        }, self);
      }
      if(results){
        return results;
      }else{
        makeRows();
        return results;
      }
    },



    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rows = this.rows();
      var counter = 0;
      var row = rows[rowIndex];
      for (var i = 0; i < row.length; i++) {
        counter+= row[i];
      }
      return counter > 1; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var result = false;

      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          result = true;
        }
      }

      return result; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var counter = 0;
      for (var i = 0; i < rows.length; i++) {
        counter += rows[i][colIndex];
      }
      return counter > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false;
      var rows = this.rows();

      for (var i = 0; i < rows.length; i++) {
        if (this.hasColConflictAt(i)) {
          result = true;
        }
      }

      return result; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //

    //     _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
    //   return colIndex - rowIndex;
    // },

    // _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
    //   return colIndex + rowIndex;
    // },
    // test if a specific major diagonal on this board contains a conflict

    valueAt: function(rowIndex, colIndex) {
      var rows = this.rows();
      //console.log(rows)
      if(rows[rowIndex] !== undefined){
        return rows[rowIndex][colIndex];
      }
      return undefined;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;

      var rowIndex = 0;
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();

      for (;rowIndex < rows.length; rowIndex++) {
        if (this.valueAt(rowIndex, colIndex) !== undefined) {
          counter += this.valueAt(rowIndex, colIndex);
        }
        colIndex++;
      }

      return counter > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var rowIndex = 0;
      var colIndex = 0;

      for(; colIndex < rows.length - 1 ;colIndex ++){
        var startRow = this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex);
        if (this.hasMajorDiagonalConflictAt(startRow)) {
          return true;
        }

      }
      colIndex = 0;
      rowIndex = 1;
      for(;rowIndex < rows.length -1 ; rowIndex++) {
        var startRow = this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex);
        if (this.hasMajorDiagonalConflictAt(startRow)) {
          return true;
        }
      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;

      var rowIndex = 0;
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();

      for(;rowIndex < rows.length; rowIndex++){
        if(this.valueAt(rowIndex, colIndex) !== undefined){
          counter += this.valueAt(rowIndex, colIndex);
        }
        colIndex--;
      }

      return counter > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var rowIndex = 0;
      var colIndex = rows.length - 1;

      for(; colIndex > 0; colIndex--){
        var startRow = this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex);
        if(this.hasMinorDiagonalConflictAt(startRow)){
          return true;
        }
      }

      colIndex = rows.length;
      for(; rowIndex < rows.length - 1; rowIndex++){
        var startRow = this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex);
        if (this.hasMinorDiagonalConflictAt(startRow)) {
          return true;
        }
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
