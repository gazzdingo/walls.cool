var paper = require('paper');
var path = require('path');
var fs = require('fs');

var ClassicalNoise = require('../utils/ClassicalNoise');
var Breasts = require('./Breast');
var Squares = require('./Squares');
var Lines = require('./Lines');


module.exports = {

	colorSquare: function(width, height, rand)
	{
		with(paper) {
			var squares = new Squares(width, height, rand, paper);
			var squaresBase64 = Squares.render();
		    return squaresBase64;
		}
	},

	breasts:  function(width, height, rand)
	{
		with(paper) {
			var breasts = new Breasts(width, height, rand, paper);
			var breastBase64 = breasts.render();
		    return breastBase64;
		}
	},

	linesWithNoise: function(width, height, rand)
	{
		with(paper) {
			var lines = new Lines(width, height, rand, paper);
			var lineBase64 = lines.render();
		    return lineBase64;
		}
	} 

};