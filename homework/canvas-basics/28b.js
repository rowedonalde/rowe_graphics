/*
 * Script for 0126 #28b
 *
 * A sunset scene on water
 */

window.onload = 
(
  function()
  {
    //28b
    var canvas28b = document.getElementById('28b');
    var context28b = canvas28b.getContext('2d');
    
    //Draw sky:
    var skyGrad = context28b.createLinearGradient(0, 0, 0, 250);
    skyGrad.addColorStop(0, 'rgb(10, 10, 30)');
    skyGrad.addColorStop(0.85, 'rgb(40, 40, 125)');
    skyGrad.addColorStop(1, 'rgb(50, 50, 150)');
    context28b.fillStyle = skyGrad;
    context28b.fillRect(0, 0, 500, 250);
    
    //Draw ocean:
    var oceanGrad = context28b.createLinearGradient(0, 500, 0, 250);
    oceanGrad.addColorStop(0, 'rgb(10, 20, 20)');
    oceanGrad.addColorStop(0.95, 'rgb(30, 60, 60)');
    oceanGrad.addColorStop(1, 'rgb(50, 100, 100)');
    context28b.fillStyle = oceanGrad;
    context28b.fillRect(0, 250, 500, 250);
    
    //Draw Sun:
    context28b.beginPath();
    context28b.arc(250, 250, 50, 0, Math.PI, true);
    context28b.fillStyle = "rgb(255, 20, 0)";
    context28b.fill();
    
    //Draw Sun's reflection:
    context28b.translate(0, 250);
    context28b.scale(1, 7);
    context28b.beginPath();
    context28b.arc(250, 0, 50, 0, Math.PI, false);
    context28b.fillStyle = "rgba(255, 20, 0, 0.25)";
    context28b.fill();
  }
);