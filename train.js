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
  var data = ctx.getImageData(25, 25, 75, 75)
    , trainingInput = [];

  // take a sparse sampling of pixles in the center of the tile
  for (var i = 0; i < data.data.length; i += 128) {
    trainingInput.push(data.data[i]/255);
    trainingInput.push(data.data[i+1]/255);
    trainingInput.push(data.data[i+2]/255);
  }

  return trainingInput;
}

img.onload = function() {
  function _getPixels(){
    var canvas = new Canvas(128, 128)
      , ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, 128, 128);
    return  _getPixelData(ctx);
  };

  trainingData.push({input: _getPixels(), output: output});

  if (imageLoadIdx > 0) {
    var trainingImage = trainingImages[imageLoadIdx];
    console.log(trainingImage);
    imageLoadIdx--;
    output = {};
    output[trainingImage.letter] = 1;
    img.src = __dirname + trainingImage.path;

    return;
  }

  // when no more images left to load then train
  _trainNetwork();
};

function _trainNetwork() {
  console.log('training with ' + trainingData[0].input.length + ' data points:');
  var trainRes = net.train(trainingData, {errorThresh: 0.004, iterations: 20000});
  networkReady = true;
  console.log('training complete');
}

var trainingData = []
  , trainingImages = []
  , output = {};

// load all training tiles
var files = fs.readdirSync(__dirname + '/images/tiles');
console.log(__dirname + '/images/tiles');
console.log('files.count', files.count);
for (var i = 0; i < files.length; i++) {
  var pattern = /_(.).jpg/,
      fileName = files[i];
  var letter = fileName.match(pattern)[1];
  trainingImages.push({path: '/images/tiles/'+fileName, letter: letter});
}
var imageLoadIdx = trainingImages.length - 1;
console.log('imageLoadIdx', imageLoadIdx);

// get the first tile training data and start the process
function start() {
  output[trainingImages[imageLoadIdx].letter] = 1;
  img.src = __dirname + trainingImages[imageLoadIdx].path;
}

exports.start = function() {
  start();
};

exports.getLetterForTile = function(tileContext) {
  var tilePixels = _getPixelData(tileContext);
  var result = net.run(tilePixels);

  return result;
}

