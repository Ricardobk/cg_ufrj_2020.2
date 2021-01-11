(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.BasicRenderer = {}));
}(this, (function (exports) { 'use strict';


        /* ------------------------------------------------------------ */



    function dot_product(p1, p2)
	{
		return (p1[0]*p2[0] + p1[1]*p2[1])
	}
	//calcula a normal dos pontos a partir do sentido anti-horário e determina se está dentro da figura com produto escalar. Como ensinado em aula.
	function inside_triangle(x, y, vertices)
	{
		var n1 = [ -1*(vertices[1][1] - vertices[0][1]), (vertices[1][0] - vertices[0][0])]
		var n2 = [ -1*(vertices[2][1] - vertices[1][1]), (vertices[2][0] - vertices[1][0])]
		var n3 = [ -1*(vertices[0][1] - vertices[2][1]), (vertices[0][0] - vertices[2][0])]
		return (dot_product(n1, [x - vertices[0][0], y - vertices[0][1]]) > 0 && dot_product(n2, [x - vertices[1][0], y - vertices[1][1]]) > 0
			 && dot_product(n3, [x - vertices[2][0], y - vertices[2][1]]) > 0)
	}
	//algoritmo baseado em ray casting com sua devida explicação extraido de: https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
	//sim, eu sei que poderia atingir o mesmo resultado quebrando em triangulos, mas considerei essa solução mais simples e eficiente.
	function inside_polygon(x, y, vertices)
	{
		  var c = 0
		  var j = vertices.length-1
		  for (var i = 0; i < vertices.length; j=i++)
		  {
			if ( ((vertices[i][1] > y) != (vertices[j][1] > y)) &&
			 (x < (vertices[j][0]-vertices[i][0]) * (y-vertices[i][1]) / (vertices[j][1]-vertices[i][1]) + vertices[i][0]) )
			   c = !c
		  }
		  if(c)
		  	return true
		  return false
	}
	function inside_circle(r, center, num_triangles, x, y)
	{
		var center_x = center[0]
		var center_y = center[1]
		var a = 360/num_triangles
		var radian = Math.PI/180
		for(var p = 0; p < 30; p++)
		{
			//calcula num_triangles triangulos diferentes a partir das informações da primitiva sendo p1 o centro do círculo. Se o ponto está em algum deles, retorna true.
			var triangle = [ [center_x, center_y], [center_x + Math.sin((p+1)*a*radian)*r, center_y + Math.cos((p+1)*a*radian)*r],
							 [center_x + Math.sin(p*a*radian)*r, center_y + Math.cos(p*a*radian)*r] ]
			if(inside_triangle(x, y, triangle))
				return true
		}
	}
    function inside(  x, y, primitive  )
	{
			var bbox = primitive.bbox
			if(x < bbox[0] || x > bbox[1] || y < bbox[2] || y > bbox[3])
				return false

			if(primitive.shape == "triangle")
			{
				return inside_triangle(x, y, primitive.vertices)
			}
			if(primitive.shape == "circle")
			{
				return inside_circle(primitive.radius, primitive.center, 30, x, y)
			}
			if(primitive.shape == "polygon")
			{
				return inside_polygon(x, y, primitive.vertices)
			}
			return false
    }


    function Screen( width, height, scene ) {
        this.width = width;
        this.height = height;
        this.scene = this.preprocess(scene);
        this.createImage();
    }

    Object.assign( Screen.prototype, {

            preprocess: function(scene) {
                // percorre cada uma das opções de figura e adiciona bounding boxes retangulares para elas. Feita do jeito mais simples criando o menor retangulo que engloba toda a figura.
				//bbox = [min_x, max_x, min_y, max_y]
                var preprop_scene = [];

                for( var primitive of scene ) {
                    if(primitive.shape == "triangle")
					{
						var v = primitive.vertices
						primitive.bbox = [Math.min(v[0][0], v[1][0], v[2][0]), Math.max(v[0][0], v[1][0], v[2][0]), Math.min(v[0][1], v[1][1], v[2][1]), Math.max(v[0][1], v[1][1], v[2][1])]
					}
					if(primitive.shape == "circle")
					{
						var c = primitive.center
						var r = primitive.radius
						primitive.bbox = [c[0] - r, c[0] + r, c[1] - r, c[1] + r]
					}
					if(primitive.shape == "polygon")
					{
						var min_x, min_y = 10000
						var max_x, max_y = -10000
						for(v in primitive.vertices)
						{
							if(primitive.vertices[v][0] < min_x)
								min_x = v[0]
							if(primitive.vertices[v][0] > max_x)
								max_x = v[0]
							if(primitive.vertices[v][1] < min_y)
								min_y = v[1]
							if(primitive.vertices[v][1] > max_y)
								max_y = v[1]
						}
						primitive.bbox = [min_x, max_x, min_y, max_y]
					}
                    preprop_scene.push( primitive );

                }


                return preprop_scene;
            },

            createImage: function() {
                this.image = nj.ones([this.height, this.width, 3]).multiply(255);
            },

            rasterize: function() {
                var color;

                // In this loop, the image attribute must be updated after the rasterization procedure.
                for( var primitive of this.scene ) {

                    // Loop through all pixels
                    for (var i = 0; i < this.width; i++) {
                        var x = i + 0.5;
                        for( var j = 0; j < this.height; j++) {
                            var y = j + 0.5;

                            // First, we check if the pixel center is inside the primitive
                            if ( inside( x, y, primitive ) ) {
                                // only solid colors for now
                                color = nj.array(primitive.color);
								var iform = i
								var jform = j
								//se tiver uma transformação, aplica ela em cada um dos pixels antes de atribuir cor na matriz.
								if(primitive.hasOwnProperty("xform"))
								{
									iform = (primitive.xform[0][0] * i + primitive.xform[0][1] * j + primitive.xform[0][2])
									jform = (primitive.xform[1][0] * i + primitive.xform[1][1] * j + primitive.xform[1][2])
								}
								//O melhor que encontrei para preencher possiveis buracos na matriz
                                this.set_pixel( Math.floor(iform), this.height - (Math.floor(jform) + 1), color );
								this.set_pixel( Math.ceil(iform), this.height - (Math.ceil(jform) + 2), color );
                            }

                        }
                    }
                }



            },

            set_pixel: function( i, j, colorarr ) {
                // We assume that every shape has solid color

                this.image.set(j, i, 0,    colorarr.get(0));
                this.image.set(j, i, 1,    colorarr.get(1));
                this.image.set(j, i, 2,    colorarr.get(2));
            },

            update: function () {
                // Loading HTML element
                var $image = document.getElementById('raster_image');
                $image.width = this.width; $image.height = this.height;

                // Saving the image
                nj.images.save( this.image, $image );
            }
        }
    );

    exports.Screen = Screen;

})));
