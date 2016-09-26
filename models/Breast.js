
var ClassicalNoise = require('../utils/ClassicalNoise');


// gloabals for the breasts, nipples and paper object
var breastType = [BellBreastss, eastWestbreast, sideSetBreasts, slenderBreasts, tearDropBreasts, roundBreasts];
var nippleTypes = [protrudingNipple, FlatNipple, puffyNipple, invertedNipple, bummpyNipple, hairyNipple, thirdNipple];
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
 var breast = function(width, height, rand, paperObj){
	//setting the paperjs object
	paper = paperObj;

	this.render = function() {
		// var breastLeft = new (randomFromArray(breastType))();
		// var breastRight = new (randomFromArray(breastType))();
		// var nippleLeft = new (randomFromArray(nippleTypes))();
		// var nippleRight = new (randomFromArray(nippleTypes))();
		with(paper) {

			paper.setup(new Size(width, height));
			var group = new Group();
			var groupRight = new Group();
			var bounds = new Path.Rectangle({
				point: [0,0],
				size: [width, height]
			});
			bounds.strokeColor ='black';
			var rectBreasts = new setupRectangle((width * 0.2) + (Math.random() * (width * 0.1)), width, height);
			var breasts =  new roundBreasts();
			group.addChild(breasts.draw(rectBreasts));
			var nipple = new bummpyNipple();
			group.addChild(nipple.draw(rectBreasts));
			var rightGroup = group.clone();


			var breast2 =  new roundBreasts();
			groupRight.addChild(breasts.draw(rectBreasts));
			var nipple = new bummpyNipple();
			groupRight.addChild(nipple.draw(rectBreasts));

			groupRight.position.x += rectBreasts.width + Math.random() * 50;


			applyNoiseToPath(group, 6, 40.0, 6.0);
			applyNoiseToPath(groupRight, 6, 40.0, 6.0);

		    //clone that group to make a second outline
		    var groupRight2 = groupRight.clone();
		    var group2 = group.clone();


		    group2.strokeWidth = 0.5;
		    group2.fillColor = undefined; //remove fill
		    applyNoiseToPath(group2, 6, 10.0, 4.0);

		    groupRight2.strokeWidth = 0.5;
		    groupRight2.fillColor = undefined; //remove fill
		    
		    //apply some more noise to the cloned group
		    applyNoiseToPath(groupRight2, 6, 10.0, 4.0);

		    var projectRaster = project.layers[0].rasterize();
		    var dataString = projectRaster.toDataURL();

		    return dataString;
		}
	}
}

/**
 * this crates a random rectangle for the breast outline
 *
 * @param {float} size
 *
 * @return {Rectangle}  the outline for the breast
*/
var setupRectangle = function(size, boundsWidth, boundsHeight) {

	with(paper) {
		// genorating a random width and height based on the size
		var w = size * (0.75 + Math.random() * 0.75);
		var h = size * (0.75 + Math.random() * 0.75);

	    // the position where the breast is going to be placed
	    var position = new Point((boundsWidth/2)-(w/2), (boundsHeight/2) );
		// this is the rectangle outline for the breast
		var rectangle = new Rectangle({
			point: position.subtract(new Point(w, h).multiply(0.5)),
			size: [w, h]
		}); 

		return rectangle;
	}
}


/**
 * TODO:  - a breast can be asymmetric
 *        - nipples can be different heights
 *		  - nipples can be different types
 *
 */

// this is for all the different breast types

var BellBreastss = function() {
	this.draw = function() {

	}	
}

var eastWestbreast = function() {
	this.draw = function() {

	}
}

var sideSetBreasts = function() {
	this.draw = function() {

	}
}

var slenderBreasts = function() {
	this.draw = function() {

	}
}

var tearDropBreasts = function() {
	this.draw = function() {

	}
}
/**
 * creates the outline of the breast
 * 
 * @return {Path} outline of the breast
 */
