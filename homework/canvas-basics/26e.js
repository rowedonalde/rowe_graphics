/*
 * Script for 0126 #26e
 *
 * Figure-8 with two purple circles
 */

window.onload = 
(
  function()
  {
    //26e
    var canvas26e = document.getElementById('26e');
    var context26e = canvas26e.getContext('2d');
    
    //draw the 8:
    context26e.strokeStyle = "purple";
    var radiusUpper = 50;
    var radiusLower = 75;
    var startAngle = 0;
    var endAngle = Math.PI * 2;
    
    //draw the upper half:
    context26e.beginPath();
    context26e.arc(250, 200, radiusUpper, startAngle, endAngle, true);
    context26e.stroke();
    
    //draw the upper half:
    context26e.beginPath();
    context26e.arc(250, 300, radiusLower, startAngle, endAngle, true);
    context26e.stroke();
    
  }
);