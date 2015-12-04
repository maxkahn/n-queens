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

  var board = new Board({n: n});
  var rooks = n;
  var solutions = [];
  var boardsSoFar = {}
  //this.togglePiece(rowI, colI)
  var possibleMoves = {};
  for (var column = 0; column < n; column++) {
    possibleMoves[column] = column;
  }
  
  // for(0..<n for rows)
  //   for(0..<n for col)
  //     possible moves[]
    var generateBoards = function(board, remainingRooks, possibleMoves){
      var currentRow = n - remainingRooks
      var movesLeft = _.extend({},possibleMoves);

      if(remainingRooks === 0) {
        //no check yet for whether board already in solutions
        solutions.push(board);
      }else{
        for (var keys in movesLeft) {
          if (board.valueAt(currentRow, movesLeft[keys]) === 0) {

            var newRows = [];
            var rows = board.rows();
            for(var subI =0; subI < rows.length; subI++){
              var newEntry = rows[subI].slice();
              newRows.push(newEntry);
            }

            var newBoard = new Board(newRows);
            newBoard.togglePiece(currentRow,movesLeft[keys]);

            var stringBoard = JSON.stringify(newBoard.rows());
            //make a copy possible moves
              //remove the toggle, and any new interaction issues from the copy
              //and pass te copy down            
            if(!(newBoard.hasAnyRooksConflicts()) && !boardsSoFar[stringBoard]){
              boardsSoFar[stringBoard] = true;
              //delete remainingMoves[keys]
              
              generateBoards(newBoard, remainingRooks-1, movesLeft);
            }else{delete movesLeft[keys];}
          }
        }
      }
    };

    generateBoards(board, n, possibleMoves);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions[0].rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var counter = 0;
//   var board = new Board({n: n});
//   var rooks = n;
//   var possibleMoves = {};
//   for (var column = 0; column < n; column++) {
//     possibleMoves[column] = column;
//   }
  
//   var generateBoards = function(board, remainingRooks, possibleMoves){
//     var currentRow = n - remainingRooks
    

//     if(remainingRooks === 0) {
//       //no check yet for whether board already in solutions
//       counter++;
//     }else{
//       for (var keys in possibleMoves) {
//         var movesLeft = _.extend({},possibleMoves);

//         var newRows = [];
//         var rows = board.rows();
//         for(var subI =0; subI < rows.length; subI++){
//           var newEntry = rows[subI].slice();
//           newRows.push(newEntry);
//         }

//         var newBoard = new Board(newRows);
//         newBoard.togglePiece(currentRow,movesLeft[keys]);
//         delete movesLeft[keys];
//         generateBoards(newBoard, remainingRooks-1, movesLeft);
//       }
//     }
//   };

