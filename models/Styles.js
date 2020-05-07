var paper = require('paper');
var path = require('path');
var fs = require('fs');

var ClassicalNoise = require('../utils/ClassicalNoise');
var Squares = require('./Squares');
var Feet = require('./Feet');
var Lines = require('./Lines');


module.exports = {

	colorSquare: function(width, height, rand)
	{
		with(paper) {
			var squares = new Squares(width, height, rand, paper);
			var squaresBase64 = squares.render();
		    return squaresBase64;
		}
	},
	feet: function(width, height, rand, outputObject, cardName) {
		with(paper) {
			var feet = new Feet(width, height, rand, paper, outputObject, cardName);
			var feetBase64 = feet.render();
		    return feetBase64;
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
