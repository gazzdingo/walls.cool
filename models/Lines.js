/**
 * genorates random lines
 * 
 * @param  {float} width
 * @param  {float} height
 * @param  {Random} rand 
 * @param  {Paper} paperObj
 * @return {string} base64 image
 */
var lines = function(width, height, rand, paperObj){

	with (paperObj) {
		//setting up the image size
		paper.setup(new Size(width, height));
		
		//setting up how many line will be drawn 
		var amount = view.bounds.width / Math.floor(Math.random() *(40 - 12) + 12);
		//for adding all the paths to a group so we can add filters to them.
		var drawingGroup = new Group();
		drawingGroup.strokeBounds = new Path.Rectangle({
			x: 0,
			y: 0,
			height: amount,
			width: amount
		});
		for (var i = 0; i < Math.floor(rand(20)); i++) {

			var size = (rand(100) + 40)* 0.5;
			var position  = new Point(rand(width - size) + size, rand(height - size) + size);

			var circle = new Path.Circle(position, size);
			circle.strokeColor = "black";
			circle.blendMode = "add";
			var path = new Path()
			console.log(rand());
			circle.fillColor = new Color(Math.random(), Math.random(), Math.random());
			drawingGroup.addChild(circle);
		};

		// adding each line/path
		for (var i = 0; i <= height; i += amount) {
	    	// creating a new path for the lines
	    	var path = new Path();
	    	path.strokeColor = "black";
		    // creating random points from 0 - width
		    path.add(new Point(0, i))
		    for (var j = 1; j < width; j++) {
		    	j += Math.floor(Math.random() * 30);
		    	if(j > width) j = width;
		    	path.add(new Point(j, i));

		    };
		    path.add(new Point(width, i));

	    	//randomly rotating the line to make it look more hand drawn 
	    	path.rotate(Math.random() * (2 - -2) + -2);
	    	//adding this to the drawing group
	    	drawingGroup.addChild(path);

	    }

	    applyNoiseToPath(drawingGroup, 20, 50.0, 6.0);

	    var crop1 = new Path();
	    crop1.add(new Point(-300,-100));
	    crop1.add(new Point(100,-100));
	    crop1.strokeColor = 'pink';
	    var crop1a = new Path();
	    crop1a.add(new Point(-100,-300));
	    crop1a.add(new Point(-100, 100));
	    crop1a.strokeColor = 'blue';


	    var crop1 = new Path();
	    var crop1a = new Path();

	    var crop1 = new Path();
	    var crop1a = new Path();
	    
	    var crop1 = new Path();
	    var crop1a = new Path();

	    var projectRaster = project.layers[0].rasterize();
	    var dataString = projectRaster.toDataURL();
		return dataString;

	}
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

module.exports = lines;