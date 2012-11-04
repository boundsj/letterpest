var Canvas = require('canvas')
  , canvas = new Canvas(200,200)
  , Image = Canvas.Image
  , ctx = canvas.getContext('2d')
  , fs = require('fs');

fs.readFile(__dirname + '/images/training_001.jpg', function(err, imgSrc){
  if (err) throw err;
  img = new Image;
  img.src = imgSrc;
  ctx.drawImage(img, 0, 0, img.width / 4, img.height / 4);
  console.log(ctx);
  _getPixelData();
});

function _getPixelData() {
  var data = ctx.getImageData(0, 0, 1, 1);
  console.log(data);
}

