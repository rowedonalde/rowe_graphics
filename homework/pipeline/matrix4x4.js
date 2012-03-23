/**
 * matrix4x4.js
 *
 * Don Rowe
 * CMSI 371
 * Assignment 0315
 */

/**
 * An object representing a 4x4 matrix and a series of functions:
 * - multiply: Matrix multiplication between two Matrix4x4 objects
 * - translate: Transforms a Matrix4x4 object into another according to dx, dy,
 *              and dz.
 * - scale: Scales a Matrix4x4 object.
 */
var Matrix4x4 = function(rawMatrix){
  //Some constants:
  var rowLength = 4;
  var colHeight = 4;
  
  //This is the 2-d, 4x4 array that will represent the actual 4x4 matrix:
  this.matrix = [new Array(rowLength),
                 new Array(rowLength),
                 new Array(rowLength),
                 new Array(rowLength)];
                 
  //If rawMatrix wasn't specified, initialize it as an empty array:
  rawMatrix = rawMatrix || new Array(rowLength * colHeight);
  
  //Make sure the given rawMatrix has at least 16 elements.
  //If not, fill the rest with 0s:
  while (rawMatrix.length < rowLength * colHeight)
  {
    rawMatrix.push(0);
  }
  
  //Translate the given 1-d 16-long array into the 4x4 matrix:
  for (var row = 0; row < colHeight; row++)
  {
    for (var col = 0; col < rowLength; col++)
    {
      //The current index of rawMatrix corresponding to this.matrix[i][j]:
      var currentIndex = row*rowLength + col;
      
      this.matrix[row][col] = rawMatrix[currentIndex];
    }
  }
  
  /**
   * This static method takes two Matrix4x4 objects.
   * The method performs matrix multiplication on 
   */
  this.multiply = function(firstMatrix, secondMatrix)
  {
    //A new bare Matrix4x4 which we will ultimately return;
    var product = new Matrix4x4();
    
    //For convenience, just pull the matrix array out of each Matrix4x4:
    firstMatrix = firstMatrix.matrix;
    secondMatrix = secondMatrix.matrix;
    
    //Perform the actual matrix multiplication and store the result in pruduct.
    //For each row i of firstMatrix, go through each column c of secondMatrix
    //and multiply each element j in i by the j'th element of c. Take the sum
    //of all these values and place it in product[i][c]:
    for (var firstMatrixRow = 0; firstMatrixRow < colHeight; firstMatrixRow++)
    {
      for (var secondMatrixCol = 0; secondMatrixCol < rowLength; secondMatrixCol++)
      {
        //The sum of the products which will ultimately be placed in
        //product.matrix[firstMatrixRow][secondMatrixCol]:
        var sum = 0;
        
        //fMCol, i.e., firstMatrixCol
        for (var fMCol = 0; fMCol < rowLength; fMCol++)
        {
          sum += firstMatrix[firstMatrixRow][fMCol] * secondMatrix[fMCol][secondMatrixCol];
        }
        
        product.matrix[firstMatrixRow][secondMatrixCol] = sum;
      }
    }
    
    return product;
  };
  
  /**
   * This static method returns a new Matrix4x4 object representing the
   * vector by which another matrix could be translated.
   */
  this.translate = function(dx, dy, dz)
  {
    //A 1-d representation of the vector matrix:
    var matrix = [1, 0, 0, dx,
                  0, 1, 0, dy,
                  0, 0, 1, dz,
                  0, 0, 0, 1];
                  
    return new Matrix4x4(matrix);
  };
  
  /**
   * This static method returns a new Matrix4x4 object representing the
   * vector by which another matrix could be scaled.
   */
  this.scale(sx, sy, sz)
  {
    var matrix = [sx, 0, 0, 0,
                  0, sy, 0, 0,
                  0, 0, sz, 0,
                  0, 0, 0, 1];
                  
    return new Matrix4x4(matrix);
  };
};
