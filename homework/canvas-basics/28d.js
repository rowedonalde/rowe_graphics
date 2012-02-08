/*
 * Script for 0126 #28d
 *
 * Two stick figures
 */

window.onload = 
(
  function()
  {
    //28d
    var canvas28d = document.getElementById('28d');
    var context28d = canvas28d.getContext('2d');
    
    //Draw a stick figure centered vertically at x = 0 in a given context
    //The tip of this figure's head is at the origin
    var drawStickFigure = function(context)
    {
      //draw head:
      context.beginPath();
      context.arc(0, 50, 50, 0, 2 * Math.PI, false);
      context.strokeStyle = "black";
      context.lineWidth = 5;
      context.stroke();
      
      //draw torso:
      context.beginPath();
      context.moveTo(0, 100);
      context.lineTo(0, 300);
      
      //draw arms:
      context.moveTo(-140, 190);
      context.lineTo(0, 200);
      context.lineTo(140, 190);
      
      //draw legs:
      context.moveTo(-50, 470);
      context.lineTo(0, 300);
      context.lineTo(50, 470);
      context.stroke();
    };
    
    //draw the stick figure with the hat:
    context28d.translate(200, 50);
    drawStickFigure(context28d);
    
    //draw the hat:
    context28d.beginPath();
    context28d.moveTo(-75, 20);
    context28d.lineTo(75, 20);
    context28d.stroke();
    context28d.fillStyle = "black";
    context28d.fillRect(-40, -30, 80, 50);
    
    //draw the stick figure with the long hair:
    context28d.translate(350, 0);
    drawStickFigure(context28d);
    
    //draw the hair:
    context28d.beginPath();
    context28d.moveTo(0, 0);
    context28d.bezierCurveTo(-100, 0, 0, 100, -100, 100);
    context28d.moveTo(0, 0);
    context28d.bezierCurveTo(100, 0, 0, 100, 100, 100);
    context28d.moveTo(0, 0);
    context28d.bezierCurveTo(-20, 20, -30, 20, -40, 20);
    context28d.moveTo(0, 0);
    context28d.bezierCurveTo(20, 20, 30, 20, 40, 20);
    context28d.stroke();
  }
);