var roundBreasts = function() {

	this.draw = function(ellipseRect) {


		with (paper) {
			// this is the group for the breast 

	        //creating an elipse path for the breast 
	        var ellipse = new Path.Ellipse(ellipseRect);

	        // this returns 40 even spaced points around the ellipse
	        var points = divideEven(ellipse, 40, true,  false);
	        var path =  new Path();

			//this is nugdging the points around the ellipse to make it look more hand drawn
			//this also remove the top part of the ellipse
			var cutLow = Math.round(Math.random() * 10);
			var cutHigh = 10 + Math.round(Math.random() * 10); 
			for (var i = cutHigh; i < points.length; i++) 
			{
				var result = points[i].add(Math.random() * (2 - -2) + -2);
				path.add(result);
			};
			for (var i = 0; i < cutLow; i++) 
			{
				var result = points[i].add(Math.random() * (2 - -2) + -2);
				path.add(result);
			};
			// senting the path look
			path.strokeColor = 'black';
			ellipse.remove();
			return path;

		}
	}
}

// this is for all the different nipples

var protrudingNipple = function() {
	this.draw = function() {

	}
}

var FlatNipple = function() {
	this.draw = function() {

	}
}

var puffyNipple = function() {
	this.draw = function() {

	}
}

var invertedNipple = function() {
	this.draw = function() {

	}
}

/**
 * drawing a group of paths for the nipple
 * 
 * @return {Group} group of all the paths
 */
var bummpyNipple = function() {
	this.draw = function(ellipseRect) {

		with (paper) {
			var group = new Group();
			var centerPoint = ellipseRect.center;
			// centerPoint = centerPoint.add(Math.random() * (1 - -1) + -10);
			var rectangleCenter = new Rectangle({
				point: centerPoint,
				size: [10 + Math.random() * 10,  10 + Math.random() * 10]
			});

	        // removes the ellipse as i have re-drawn the path to look more hand drawn

	        var nippleBumpy = new Path.Ellipse(rectangleCenter);


	        nippleBumpy.strokeWidth = 1;
	        nippleBumpy.position.y +=  (ellipseRect.height/2) - (Math.random() * (ellipseRect.height/2)) ;
			// nippleBumpy.position.x +=  (ellipseRect.height/2) - (Math.random() * (ellipseRect.height/2)) ;

			var colorFill = Math.random() >= 0.5 ? true: false;

			var howDark = Math.random();
			nippleBumpy.fillColor = new Color(1, 1, 1);

			if (colorFill)
				nippleBumpy.fillColor = new Color(howDark, howDark, howDark);

			nippleBumpy.strokeColor = "black";

			var outter = nippleBumpy.clone();
			outter.scale(2 + Math.random() * 2);
			outter.fillColor = undefined;
			var halton = new Halton(2, 3);

			var haltonPoints = halton.getPoints(outter, 20, Math.random() * 20);
			for (var i = 0; i < haltonPoints.length; i++) {
				var rectanglepoint = new Rectangle({
					point: haltonPoints[i],
					size: [2, 2]
				});

				var ellipsePoint = new Path.Ellipse(rectanglepoint);
				ellipsePoint.fillColor = 'black';
				ellipsePoint.insertBelow(nippleBumpy);
				group.addChild(ellipsePoint);

			}
			group.addChild(nippleBumpy);
			group.addChild(outter);
			return group;

		}

	}
}
var hairyNipple = function() {
	this.draw = function() {

	}
}
var thirdNipple = function() {
	this.draw = function() {

	}
}

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
		if(path instanceof Group)
		{
			for(var i = 0; i < path.children.length; i++)
			{
				applyNoiseToPath(path.children[i], sampleDist, noiseDiv, noiseScale);
			}
		}
		else
		{
			if(sampleDist < path.length)
				path.flatten(sampleDist);
			for(var i = 0; i < path.segments.length; i++)
			{
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
	if(arguments.length != 4 ||
		typeof arguments[0] !== 'object' ||
		typeof arguments[1] !== 'number' ||
		typeof arguments[2] !== 'boolean' ||
		typeof arguments[3] !== 'boolean' ||
		arguments[1] <= 0) return false

	var pathLength = obj.length;
	var points = [];
	var divs = Math.round(num);

	if(!divOrDist){
		if(fit){
			divs = Math.round(pathLength / num);
		} else {
			divs = pathLength / num;
		}
	}

	for (var i = 0; i < divs; i++){

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

			for(var i = 0 + offset; i < count + offset; i++){
				var point = new Point(this.halton(i, this.x), this.halton(i, this.y)).multiply(size).add(pointOffset);
				
				if(obj){ if(objekt.contains(point)){
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

		while(i > 0){
			result = result + f * (i % base);
			i = Math.floor(i / base);
			f = f / base;
		}
		return result;
	}
}

module.exports = breast;

