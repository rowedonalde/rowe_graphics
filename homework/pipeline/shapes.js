/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    },
    
    /*
     * Returns the vertices for a sphere
     */
    sphere: function () {
        //Constant by which a degree value can be multiplied to convert it to
        //radians. Useful here since the JS trig functions take and return RAD
        // JD: You need only calculate this once, either as
        //     a property or as a local variable (safer).
        var degreesToRadians = Math.PI / 180;
        
        //Loop variable declarations:
        var phi, phiR, phiR20, theta, thetaR;
        
        //The array holding the coordinates of all vertices except the poles
        //in the order necessary to connect them in a "STRIP" pattern
        var stripVertices = Array();

        
        
        //Variables that hold the x, y, and z coordinates of a given vertex:
        var x, y, z;
        
        //Draw everything but the poles:
        for (phi = -180; phi <= 80; phi += 20) {
            phiR = phi * degreesToRadians;
            phiR20 = (phi + 20) * degreesToRadians;
            
            for (theta = -180; theta <= 180; theta += 20) {
                thetaR = theta * degreesToRadians;
                
                //Calculate and push the vertex on this circle:
                x = Math.sin(thetaR) * Math.cos(phiR);
                y = Math.cos(thetaR) * Math.cos(phiR);
                z = Math.sin(phiR);
                stripVertices = stripVertices.concat(x, y, z);
                
                //Calculate and push the vertex on the next circle:
                x = Math.sin(thetaR) * Math.cos(phiR20);
                y = Math.cos(thetaR) * Math.cos(phiR20);
                z = Math.sin(phiR20);
                stripVertices = stripVertices.concat(x, y, z);
            }
        }
        
        //Constants for RAD values of sine and cosine of 80 deg:
        // JD: More constant candidates, as you mention.
        var sin80 = Math.sin(80 * degreesToRadians);
        var cos80 = Math.cos(80 * degreesToRadians);
        
        
        //Draw the far pole:
        var pole1Vertices = Array();
        
        //Add the far tip:
        pole1Vertices = pole1Vertices.concat(0, 0, 1);
        
        //Add the far ring:
        for (theta = -180; theta <= 180; theta += 10) {
            thetaR = theta * degreesToRadians;
            x = Math.sin(thetaR) * cos80;
            y = Math.cos(thetaR) * cos80;
            z = sin80;
            pole1Vertices = pole1Vertices.concat(x, y, z);
        }
        
        
        //Draw the near pole:
        var pole2Vertices = Array();
        
        //Add the near:
        pole2Vertices = pole2Vertices.concat(0, 0, -1);
        
        //Add the near ring:
        for (theta = -180; theta <= 180; theta += 10) {
            thetaR = theta * degreesToRadians;
            x = Math.sin(thetaR) * cos80;
            y = Math.cos(thetaR) * cos80;
            z = -sin80;
            
            pole2Vertices = pole2Vertices.concat(x, y, z);
        }
        
        
        //Return an object containing both the strip patterns and
        //the poles:
        return {strip: stripVertices, fan1: pole1Vertices, fan2: pole2Vertices};
    }

};
