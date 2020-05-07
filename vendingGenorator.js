var express = require('express');
var paper = require('paper');
var path = require('path');
var fs = require('fs');
var styles = require('./models/Styles');
var Printer = require('node-printer');
var rand = require('random-seed').create();

// creating a seed based on the current unix timestamp
var seedNum = Math.floor(Date.now() / 1000);
var SEED =  seedNum.toString();
// setting the seed to the random generator
rand.seed(SEED);
var WIDTH= 595,HEIGHT = 842;
// list of all the styles
// TODO: update it from being numbers to being a string of the names
var stylesIndex = [1,2];
var type = stylesIndex[Math.floor(rand(stylesIndex.length))];
// this is the data
var cardName = ' No Name';
 process.argv.forEach(function (val, index, array) {
   if(index === 2) {
     cardName = val;
   }
});
var imageBase64 = "";
switch(type) {

  case 1:
    imageBase64 = styles.colorSquare(WIDTH,HEIGHT,rand);
    break;

  case 3:
    imageBase64 = styles.linesWithNoise(WIDTH,HEIGHT,rand);
    break;

  default:
    break;

}

  // res.render('index', { image: imageBase64, seed: SEED });
  // var svg = imageBase64.exportSVG({ asString: true });
  // fs.writeFile(path.resolve('./out.pdf'), imageBase64.toBuffer(), function (err) {
  //     if (err)
  //         throw err;
  //     console.log('Saved!');
  // });


  function print() {
    var options = {
        media: 'Custom.200x600mm',
        n: 3
    };

    // Get available printers list
    Printer.list();
    // Create a new Pinter from available devices
    var printer = new Printer(Printer.list()[0]);

    // Print from a buffer, file path or text
    var fileBuffer = fs.readFileSync('../svgs/out.svg');
    var jobFromBuffer = printer.printBuffer(fileBuffer);
    //
    // var filePath = 'package.json';
    // var jobFromFile = printer.printFile(filePath);
    //
    // var text = 'Print text directly, when needed: e.g. barcode printers'
    // var jobFromText = printer.printText(text);

    // Cancel a job
    // jobFromFile.cancel();

    // Listen events from job
    jobFromBuffer.once('sent', function() {
      console.log('Job ' + jobFromBuffer.identifier + 'has been sent');

        jobFromBuffer.on('completed', function() {
            console.log('Job ' + jobFromBuffer.identifier + 'has been printed');
            jobFromBuffer.removeAllListeners();
        });
    });
  }
