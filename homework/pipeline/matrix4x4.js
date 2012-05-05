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
var Matrix4x4 = function (rawMatrix) {
  //Some constants:
  rowLength = 4;
  colHeight = 4;
  
  //Loop variables:
  var row, col, currentIndex;
  
  //This is the 2-d, 4x4 array that will represent the actual 4x4 matrix:
  this.matrix = [new Array(colHeight),
                 new Array(colHeight),
                 new Array(colHeight),
                 new Array(colHeight)];
                 
  //If rawMatrix wasn't specified, initialize it as an empty array:
  this.rawMatrix = rawMatrix || new Array(rowLength * colHeight);
  
  //Make sure the given rawMatrix has at least 16 elements.
  //If not, fill the rest with 0s:
  while (this.rawMatrix.length < rowLength * colHeight)
  {
    this.rawMatrix.push(0);
  }
  
  //Translate the given 1-d 16-long array into the 4x4 matrix:
  for (col = 0; col < rowLength; col += 1) // JD: += preferred in JavaScript.
  {
    for (row = 0; row < colHeight; row += 1)
    {
      //The current index of rawMatrix corresponding to this.matrix[i][j]:
      //currentIndex = row*rowLength + col;
      currentIndex = col*colHeight + row;
      
      this.matrix[col][row] = this.rawMatrix[currentIndex];
    }
  }
  
  /**
   * This static method returns the constant colHeight
   */
  this.getColHeight = function()
  {
    return colHeight;
  };
  
  /**
   * This static method returns the constant rowLength
   */
  this.getRowLength = function()
  {
    return rowLength;
  };
  
  /**
   * This static method takes two Matrix4x4 objects.
   * The method performs matrix multiplication on them and returns the result.
   * Using the matrix formats in Matrix4x4, firstMatrix is the transformation
   * and secondMatrix is the point.
   */
  this.multiply = function(firstMatrix, secondMatrix)
  {
    //Loop variables:
    var firstMatrixRow, secondMatrixCol, sum, fmCol;
    
    //A new bare Matrix4x4 which we will ultimately return;
    var product = new Matrix4x4();
    
    //For convenience, just pull the matrix array out of each Matrix4x4:
    firstMatrix = firstMatrix.matrix;
    secondMatrix = secondMatrix.matrix;
    
    //Perform the actual matrix multiplication and store the result in product.
    //For each row i of firstMatrix, go through each column c of secondMatrix
    //and multiply each element j in i by the j'th element of c. Take the sum
    //of all these values and place it in product[i][c]:
    for (firstMatrixRow = 0; firstMatrixRow < colHeight; firstMatrixRow += 1)
    {
      for (secondMatrixCol = 0; secondMatrixCol < rowLength; secondMatrixCol += 1)
      {
        //The sum of the products which will ultimately be placed in
        //product.matrix[secondMatrixCol][firstMatrixRow]:
        sum = 0;
        
        //fMCol, i.e., firstMatrixCol
        for (fMCol = 0; fMCol < rowLength; fMCol += 1)
        {
          sum += firstMatrix[fMCol][firstMatrixRow] * secondMatrix[secondMatrixCol][fMCol];
        }
        
        product.matrix[secondMatrixCol][firstMatrixRow] = sum;
      }
    }
    
    return product;
  };
  
  /**
   * Returns the Matrix4x4 representing a 3-d point
   */
  this.point3d = function(x, y, z)
  {
    /*format--   0, 0, 0, x
                 0, 0, 0, y
                 0, 0, 0, z
                 0, 0, 0, 1
      
    */
    
    return([0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            x, y, z, 1]);
  };
  
  /**
   * This static method returns a new Matrix4x4 object representing the
   * vector by which another matrix could be translated.
   */
  this.translate = function(dx, dy, dz)
  {
    //A 1-d representation of the vector matrix:
    /*format--      1, 0, 0, dx,
                    0, 1, 0, dy,
                    0, 0, 1, dz,
                    0, 0, 0, 1*/

    //return new Matrix4x4(matrix);
    return new Matrix4x4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, dx, dy, dz, 1]);
  };
  
  /**
   * This static method returns a new Matrix4x4 object representing the
   * vector by which another matrix could be scaled.
   */
  this.scale = function(sx, sy, sz)
  {
    /*format --     sx, 0, 0, 0,
                    0, sy, 0, 0,
                    0, 0, sz, 0,
                    0, 0, 0, 1*/
                  
    return new Matrix4x4([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]);
  };
  
  /**
   * This static method returns a new Matrix 4x4 object representing the
   * vector by which another matrix could be rotated.
   */
  this.rotate = function(theta, axis)
  {
    var theta = theta || 0;
    var axis = axis || "x";
    //Convert theta to radians:
    theta = theta * Math.PI / 180;
    
    //For convenience:
    var cos = Math.cos;
    var sin = Math.cos;
    
    if (axis === "x" || axis === "X")
    {
      /*format --   1,     0,      0, 0
                    0, cosTh, -sinTh, 0
                    0, sinTh,  cosTh, 0
                    0,     0,      0, 1
      */
      
      return new Matrix4x4([1, 0, 0, 0,
                            0, cos(theta), sin(theta), 0,
                            0, -sin(theta), cos(theta), 0,
                            0, 0, 0, 1]);
    }
    else if (axis === "y" || axis === "Y")
    {
      /*format --    cosTh, 0, sinTh, 0
                         0, 1,     0, 0
                    -sinTh, 0, cosTh, 0
                         0, 0,     0, 1
      */
      
      return new Matrix4x4([cos(theta), 0, -sin(theta), 0,
                            0, 1, 0, 0,
                            sin(theta), 0, cos(theta), 0,
                            0, 0, 0, 1]);
    }
    else if (axis === "z" || axis === "Z")
    {
      /*format --   cosTh, -sinTh, 0, 0
                    sinTh,  cosTh, 0, 0
                        0,      0, 1, 0
                        0,      0, 0, 1
      
      */
      
      return new Matrix4x4([cos(theta), sin(theta), 0, 0,
                            -sin(theta), cos(theta), 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1]);
    }
    else
    {
      throw "InvalidAxis";
    }
  };
};
