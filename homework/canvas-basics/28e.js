/*
 * Script for 0126 #28e
 *
 * Skyline scene at night
 */

window.onload = 
(
  function()
  {
    //28d
    var canvas28e = document.getElementById('28e');
    var context28e = canvas28e.getContext('2d');
    
    //Draw the sky:
    var linGrad = context28e.createLinearGradient(0, 0, 0, 500);
    linGrad.addColorStop(0, "black");
    linGrad.addColorStop(1, "blue");
    context28e.beginPath();
    context28e.fillStyle = linGrad;
    context28e.fillRect(0, 0, 1000, 500);
    
    var floorHeight = 10; //The height of each floor
    var buildingWidth = 20; //The width of each building
    var windowWidth = 5;
    var windowHeight = 7;
    var lightChance = 0.3; //The probability that a light will be on
    
    //Given a section of floor, turn on the light:
    //x and y are the upper left corner of the section
    var drawLight = function(x, y, floorW, floorH, windowW, windowH, context)
    {
      context.save();
      context.translate(x, y);
      context.beginPath();
      context.fillStyle = "yellow";
      context.fillRect((floorW - windowW) / 2, (floorH - windowH) / 2, windowW, windowH);
      context.restore();
    };
    
    //draw the buildings:
    for (x = 0; x <= 1000; x +=buildingWidth)
    {
      //Randomly generate the height of each building and draw it:
      var floors = Math.floor(Math.random() * 500 / floorHeight);
      context28e.fillStyle = "black";
      context28e.beginPath();
      context28e.fillRect(x, 500 - floors*floorHeight, buildingWidth, floors * floorHeight);
      
      //Randomly turn on and off lights:
      for (f = 1; f <= floors; f++)
      {
        //The left light on this floor:
        if (Math.random() <= lightChance)
        {
          drawLight(x, 500 - f * floorHeight, buildingWidth / 2, floorHeight, windowWidth, windowHeight, context28e);
        }
        
        //The right light on this floor:
        if (Math.random() <= lightChance)
        {
          drawLight(x + buildingWidth / 2, 500 - f * floorHeight, buildingWidth / 2, floorHeight, windowWidth, windowHeight, context28e);
        }
      }
    }
    
  }
);