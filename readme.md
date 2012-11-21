
![Letter Pest icon](http://letterpest.herokuapp.com/static/img/letterpest_logo.png) 

### Ruining one of the best games on iOS since 2012

## Development

`11/19/2012`
This application is experimental, untested, and generally just a chance to mess around with an application of computer vision and other algorithms that make great games like Letter Press less fun for everyone! Feel free to steal from it, learn from it, laugh at it, or ignore it! This is a node app and all development was done on a mac - `the instructions below may or may not work for you on your system.`

### Running locally

#### prerequisites

This application uses the node-canvas (npm's canvas package). It's awesome but requires cairo and a several other hairy things before npm will install it. Read the installation instructions on the node-canvas repo for all the deets. Of course, install node and npm (this app has been tested with node 0.8.14 and npm 1.1.65).

#### requisites

Clone this repo and cd into it. npm install all the things. Then, run:

    $ node server.js
    
Go to localhost:3000 in your browser. Nice job.

### This Pest is a learning algorithm!

Maybe you want the machine learning and computer visions? Maybe you want trie algorithms for efficient english dictionary lookup word completion? You can haz it with Pest!

Pest uses node-canvas to scrape pixel rgb data points from Letter Press letter tiles and then feeds them to [brain.js](https://github.com/harthur/brain), a neural network library written in javascript by @harthvader. In this way, the app can learn to recognize letters on a Letter Press board. Once it has all the letters, it can check them against a dictionary to see all the combinations of letters that make up words that can be played in the game. The dictionary lookups are done by using a custom implementation of a [trie algorithm](http://en.wikipedia.org/wiki/Trie).

## Using Letter Pest

Simply go to [letterpest.com](http://www.letterpest.com/) in your iOS 6, safari browser on your iPhone, check out the instrutions, and then start pesting! You can also visit the site from larger screens to see app stats and instructions.



