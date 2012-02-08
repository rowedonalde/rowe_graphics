/*
 * Script for 0126 #26c
 * A honeycomb pattern
 */

window.onload = 
(
  function()
  {
    //26c
    var canvas26c = document.getElementById('26c');
    var context26c = canvas26c.getContext('2d');
    var edge = 50;
    var isOffsetRow = true;
    
    //Create hexagons in rows:
    for (y = 0; y < 500; y += edge * Math.sqrt(3) / 2)
    {
      isOffsetRow = !isOffsetRow;
      
      //save origin:
      context26c.save();
      
      //Every other row, the hexagons need to be offset to tesselate:
      if (isOffsetRow)
      {
        context26c.translate(edge * 1.5, 0);
      }
      
      //bring the row down to where it's supposed to be
      //do this for the whole distance since we're restoring to origin
      context26c.translate(0, y);
      
      //build each hexagon in this row:
			for (x = 0; x < 500; x += 3 * edge)
			{
				//build each edge in this hexagon:
				for (i = 0; i < 6; i++)
				{
					context26c.moveTo(0, 0);
					context26c.lineTo(edge, 0);
					context26c.translate(edge, 0);
					context26c.rotate(Math.PI / 3);
				}
				
				//move to the starting point of the next hexagon:
				context26c.translate(3 * edge, 0);
			}
			
			//restore to origin:
			context26c.restore();
		}
		
    context26c.stroke();
  }
);