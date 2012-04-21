/*
 * matrix4x4-demo.js
 *
 * Event scripting for matrix4x4-demo.html
 */

$(document).ready(function()
{
  //Multiply button:
  $('#multiply').click(function()
  {
    var colHeight = 4;
    var rowLength = 4;
    
    var i, col, row, currentCell;
    var firstRaw = Array();
    var secondRaw = Array();
    
    //Build the arrays to pass to the Matrix4x4 constructor:
    for (i = 0; i < colHeight*rowLength; i += 1)
    {
      currentCell = $('#first' + i).val();
      firstRaw = firstRaw.concat(currentCell);
      
      currentCell = $('#second' + i).val();
      secondRaw = secondRaw.concat(currentCell);
    }
    
    //Construct the Matrix4x4 objects from these arrays:
    var first =  new Matrix4x4(firstRaw);
    var second = new Matrix4x4(secondRaw);
    
    //Multiply the matrices:
    var result = new Matrix4x4();
    result = result.multiply(first, second);
    
    //Fill in the result table:
    for (col = 0; col < rowLength; col += 1)
    {
      for (row = 0; row < colHeight; row += 1)
      {
        currentCell = row + col*rowLength;
        $('#result' + currentCell).html(result.matrix[col][row]);
        console.log('writing to #result' + currentCell + ': ' + result.matrix[col][row]);
      }
    }
  });
  
  //Utility function for taking a Matrix4x4 object and filling Second Matrix:
  var fillSecondMatrix = function(matrix4x4)
  {
    var i, col, row, currentCell;
    
    for (col = 0; col < rowLength; col += 1)
    {
      for (row = 0; row < colHeight; row += 1)
      {
        currentCell = row + col*rowLength;
        $('#second' + currentCell).val(matrix4x4.matrix[col][row]);
      }
    }
  };
  
  //Translate button:
  $('#translate').click(function()
  {
    //Get the input:
    var dx = $('#dx').val() || 0;
    var dy = $('#dy').val() || 0;
    var dz = $('#dz').val() || 0;
    
    //Generate the matrix:
    var result = new Matrix4x4();
    result = result.translate(dx, dy, dz);
      console.log(result.matrix);
    
    //Display it:
    fillSecondMatrix(result);
  });
  
  //Scale button:
  $('#scale').click(function()
  {
    //Get the input:
    var sx = $('#sx').val() || 1;
    var sy = $('#sy').val() || 1;
    var sz = $('#sz').val() || 1;
    
    //Generate the matrix:
    var result = new Matrix4x4();
    result = result.scale(sx, sy, sz);
    
    //Display it:
    fillSecondMatrix(result);
  });
});