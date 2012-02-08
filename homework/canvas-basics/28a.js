/*
 * Script for 0126 #28a
 *
 * A sunset scene
 */

window.onload = 
(
  function()
  {
    //28a
    var canvas28a = document.getElementById('28a');
    var context28a = canvas28a.getContext('2d');
    
    //Draw sky:
    var skyGrad = context28a.createLinearGradient(0, 0, 0, 250);
    skyGrad.addColorStop(0, 'rgb(10, 10, 30)');
    skyGrad.addColorStop(0.85, 'rgb(40, 40, 125)');
    skyGrad.addColorStop(1, 'rgb(50, 50, 150)');
    context28a.fillStyle = skyGrad;
    context28a.fillRect(0, 0, 500, 250);
    
    //Draw land:
    var landGrad = context28a.createLinearGradient(0, 500, 0, 250);
    landGrad.addColorStop(0, 'rgb(10, 30, 10)');
    landGrad.addColorStop(0.95, 'rgb(30, 95, 30)');
    landGrad.addColorStop(1, 'rgb(50, 150, 50)');
    context28a.fillStyle = landGrad;
    context28a.fillRect(0, 250, 500, 250);
    
    //Draw Sun:
    context28a.beginPath();
    context28a.arc(250, 250, 50, 0, Math.PI, true);
    context28a.fillStyle = "rgb(255, 20, 0)";
    context28a.fill();
  }
);