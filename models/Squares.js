var Squares = function(width, height, rand, paperObj){
	this.render = function() {	
		with (paperObj) {
			paperObj.setup(new Size(width, height));
			var amount = view.bounds.width / 25;
			var colors = ['#EFEADB','#EFEADB','#EFEADB', '#E97956', '#A5C87C', '#856755', '#F2AA62', '#9F5788', '#64C6DD', '#59697A', '#F9D768', '#AE343D'];
			for (var i = 0; i <= width; i += amount) {
				for (var j = 0; j < height; j += amount) {
					var size = amount;    
					var color  = colors[Math.floor(rand(colors.length))];
					var test = new Path.Rectangle({
						x: i,
						y: j,
						height: amount,
						width: amount,
						fillColor: color,
						strokeFill: 'black'
					});
				}
			}
			var projectRaster = project.layers[0].rasterize();
			var dataString = projectRaster.toDataURL();

			return dataString;
		}
	}
}

module.exports = Squares;
