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
    var i, col, row, currentCell;
    var colHeight = 4;
    var rowLength = 4;
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
});