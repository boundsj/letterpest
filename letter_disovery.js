var wordGraph = {}
  , _ = require('underscore')
  , fs = require('fs');

var dictionary = fs.readFileSync('english.txt').toString().toLowerCase().split('\n');

var buildTrie = function() {
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

var searchTrie = function(input) {
  var letters = input.split('');
  console.log('letters', letters);
  var startedLetters = [];

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
        if (word.length <= input.length) {
          console.log(word);
        }
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
};

buildTrie();

var prompt = require('prompt');
prompt.start();
var respond = function(err, res){
  if (res.letters === "exit") { return; }
  searchTrie(res.letters);
  setupRespond();
};
var setupRespond = function(){
  prompt.get(['letters'], respond);
};
setupRespond();