//   generateBoards(board, n, possibleMoves);
//   console.log('Number of solutions for ' + n + ' rooks:', counter);
//   return counter;
// };
//bitwise solution to nRooks
window.countNRooksSolutions = function(n){ 
  var counter = 0;
  var size = Math.pow(2,n)-1;

  var rookSolutionsCount = function(col){
    if(col === size){
      counter++;
    }

    var possibleMoves = ~(col)

    while(possibleMoves & size){
      var thisMove = possibleMoves & -possibleMoves
      possibleMoves-= thisMove
      rookSolutionsCount(thisMove|col)
    }
  }
  rookSolutionsCount(0);
  return counter; 
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var rooks = n;
  var solutions = [];
  var boardsSoFar = {}
  //this.togglePiece(rowI, colI)
  var possibleMoves = {};
  for (var column = 0; column < n; column++) {
    possibleMoves[column] = column;
  }
  
  // for(0..<n for rows)
  //   for(0..<n for col)
  //     possible moves[]
    var generateBoards = function(board, remainingQueens, possibleMoves){
      var currentRow = n - remainingQueens;
      if(!solutions.length){
        if(remainingQueens === 0) {
          //no check yet for whether board already in solutions
          solutions.push(board);
        }else{
          for (var keys in possibleMoves) {

            var movesLeft = _.extend({}, possibleMoves);
            var newRows = [];
            var rows = board.rows();
            for(var subI =0; subI < rows.length; subI++){
              var newEntry = rows[subI].slice();
              newRows.push(newEntry);
            }

            var newBoard = new Board(newRows);
            newBoard.togglePiece(currentRow,possibleMoves[keys]);

            var stringBoard = JSON.stringify(newBoard.rows());
            //make a copy possible moves
              //remove the toggle, and any new interaction issues from the copy
              //and pass te copy down
              var majDiagIndex = newBoard._getFirstRowColumnIndexForMajorDiagonalOn(currentRow, possibleMoves[keys]);
              var minDiagIndex = newBoard._getFirstRowColumnIndexForMinorDiagonalOn(currentRow, possibleMoves[keys]); 
            if(!(newBoard.hasMinorDiagonalConflictAt(minDiagIndex)) 
              && !(newBoard.hasMajorDiagonalConflictAt(majDiagIndex)) 
              && !(newBoard.hasColConflictAt(possibleMoves[keys])) 
              && !boardsSoFar[stringBoard]){
              boardsSoFar[stringBoard] = true;
              //delete remainingMoves[keys]
              delete movesLeft[keys];
              
              generateBoards(newBoard, remainingQueens-1, movesLeft);
            
            }
          }
        }
      }
    };

    generateBoards(board, n, possibleMoves);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions));
  if(solutions.length){
    return solutions[0].rows();
    }
    else {
      return board.rows();
    } 
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.bitWiseNQueensCount = function(n){
  var counter = 0;
  var done = Math.pow(2,n) - 1;

  var solutionCounter = function(leftD, col, rightD){
    if(col === done){
      counter++;
    }else{

      var possibleMoves = ~(leftD | col | rightD);

      while(possibleMoves & done){
        //placing current move
        var thisMove = possibleMoves & -possibleMoves;
        possibleMoves -= thisMove;

        solutionCounter((leftD | thisMove) >> 1, col | thisMove, (rightD | thisMove) <<1);
      }
    }
  }
  solutionCounter(0,0,0)

  return counter
}


window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var rooks = n;
  var counter = 0;
  var boardsSoFar = {}
  //this.togglePiece(rowI, colI)
  var possibleMoves = {};
  for (var column = 0; column < n; column++) {
    possibleMoves[column] = column;
  }
  
  // for(0..<n for rows)
  //   for(0..<n for col)
  //     possible moves[]
    var generateBoards = function(board, remainingQueens, possibleMoves){
      var currentRow = n - remainingQueens

      if(remainingQueens === 0) {
        //no check yet for whether board already in solutions
       counter++;
      }else{
        for (var keys in possibleMoves) {
          var movesLeft = _.extend({},possibleMoves);


          var newRows = [];
          var rows = board.rows();
          for(var subI =0; subI < rows.length; subI++){
            var newEntry = rows[subI].slice();
            newRows.push(newEntry);
          }

          var newBoard = new Board(newRows);
          newBoard.togglePiece(currentRow,movesLeft[keys]);

          var stringBoard = JSON.stringify(newBoard.rows());
          //make a copy possible moves
            //remove the toggle, and any new interaction issues from the copy
            //and pass te copy down 
            var majDiagIndex = newBoard._getFirstRowColumnIndexForMajorDiagonalOn(currentRow, possibleMoves[keys]);
            var minDiagIndex = newBoard._getFirstRowColumnIndexForMinorDiagonalOn(currentRow, possibleMoves[keys]); 
          if(!(newBoard.hasMinorDiagonalConflictAt(minDiagIndex)) 
            && !(newBoard.hasMajorDiagonalConflictAt(majDiagIndex)) 
            && !boardsSoFar[stringBoard]){
            boardsSoFar[stringBoard] = true;
            delete movesLeft[keys];
            //delete remainingMoves[keys]
            
            generateBoards(newBoard, remainingQueens-1, movesLeft);
          
          }
        }
      }
    };

    generateBoards(board, n, possibleMoves);

  console.log('Number of solutions for ' + n + ' queens:', counter);
  return counter;
};

