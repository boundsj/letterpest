var express = require('express')
  , app = express()
  , train = require('./train.js')
  , extract_tiles = require('./extract_tiles.js')
  , letter_discovery = require('./letter_disovery.js')
  , engines = require('consolidate')
  , _ = require('underscore');

app.engine('html', engines.hogan);
app.use('/static', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.bodyParser({uploadDir:'./uploads'}));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/file-upload', function(req, res){
  var uploadPath = __dirname + '/' + req.files.image_name.path;
  console.log(uploadPath);

  extractor = new extract_tiles.Extractor();

  // after we've got the tile canvas contexts, pass them through
  // learning algo and get letter results
  extractor.on("done", function(contexts) {
    var letters = [];
    var lettersUpperCase = [];

    // for every tile's canvas context...
    for (var i = 0; i < contexts.length; i++) {
      var tileContext = contexts[i];
      var resultSet = train.getLetterForTile(tileContext);

     // this is fucked, the leanring algo returns back an odd result set :PP
      var sorted = _.sortBy(resultSet, function(result){ return 1 / result });
      var letter = null;
      var max = sorted[0];
      for (property in resultSet) {
        if (resultSet[property] === max) {
          letter = property;
          break;
        }
      }

      // push the letter that is guessed by the learning algo
      // into our result set
      //letters.push({letter: letter});
      letters.push(letter.toLowerCase());
      lettersUpperCase.push(letter.toUpperCase());
    }

    var words = letter_discovery.searchTrie(letters.join(''));

    res.render('result', {
      image: '/' + req.files.image_name.path,
      letters: letters,
      letters_row1: lettersUpperCase.slice(0, 5),
      letters_row2: lettersUpperCase.slice(5, 10),
      letters_row3: lettersUpperCase.slice(10, 15),
      letters_row4: lettersUpperCase.slice(15, 20),
      letters_row5: lettersUpperCase.slice(20, 25),
      words: _.sortBy(words, function(word) { return 1 / word.length; })
    });
  });

  extractor.extractFromPath(uploadPath);
});

// there will be a delay
// might be better to make a callback and have the
// web server give some descriptive error while we are in the
// loading/training state
letter_discovery.loadDictionary();
train.start();

var port = process.env.PORT || 3000
app.listen(port);
console.log('listening on port:', port);


