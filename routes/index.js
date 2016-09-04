var express = require('express');
var paper = require('paper');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var rand = require('random-seed').create();

/* GET home page. */
router.get('/', function(req, res, next) {
var seedCounter = 0; 
var paperSVG = null;
var seedNum = Math.floor(Date.now() / 1000);
var SEED =  seedNum.toString();
var test = "for testing re gen";
rand.seed(SEED);
with (paper) {

	var WIDTH= 500,HEIGHT = 700;
	paper.setup(new Size(WIDTH, HEIGHT));
 	var amount = view.bounds.width / 25;

    var colors = ['#EFEADB','#EFEADB','#EFEADB', '#E97956', '#A5C87C', '#856755', '#F2AA62', '#9F5788', '#64C6DD', '#59697A', '#F9D768', '#AE343D'];

    for (var i = 0; i <= WIDTH; i += amount) {
    	for (var j = 0; j < HEIGHT; j += amount) {

		    var size = amount;

		    
		    var color  = colors[Math.floor(rand(colors.length))];
		    seedCounter++;
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
	var dataString = projectRaster.toDataURL()
    paperSVG = project.exportSVG({ asString: true });

}




  res.render('index', { title: dataString, seed: SEED });

});

module.exports = router;
