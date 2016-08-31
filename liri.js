// requiring keys.js to read keys.js file data
var keys = require('./keys.js');
// requiring NPMs for twitter, spotify and request
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

//assinging keys to variables for twitter call
var consKey = keys.twitterKeys.consumer_key;
var consSecret = keys.twitterKeys.consumer_secret;
var accessKey = keys.twitterKeys.access_token_key;
var accessSecret = keys.twitterKeys.access_token_secret;
console.log(consKey+"\n"+consSecret+"\n"+accessKey+"\n"+accessSecret)

//for recording user command
var userInput = process.argv[2]
//for recording user input such as song or movie
for 