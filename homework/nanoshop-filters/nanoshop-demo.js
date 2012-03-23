/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;

    // Adapted from original code by Tyler Nichols.
    gradient = renderingContext.createRadialGradient(120, 120, 15, 120, 120, 75);
    gradient.addColorStop(0, "rgb(255, 102, 102)");
    gradient.addColorStop(1, "red");

    // Draw the sphere with a radial gradient
    renderingContext.beginPath();
    renderingContext.fillStyle = gradient;
    renderingContext.arc(150, 150, 75, 0, 2 * Math.PI, true);
    renderingContext.shadowColor = "gray";
    renderingContext.shadowBlur = 20;
    renderingContext.shadowOffsetX = 10;
    renderingContext.shadowOffsetY = 15;
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the top of the cube
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(140, 140, 140)";
    renderingContext.moveTo(300, 300);
    renderingContext.lineTo(335, 265);
    renderingContext.lineTo(435, 265);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(300, 300);
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the face of the cube
    renderingContext.fillStyle = "rgb(110, 110, 110)";
    renderingContext.fillRect(300, 300, 100, 100);

    // Draw the right side of the cube
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(79, 79, 79)";
    renderingContext.moveTo(435, 265);
    renderingContext.lineTo(435, 355);
    renderingContext.lineTo(400, 400);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(435, 265);
    renderingContext.fill();
    renderingContext.closePath();
    
    //When the user clicks the "Darken" button, everything will get darker:
    $('#darkenbutton').click(function()
    {
        // Display a quick alert that we are about to apply the filter.
        alert("Here goes...Darkening!");
    
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                // This is a basic "darkener."
                function (r, g, b, a) {
                    return [r / 2, g / 2, b / 2, a];
                }
            ),
            0,
            0
        );
    });
    
    //When the user clicks the "Lighten" button, everything will get lighter:
    $('#lightenbutton').click(function()
    {
        // Display a quick alert that we are about to apply the filter.
        alert("1, 2, 3...Lightening!");
        
        //Apply the filter:
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                //This is a basic "lightener" that preserves the relative
                //brightness of each color channel:
                
                // JD: These, and the others, should go to Nanoshop, so that
                //     this code can simply reference, e.g., "Nanoshop.lightener".
                function(r, g, b, a) {
                    
                    //The highest level for each color channel:
                    var maxBrightness = 255;
                    
                    //The default lightening factor:
                    var defaultBrightness = 2;
                    
                    //Find the brightest color channel:
                    var brightestColor = Math.max(r, g, b);
                    
                    //This is the factor by which each color is intensified.
                    //The default is 2. If a factor of 2 would cause color 
                    //distortion due to overflow, the brightness factor is
                    //adjusted accordingly.
                    var brightnessFactor = Math.min(defaultBrightness,
                                                    maxBrightness / brightestColor);
                    
                    return [r * brightnessFactor, g * brightnessFactor, b * brightnessFactor, a];
                }
            ),
            0,
            0
        );
    });
    
    //When the user clicks the "Invert" button, all the colors will invert:
    $('#invertbutton').click(function()
    {
        // Display a quick alert that we are about to apply the filter.
        alert("Watch out...Inversion ahead!");
        
        //Apply the filter:
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                //This inverts the colors to create a negative image:
                function(r, g, b, a) {
                    return [255 - r, 255 - g, 255 - b, a];
                }
            ),
            0,
            0
        );
    });
    
    //When the user clicks the "Posterize" button, the color channels will each
    //reduce to 4 shades (including 0), and transparency will be set to 1:
    $('#posterizebutton').click(function()
    {
        //Display a quick alert that we are about to apply the filter:
        alert('Holy Warhol...it\'s posterized!');
        
        //Apply the filter:
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                //This reduces the color depth to create a posterized effect:
                function(r, g, b, a) {
                    //The size of each color jump in terms of the original
                    //depth:
                    var colorGrade = 255 / 3;
                    
                    //Round each color channel up to its nearest jump if it
                    //isn't 0:
                    var rFlat = Math.ceil(r / colorGrade) * colorGrade;
                    var gFlat = Math.ceil(g / colorGrade) * colorGrade;
                    var bFlat = Math.ceil(b / colorGrade) * colorGrade;
                    
                    return [rFlat, gFlat, bFlat, 255];
                }
            ),
            0,
            0
        );
    });
}());
