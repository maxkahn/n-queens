/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//this.hasAnyRooksConflicts()
//viable spaces

window.findNRooksSolution = function(n) {

  var solution = undefined; //fixme
  var board = new Board({n: n});
  var rooks = n;
  var solutions = [];
  //this.togglePiece(rowI, colI)
  var possibleMoves = [];
  for (var row = 0; row < n; row++) {
    for (var column = 0; column < n; column++) {
      possibleMoves.push([row, column]);
    }
  }
  
  // for(0..<n for rows)
  //   for(0..<n for col)
  //     possible moves[]
    var generateBoards = function(board, remainingRooks){
      if(remainingRooks === 0) {
        //no check yet for whether board already in solutions
        solutions.push(board);
      }
      //pass into solutions

      //if bad board dont recurse
      if (!(board.hasAnyRooksConflicts())) {
        for (var i = 0; i < possibleMoves.length; i++) {
          if (board.valueAt(possibleMoves[i][0], possibleMoves[i][1]) === 0) {
            
            console.table("in generateBoards",board.rows())
            var newRows = [];
            var rows = board.rows();
            for(var subI =0; subI < rows.length; subI++){
              var newEntry = rows[subI].slice();
              newRows.push(newEntry);
            }
//            console.table(newRows)
            var newBoard = new Board(newRows);
            newBoard.togglePiece(possibleMoves[i][0],possibleMoves[i][1]);
            generateBoards(newBoard, remainingRooks-1);
          }
        }
      }
    };
    
    console.log(board.rows())
    generateBoards(board, n);
    //test with this.hasAnyRooksConflicts()
    //if not any conflicts
      //iterate over possibleMoves
        //check that space is blank
          //if so, toggle it
          //call recurisvly
          //pass in that board, remainingRooks--, possibleMove


  console.table(solutions[0].rows())
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions[0].rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

