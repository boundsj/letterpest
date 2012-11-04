var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , Brain = require('brain')
  , net = new Brain.NeuralNetwork()
  , img = new Image;

img.onerror = function(e){
  throw e;
};

img.onload = function() {
  function _getPixelData(ctx) {
    var data = ctx.getImageData(42, 42, 42, 42)
    //var data = ctx.getImageData(0, 0, 1, 1)
      , trainingInput = [];

    // take a sparse sampling of pixles in the center of the tile
    for (var i = 0; i < data.data.length; i += 32) {
      trainingInput.push(data.data[i]/255);
      trainingInput.push(data.data[i+1]/255);
      trainingInput.push(data.data[i+2]/255);
    }

    return trainingInput;
  }

  function _getPixels(){
    var canvas = new Canvas(128, 128)
      , ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, 128, 128);
    return  _getPixelData(ctx);
  };

  trainingData.push({input: _getPixels(), output: output});

  if (imageLoadIdx > 0) {
    imageLoadIdx--;
    var trainingImage = trainingImages[imageLoadIdx];
    console.log(trainingImage);
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
  //console.log('trainingData', trainingData);
  var trainRes = net.train(trainingData, {errorThresh: 0.004, iterations: 20000});
  console.log(trainRes);

  // XXX: after network is trained, then we can process "brain net" requests
  var letterTest = trainingData[24];
  var result = net.run(letterTest.input);
  console.log('test letter', letterTest.output, 'result', result);
}

var trainingData = []
  , trainingImages = []
  , output = {};

// load all training tiles
var files = fs.readdirSync(__dirname + '/images/tiles');
for (var i = 0; i < files.length; i++) {
  var pattern = /_(.).jpg/,
      fileName = files[i];
  var letter = fileName.match(pattern)[1];
  trainingImages.push({path: '/images/tiles/'+fileName, letter: letter});
}

var imageLoadIdx = trainingImages.length - 1;

// get the first tile training data and start the process
output[trainingImages[imageLoadIdx].letter] = 1;
console.log(trainingImages[imageLoadIdx]);
img.src = __dirname + trainingImages[imageLoadIdx].path;

