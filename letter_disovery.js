var wordGraph = {}
  , _ = require('underscore')
  , fs = require('fs')
  , dictionary = [];

var setup = function(){
  loadDictionary();
  buildTrie();
}

var loadDictionary = function(){
  dictionary = fs.readFileSync('./data/dictionaries/english.txt')
                     .toString()
                     .toLowerCase()
                     .split('\n');
  //dictionary = ['album', 'wood', 'woodless'];
};

var buildTrie = function(){
  for (var i = 0; i < dictionary.length; i++){
    var word = dictionary[i];
    var head = word.substring(0, 1);
    var tail = word.substring(1, word.length).split('');

    // add root letter to graph if not already there
    if (wordGraph[head] === undefined){
      wordGraph[head] = {letter: head, valid: false, links: {}, parent: null};
    }

    var root = wordGraph[head];
    var currentNode = root;

    // subsequent letters added to graph
    for (var j = 0; j < tail.length; j++){
      var letter = tail[j];
      var link = currentNode.links[letter];
      var valid = (j === tail.length - 1) ? true : false;

      if (link === undefined){
        var node = {letter: letter, valid: valid, links: {}, parent: currentNode};
        currentNode.links[letter] = node;
        currentNode = node;
      } else {
        // don't invalidate previously known good nodes
        link.valid = (link.valid === true) ? true : valid;
        currentNode = link;
      }
    }
  }
};

var searchTrie = function(input){
  var letters = input.split('');
  var startedLetters = [];
  var words = [];
  var frequency = getLetterFrequency(input);
  console.log('input', input, 'freq', frequency);

  for (var i = 0; i < letters.length; i++) {
    var letter = letters[i];
    if (_.contains(startedLetters, letter)) { continue; }
    startedLetters.push(letter);

    var availableLetters = _.clone(letters);
    availableLetters.splice(i, 1);
    var root = wordGraph[letter];

    function traverseNodes(node){
      if (node === undefined) { return; }

      if (node.valid === true) {
        var buildWord = _.memoize(function(w, node) {
          return node.parent === null ? node.letter + w : node.letter + buildWord(w, node.parent);
        });
        var word = buildWord('', node).split('').reverse().join('');
        if (word.length > input.length) { return; }
        if (invalidLetterFrequency(frequency, getLetterFrequency(word), word)) { return; }
        words.push(word);
      }

      var keys = _.keys(node.links);
      var intersect = _.intersection(keys, availableLetters);
      for (letter in intersect) {
        var letter = intersect[letter];
        traverseNodes(node.links[letter]);
      }
    }
    traverseNodes(root);
  }

  return words;
};

var invalidLetterFrequency = function(set, word) {
  for (setLetter in set) {
    var wordLetterCount = word[setLetter] || 0;
    var setLetterCount = set[setLetter];
    if (wordLetterCount > setLetterCount) { return true; }
  }

  return false;
};


var getLetterFrequency = function(chars){
  var counts = {};
  _.map(chars.split(''), function(char){
    if (counts.hasOwnProperty(char)){
      counts[char]++;
      return;
    };
    counts[char] = 1;
  });
  return counts;
};

var run = function(){
  setup();
  var prompt = require('prompt');
  prompt.start();

  var respond = function(err, res){
    if (res.letters === "exit") { return; }
    var words = searchTrie(res.letters);
    console.log(words);
    setupRespond();
  };

  var setupRespond = function(){
    prompt.get(['letters'], respond);
  };
  setupRespond();
};
//setup();
//run();

exports.loadDictionary = setup;
exports.searchTrie = searchTrie;
