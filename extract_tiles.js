var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , events = require("events")
  , util = require('util');

var img = new Image;

Extractor = function(){
  events.EventEmitter.call(this);
  var self = this;

  img.onerror = function(e){
    //throw e;
    console.log(e);
  };

  img.onload = function() {
    var topY = 496 //XXX: 496 is for iphone5 screenshot
      , topX = 0
      , tileSize = 128
      , row = 1
      , col = 1
      , contexts = [];

    function _extractAndWriteTile(){
      var canvas = new Canvas(128, 128)
        , ctx = canvas.getContext('2d');

      ctx.drawImage(img, topX, topY, 128, 128, 0, 0, 128, 128);
      contexts.push(ctx);
      _stage();
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

      if (row + 1 > 6) {
        self.emit("done", contexts);
        return;
      }

      _extractAndWriteTile();
    }

    _extractAndWriteTile();
  };
};

util.inherits(Extractor, events.EventEmitter);

Extractor.prototype.extractFromPath = function(path){
  img.src = path;
}

exports.Extractor = Extractor;

