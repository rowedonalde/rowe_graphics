(function()
  {
    //25a
    var canvas25a = document.getElementById('25a');
    var context25a = canvas25a.getContext('2d');
    context25a.fillStyle = "rgb(0, 0, 255)";
    context25a.translate(100, 100);
    context25a.fillRect(-25, -25, 50, 50);
    
    //25b
    var canvas25b = document.getElementById('25b');
    var context25b = canvas25b.getContext('2d');
    context25b.moveTo(0, 0);
    context25b.lineTo(200, 0);
    context25b.lineTo(200, 200);
    context25b.lineTo(0, 200);
    context25b.lineTo(0, 0);
    context25b.stroke();
    
    //25c
    var canvas25c = document.getElementById('25c');
    var context25c = canvas25c.getContext('2d');
    context25c.fillStyle = "rgba(255, 0, 0, 0.5)";
    context25c.fillRect(75, 50, 75, 50);
    context25c.fillStyle = "rgba(0, 255, 0, 0.5)";
    context25c.fillRect(100, 75, 75, 50);
    
    //25d
    var canvas25d = document.getElementById('25d');
    var context25d = canvas25d.getContext('2d');
    context25d.moveTo(0, 0);
    context25d.lineTo(200, 200);
    context25d.moveTo(0, 200);
    context25d.lineTo(200, 0);
    context25d.strokeStyle = "orange";
    context25d.stroke();
    
    //25e
    var canvas25e = document.getElementById('25e');
    var context25e = canvas25e.getContext('2d');
    context25e.beginPath();
    context25e.moveTo(70, 0);
    context25e.lineTo(140, 0);
    context25e.lineTo(210, 70);
    context25e.lineTo(210, 140);
    context25e.lineTo(140, 210);
    context25e.lineTo(70, 210);
    context25e.lineTo(0, 140);
    context25e.lineTo(0, 70);
    context25e.closePath();
    context25e.fillStyle = "brown";
    context25e.fill();
  }
)();