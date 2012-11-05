var express = require('express')
  , app = express()
  , train = require('./train.js')
  , extract_tiles = require('./extract_tiles.js')
  , extractor = new extract_tiles.Extractor()
  , engines = require('consolidate');

app.engine('html', engines.hogan);
app.use('/static', express.static(__dirname + '/public'));
app.use(express.bodyParser({uploadDir:'./uploads'}));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// XXX: need to, accept incoming image
//      convert it to 2d context
//      break out all the tile data
//      pass tile data "getLetterForTile" and collect respones
//      show responses

app.get('/', function(req, res){
  //var result = train.getLetterForTile();
  res.render('index', {
    title: 'translate the tiles!'
  });
});

app.post('/file-upload', function(req, res){
  var uploadPath = __dirname + '/' + req.files.image_name.path;
  console.log(uploadPath);
  extractor.on("done", function(contexts) {
    var letters = [];
    for (var i = 0; i < contexts.length; i++) {
      var tileContext = contexts[i];
      var result = train.getLetterForTile(tileContext);
      letters.push(result);
    }
    res.send(letters);
  });
  extractor.extractFromPath(uploadPath);
});

app.listen(3000);

// XXX: logically, server should wait on training to finish
train.start();

