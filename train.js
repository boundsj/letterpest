var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , Brain = require('brain')
  , net = new Brain.NeuralNetwork()
  , img = new Image
  , networkReady = false;

img.onerror = function(e){
  throw e;
};

function _getPixelData(ctx) {
  var data = ctx.getImageData(20, 20, 93, 93)
    , trainingInput = [];

  // take a sparse sampling of pixles in the center of the tile
  for (var i = 0; i < data.data.length; i += 256) {
    trainingInput.push(data.data[i]/255);
    trainingInput.push(data.data[i+1]/255);
    trainingInput.push(data.data[i+2]/255);
  }

  return trainingInput;
}

handleImgLoad = function(){

  function _getPixels(loadedImage){
    var canvas = new Canvas(128, 128)
      , ctx = canvas.getContext('2d');

    ctx.drawImage(loadedImage, 0, 0, 128, 128);
    return  _getPixelData(ctx);
  };

  trainingData.push({input: _getPixels(img), output: output});
  imageLoadIdx--;

  if (imageLoadIdx >= 0) {
    //console.log('imageLoadIdx', imageLoadIdx);
    var trainingImage = trainingImages[imageLoadIdx];
    output = {};
    output[trainingImage.letter] = 1;

    img = new Image();
    img.onload = handleImgLoad;
    img.src = __dirname + trainingImage.path;

    return;
  }

  // when no more images left to load then train
  _trainNetwork();
};

function _trainNetwork() {
  console.log('training with ' + trainingData[0].input.length + ' data points:');
  var trainRes = net.train(trainingData, {log: true, logPeriod: 10, errorThresh: 0.002, iterations: 20000});
  console.log(trainRes);
  networkReady = true;
  console.log('training complete');
}

var trainingData = []
  , trainingImages = []
  , output = {};

// load all training tiles
var files = fs.readdirSync(__dirname + '/data/tiles');
console.log(__dirname + '/data/tiles');
console.log('files.length', files.length);
for (var i = 0; i < files.length; i++) {
  var pattern = /_(.).jpg/,
      // XXX: should not load .DS_Store (or hidden files) how to in node?
      fileName = files[i];
  var letter = fileName.match(pattern)[1];
  trainingImages.push({path: '/data/tiles/'+fileName, letter: letter});
}
var imageLoadIdx = trainingImages.length - 1;
//console.log('imageLoadIdx', imageLoadIdx);

// get the first tile training data and start the process
function start() {
  console.log('loading training images');
  output[trainingImages[imageLoadIdx].letter] = 1;
  img.onload = handleImgLoad;
  img.src = __dirname + trainingImages[imageLoadIdx].path;
}

exports.start = function() {
  start();
};

exports.getLetterForTile = function(tileContext) {
  var tilePixels = _getPixelData(tileContext);
  console.log('getting letter from tile from network');
  var result = net.run(tilePixels);

  return result;
}

