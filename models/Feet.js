
var fs = require('fs');
var path = require('path');

var ClassicalNoise = require('../utils/ClassicalNoise');


// gloabals for the breasts, nipples and paper object
var paper = null;
var noiseSeed = Math.random() * 255;
var noise = new ClassicalNoise();

/**
 * this is creates the entire breast/breasts
 *
 * @param {float} width
 * @param {float} height
 * @param {Random} random seed genorator(to make it repoducible to print)
 * @param {paperObj}  the paperjs object
 *
 * @return {string} the sting is a base64 encoded representation of the image to render on the app
 */
 var Feet = function(width, height, rand, paperObj, paperObject, cardName) {
	//setting the paperjs object
	var paper = paperObj;

	this.render = function() {
		// var breastLeft = new (randomFromArray(breastType))();
		// var breastRight = new (randomFromArray(breastType))();
		// var nippleLeft = new (randomFromArray(nippleTypes))();
		// var nippleRight = new (randomFromArray(nippleTypes))();
		with(paper){
      var canvas = paper.createCanvas(width, height, 'pdf');
			paper.setup(canvas);
      var dir = new Point(0, -1);
      // dir = dir.rotate(-60.0 + Math.random() * 120.0);
      // dir = dir.normalize();

      var feetPoints = new LeftPart().draw(10, dir, 100.0 + Math.random() * 150.0, 5 + Math.random() + 5);
      new SimpleLineRenderPreset().draw(feetPoints);
      var toePoints1 = new drawToes().draw(feetPoints[0], 0.01);
      new SimpleLineRenderPreset().draw(toePoints1);
      var toePoints2 = new drawToes().draw(toePoints1[toePoints1.length-1], 0.01);
      new SimpleLineRenderPreset().draw(toePoints2);
      var toePoints3 = new drawToes().draw(toePoints2[toePoints2.length-1], 0.01);
      new SimpleLineRenderPreset().draw(toePoints3);

    }
			// var group = new Group();
			// var groupRight = new Group();
			// var bounds = new Path.Rectangle({
			// 	point: [0,0],
			// 	size: [width, height]
			// });
      // var text = new PointText(new Point(width / 1.3, height - 50));
      //   text.content = cardName;
      //   text.style = {
      //       fontFamily: 'Moon Flower',
      //       fontWeight: 'regular',
      //       fontSize: 24,
      //       fillColor: 'black',
      //       justification: 'center'
      //   };
			// bounds.strokeColor ='black';
      // var height = 60 + Math.random() * 120;
      // var leftPartOfFoot = LeftPart.draw(height)
			// group.addChild();
			// group.addChild(nipple.draw(rectFeets));
			// var rightGroup = group.clone();
      //
      //
			// var breast2 =  new roundFeets();
			// groupRight.addChild(breasts.draw(rectFeets));
			// var nipple = new bummpyNipple();
			// groupRight.addChild(nipple.draw(rectFeets));
      //
			// groupRight.position.x += rectFeets.width + Math.random() * 50;
      //
      //
			// applyNoiseToPath(group, 6, 40.0, 6.0);
			// applyNoiseToPath(groupRight, 6, 40.0, 6.0);
      //
		  //   //clone that group to make a second outline
		  //   var groupRight2 = groupRight.clone();
		  //   var group2 = group.clone();
      //
      //
		  //   group2.strokeWidth = 0.5;
		  //   group2.fillColor = undefined; //remove fill
		  //   applyNoiseToPath(group2, 6, 10.0, 4.0);
      //
		  //   groupRight2.strokeWidth = 0.5;
		  //   groupRight2.fillColor = undefined; //remove fill
      //
		  //   //apply some more noise to the cloned group
		  //   applyNoiseToPath(groupRight2, 6, 10.0, 4.0);
      //   if(paperObject) {
      //     paper.view.update();
      //     fs.writeFile(path.resolve('../pdf/out.pdf'), canvas.toBuffer(), function (err) {
      //         if (err)
      //             throw err;
      //         console.log('Saved!');
      //     });
        // }
        with(paper) {
		    var projectRaster = project.layers[0].rasterize();
		    var dataString = projectRaster.toDataURL();
        }
		    return dataString;
		// }
}
//renders the points as simple lines
var SimpleLineRenderPreset = function()
{
    this.bSmoothPath = Math.random() >= 0.5 ? true : false;

    //_points: An array of points to draw
    this.draw = function(_points)
    {
      with(paper) {
        var path = new Path();
        path.strokeColor = "black";

        for(var i = 0; i < _points.length; i++)
        {
            path.add(_points[i]);
        }

        // if(this.bSmoothPath)
            path.smooth();

        return path;
      }
    }
};
var LeftPart = function() {
  this.offsetFact = 30 + Math.random() * 30;
  this.wobbleAmount = 2;
  this.draw = function(_origin, _direction, _length, _segmentCount)
    {
      with(paper) {
        var ret = [];
        var stepSize = _length / _segmentCount;
        var maxout = _segmentCount * ( 0.2+ Math.random() * 0.3);
        var distaceOut  = 0.5 + Math.random() * 2;
        var count = 0;
        var normal = _direction.rotate(90);
        normal = normal.normalize();

        var maxOffset = _length * this.offsetFact;
        for(var i = 0; i < _segmentCount; i++)
        {
          console.log(_direction);
            var p = _direction.multiply(stepSize * i).add(_origin);
            console.log('\n\n',_direction, "helllllo \n\n");
            if(maxout > i) {
              count++;
              p.x += distaceOut;
            }
            p = p.add(normal.multiply(maxOffset + Math.random() * this.wobbleAmount));
            // console.log(normal.multiply(maxOffset + Math.random() * (i / _segmentCount)));
            if(maxout > i) {
              count++;
            } else {
              count -= 2;
              if(count < 0){count = 0;}
            }
            p.x -= distaceOut* count;
            p.normalize();

            ret.push(p);
        }

        return ret;
      }
    }
}

function bezier(t, p0, p1, p2, p3){
  var cX = 3 * (p1.x - p0.x),
      bX = 3 * (p2.x - p1.x) - cX,
      aX = p3.x - p0.x - cX - bX;

  var cY = 3 * (p1.y - p0.y),
      bY = 3 * (p2.y - p1.y) - cY,
      aY = p3.y - p0.y - cY - bY;

  var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
  var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
  with(paper) {
    return new Point(x, y);
  }
}
var drawToes = function(){

  this.draw = function(_origin, accuracy)
    {
      with (paper) {
        var points = [];
        var p1 = _origin.add(20+Math.random() * 10);
        var p2 = _origin.add(30+Math.random() * 5);
        var p3 = _origin.add(new Point(35+ Math.random() * 5, 0));

        for (var i=0; i<1; i+=accuracy){
           var p = bezier(i, _origin, p1, p2, p3);
           points.push(p);
        }
        return points;
      }
    }
}




/**
 * TODO:  - a breast can be asymmetric
 *        - nipples can be different heights
 *		  - nipples can be different types
 *
 */

// this is for all the different breast types

/**
 * creates the outline of the breast
 *
 * @return {Path} outline of the breast
 */

/**
 * getting a random object from an array.
 *
 * @param  {array}
 * @param  {Random}
 * @return {object}
 */
function randomFromArray(array, rand)
{
	var randomIndex = Math.round(Math.random() * (array.length - 1));
	return array[randomIndex];

}

/**
 * This is for applying noise to a path or a group of paths
 *
 * TODO: need to move this out and make it global
 *
 * @param  {path || group} path
 * @param  {float} sampleDist
 * @param  {float} noiseDiv
 * @param  {float} noiseScale
 *
 */
function applyNoiseToPath(path, sampleDist, noiseDiv, noiseScale)
{
	with (paper) {

		if (path instanceof Group) {

			for (var i = 0; i < path.children.length; i++) {
				applyNoiseToPath(path.children[i], sampleDist, noiseDiv, noiseScale);
			}

		} else {

			if (sampleDist < path.length)
				path.flatten(sampleDist);

			for (var i = 0; i < path.segments.length; i++) {
				var noiseX = noise.noise(path.segments[i].point.x / noiseDiv,
					path.segments[i].point.y / noiseDiv,
					noiseSeed);
				var noiseY = noise.noise(path.segments[i].point.y / noiseDiv,
					noiseSeed,
					path.segments[i].point.x / noiseDiv);

				path.segments[i].point = path.segments[i].point.add(new Point(noiseX, noiseY).multiply(noiseScale));
			}

			path.smooth();
		}
	}
}

/**
 * divides a path up in to new points array
 *
 * @param  {object} obj
 * @param  {int}
 * @param  {boolean}
 * @param  {boolean}
 * @return {array}
 */
function divideEven(obj, num, divOrDist, fit){
	if (arguments.length != 4 ||
		typeof arguments[0] !== 'object' ||
		typeof arguments[1] !== 'number' ||
		typeof arguments[2] !== 'boolean' ||
		typeof arguments[3] !== 'boolean' ||
		arguments[1] <= 0) return false

	var pathLength = obj.length;
	var points = [];
	var divs = Math.round(num);

	if (!divOrDist) {
		if (fit) {
			divs = Math.round(pathLength / num);
		} else {
			divs = pathLength / num;
		}
	}

	for (var i = 0; i < divs; i++) {

		points.push(obj.getPointAt(i / divs * pathLength));

	}
	points.push(obj.getPointAt(pathLength));

	return points;
}

/**
 * halton algorithm for adding dots within an object
 *
 * @param {int} baseX
 * @param {int}	baseY
 */
var Halton = function(baseX, baseY){

	this.x = baseX;
	this.y = baseY;

	this.getPoints = function(obj, count, offset){
		with (paper) {

			var points = [],
			objekt = obj ? obj : document.activeArtboard,
			size = objekt.bounds.size,
			pointOffset = objekt.bounds.topLeft,
			offset = Math.round(offset);

			for (var i = 0 + offset; i < count + offset; i++) {
				var point = new Point(this.halton(i, this.x), this.halton(i, this.y)).multiply(size).add(pointOffset);

				if (obj){
					if (objekt.contains(point)) {
						points.push(point);
					}
				} else {
					 points.push(point);
				}
			}
			return points;
		}
	}

	this.halton = function(index, base){
		var result = 0,
		f = 1 / base,
		i = index;

		while (i > 0) {
			result = result + f * (i % base);
			i = Math.floor(i / base);
			f = f / base;
		}
		return result;
	}
}
}
module.exports = Feet;
