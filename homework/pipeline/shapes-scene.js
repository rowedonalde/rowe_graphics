/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        rotationMatrix,
        vertexPosition,
        vertexColor,
        instanceMatrix,
        projectionMatrix,
        cameraMatrix,
        normalVector,
        cameraMatrix4x4,
        eyeX = 0,
        eyeY = 1,
        eyeZ = -2,
        atX = 0,
        atY = 0,
        atZ = 0,
        upX = 0,
        upY = 1,
        upZ = 0,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,
        currentPoint,

        /*
         * This code does not really belong here: it should live
         * in a separate library of matrix and transformation
         * functions.  It is here only to show you how matrices
         * can be used with GLSL.
         *
         * Based on the original glRotate reference:
         *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
         */
        getRotationMatrix = function (angle, x, y, z) {
            // In production code, this function should be associated
            // with a matrix object with associated functions.
            var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
                s = Math.sin(angle * Math.PI / 180.0),
                c = Math.cos(angle * Math.PI / 180.0),
                oneMinusC = 1.0 - c,

                // We can't calculate this until we have normalized
                // the axis vector of rotation.
                x2, // "2" for "squared."
                y2,
                z2,
                xy,
                yz,
                xz,
                xs,
                ys,
                zs;

            // Normalize the axis vector of rotation.
            x /= axisLength;
            y /= axisLength;
            z /= axisLength;

            // *Now* we can calculate the other terms.
            x2 = x * x;
            y2 = y * y;
            z2 = z * z;
            xy = x * y;
            yz = y * z;
            xz = x * z;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            // GL expects its matrices in column major order.
            return [
                (x2 * oneMinusC) + c,
                (xy * oneMinusC) + zs,
                (xz * oneMinusC) - ys,
                0.0,

                (xy * oneMinusC) - zs,
                (y2 * oneMinusC) + c,
                (yz * oneMinusC) + xs,
                0.0,

                (xz * oneMinusC) + ys,
                (yz * oneMinusC) - xs,
                (z2 * oneMinusC) + c,
                0.0,

                0.0,
                0.0,
                0.0,
                1.0
            ];
        },
        
        /*
         * This function takes a vertex coordinate array of the format
         * [x0, y0, z0, x1, y1, z1, ..., xn, yn, zn] (i.e., the standard way)
         * and applies the given matrix transformation to each point defined by
         * that array.
         * TODO: Perhaps put this in Matrix4x4 instead?         
         */
        applyMatrix = function(vertices, matrix) {
            for (i = 0; i < vertices.length; i += 3) {
                var matrix4x4Static = new Matrix4x4();
                var currentPoint = matrix4x4Static.point3d(vertices[i],
                                                           vertices[i + 1],
                                                           vertices[i + 2]);
                //Transform it:
                currentPoint = matrix4x4Static.multiply(matrix, currentPoint);
                
                //Set the points into the vertices:
                vertices[i] = currentPoint.getX();
                vertices[i + 1] = currentPoint.getY();
                vertices[i + 2] = currentPoint.getZ();
            }
            
            return vertices;
        };

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.
    var matrix4x4Static = new Matrix4x4();
    
    //Tetrahedron:
    var tetra1Side = Shapes.tetrahedron()['fan1'];
    var tetra1Base = Shapes.tetrahedron()['fan2'];
    //Concatenate the transformation matrices:
    var tetra1Tran = matrix4x4Static.concatenate([
        matrix4x4Static.rotate('x', 90),
        matrix4x4Static.scale(.5, .5, .5),
        matrix4x4Static.translate(1, 1, 2)
    ]);
    tetra1Side = applyMatrix(tetra1Side, tetra1Tran);
    tetra1Base = applyMatrix(tetra1Base, tetra1Tran);
    
    //Squished Sphere:
    var sphere1Body = Shapes.sphere()['strip'];
    var sphere1Pole1 = Shapes.sphere()['fan1'];
    var sphere1Pole2 = Shapes.sphere()['fan2'];
    //Concatenate the transformation matrices:
    var sphere1Tran = matrix4x4Static.concatenate([
        matrix4x4Static.scale(.3, .1, .3),
        matrix4x4Static.rotate('y', 45),
        matrix4x4Static.translate(-1, -1, -2)
    ]);
    sphere1Body = applyMatrix(sphere1Body, sphere1Tran);
    sphere1Pole1 = applyMatrix(sphere1Pole1, sphere1Tran);
    sphere1Pole2 = applyMatrix(sphere1Pole1, sphere1Tran);
    
    //Tall tetrahedron:
    var tetra2Side = Shapes.tetrahedron()['fan1'];
    var tetra2Base = Shapes.tetrahedron()['fan2'];
    //Concatenate the transformation matrices:
    var tetra2Tran = matrix4x4Static.concatenate([
        
        matrix4x4Static.rotate('x', 45),
        matrix4x4Static.scale(.2, 1.5, .2),
        matrix4x4Static.translate(0, 0, 0)
    ]);
    tetra2Side = applyMatrix(tetra2Side, tetra2Tran);
    tetra2Base = applyMatrix(tetra2Base, tetra2Tran);
    
    objectsToDraw = [
        
        {
            color: { r: 0, g: 1, b: 0},
            vertices: tetra1Side,
            mode: gl.TRIANGLE_FAN
        },
        
        {
            color: { r: 1, g: 0, b: 0},
            vertices: tetra1Base,
            mode: gl.TRIANGLE_FAN
        },
        
        {
            color: { r: .5, g: 1, b: 1},
            vertices: tetra2Side,
            mode: gl.TRIANGLE_FAN
        },
        
        {
            color: { r: 1, g: .5, b: .5},
            vertices: tetra2Base,
            mode: gl.TRIANGLE_FAN
        },
        
        {
            color: { r: 1, g: 0, b: 1 },
            vertices: sphere1Body,
            mode: gl.TRIANGLE_STRIP
        },
        
        {
            color: { r: 0, g: 1, b: 1 },
            vertices: sphere1Pole1,
            mode: gl.TRIANGLE_FAN
        },
        
        {
            color: { r: 1, g: 1, b: 0 },
            vertices: sphere1Pole2,
            mode: gl.TRIANGLE_FAN
        },
    ];

    // Pass the vertices to WebGL.
    for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
        objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].vertices);

        if (!objectsToDraw[i].colors) {
            // If we have a single color, we expand that into an array
            // of the same color over and over.
            objectsToDraw[i].colors = [];
            for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                    j < maxj; j += 1) {
                objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                    objectsToDraw[i].color.r,
                    objectsToDraw[i].color.g,
                    objectsToDraw[i].color.b
                );
            }
        }
        objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].colors);
    }

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    normalVector  = gl.getUniformLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);
    
    //View transformation:
    //instanceMatrix = gl.getUniformLocation(shaderProgram, "instanceMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        //Transform the camera:
        cameraMatrix4x4 = matrix4x4Static.camera(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ);
        gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, new Float32Array(cameraMatrix4x4.getGlMatrixArray()));
        
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);
        

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(getRotationMatrix(currentRotation, 0, 1, 0)));

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }
        
        

        // All done.
        gl.flush();
    };
    
    //Projection matrix:
    //gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(matrix4x4Static.identity().getGlMatrixArray()));
    var frustum = matrix4x4Static.frustum(-2 * canvas.width / canvas.height,
                                          2 * canvas.width / canvas.height,
                                          -2,
                                          2,
                                          -20,
                                          3).getGlMatrixArray();
    //alert(frustum);    
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(frustum));
    
    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });
    
    //If the user presses W/A/S/D, move in the appropriate direction:
    $(document).keydown(function(e) {
      switch (e.keyCode) {
        case 87: //w
            eyeZ += 0.25;
            atZ += 0.25;
            upZ += 0.25;
            break;
        case 83: //s
            eyeZ -= 0.25;
            atZ -= 0.25;
            upZ -= 0.25;
            break;
        case 65: //a
            eyeX -= 0.25;
            atX -= 0.25;
            upX -= 0.25;
            break;
        case 68: //d
            eyeX += 0.25;
            atX += 0.25;
            upX += 0.25;
            break
        default:
            break
      }
      
      drawScene();
    });

}(document.getElementById("shapes-scene")));
