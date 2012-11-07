var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs');

var img = new Image;

img.onerror = function(e){
  throw e;
};

img.onload = function() {
  var topY = 496 //XXX: 496 is for iphone5 screenshot
    , topX = 0
    , tileSize = 128
    , row = 1
    , col = 1;

  function _extractAndWriteTile(){
    var canvas = new Canvas(128, 128)
      , ctx = canvas.getContext('2d')
      // XXX: hardcoding _2 (for now), this needs to be upgraded to loop through all training sets
      , out = fs.createWriteStream(__dirname + '/data/tile_5_' + row + '_' + col + '.jpg');

    ctx.drawImage(img, topX, topY, 128, 128, 0, 0, 128, 128);

    var stream = canvas.createJPEGStream({
      bufsize : 2048,
      quality : 80
    });

    stream.on('end', function(d){
      _stage();
    });

    stream.pipe(out);
  };

  function _stage(){
    col = (col + 1 > 5) ? 0 : col + 1;

    // 5 rows of 5 tiles
    if (col > 0) {
      topX += tileSize;
    } else {
      topY += tileSize;
      topX = 0;
      col = 1;
      row += 1;
    }

    if (row + 1 > 6) { return; } // done
    _extractAndWriteTile();
  }

  _extractAndWriteTile();
};

// XXX: need to loop through many sets (see above)
img.src = __dirname + '/data/training_005.jpg';

