var express = require('express');
var paper = require('paper');
var path = require('path');
var fs = require('fs');
var styles = require('../models/Styles');
var router = express.Router();
var rand = require('random-seed').create();

/**
 * renders the index page and genorates the art
 * 
 */
router.get('/', function(req, res, next) {
	// creating a seed based on the current unix timestamp
	var seedNum = Math.floor(Date.now() / 1000);
	var SEED =  seedNum.toString();
	// setting the seed to the random generator
	rand.seed(SEED);
	var WIDTH= 500,HEIGHT = 700;
	// list of all the styles
	// TODO: update it from being numbers to being a string of the names
	var stylesIndex = [1,2];
	var type = stylesIndex[Math.floor(rand(stylesIndex.length))];
	// this is the data
	var imageBase64 = "";
	switch(type) {
		case 1:
			imageBase64 = styles.breasts(WIDTH,HEIGHT,rand);
			break;
		case 2:
			imageBase64 = styles.breasts(WIDTH,HEIGHT,rand);

	}

  	res.render('index', { image: imageBase64, seed: SEED });

});

/**
 * this is for taking in the payment token and creatin the payment
 *
 */
router.get('/pay', function(req, res, next) {
		var stripe = require("stripe")("XXXX-XXXXX-XXXX");

		// Get the credit card details submitted by the form
		var token = req.body.stripeToken; // Using Express

		// Create a charge: this will charge the user's card
		var charge = stripe.charges.create({
		  amount: 4500, // Amount in cents
		  currency: "usd",
		  source: token,
		  description: "Example charge"
		}, function(err, charge) {
		  if (err && err.type === 'StripeCardError') {
		    // The card has been declined
		  }
		});
});





module.exports = router;
