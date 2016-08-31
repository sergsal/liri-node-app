// requiring keys.js to read keys.js file data
var keys = require('./keys.js');
// requiring NPMs for fs, twitter, spotify and request
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

//assinging keys for twitter call
var client = new twitter({
				consumer_key: keys.twitterKeys.consumer_key,
				consumer_secret: keys.twitterKeys.consumer_secret,
				access_token_key: keys.twitterKeys.access_token_key,
				access_token_secret: keys.twitterKeys.access_token_secret,
});

//for recording user command
var userCommand = process.argv[2];
var nodeArgs = process.argv;
var searchItem = "";
//for recording user input such as song or movie, starting at 3 to capture search term, index 2 is for command
for (var i=3; i<nodeArgs.length; i++){

  // Build a string for the search term
	searchItem += nodeArgs[i]+" " ;
};
console.log(searchItem);
switch(userCommand) {
								case("my-tweets"):
								var params = {screen_name: 'zachlowe_nba'};
								client.get('statuses/user_timeline', params, function(error, tweets, response) {
  						if (!error) {
												for (i=0; i<20; i++){
																console.log(tweets[i].text);
												}
								}		
});
								break;
								case("spotify-this-song"):
								spotify.search({ type: 'track', query: searchItem, limit: 1}, function(err, data) {
												if ( err ) {
																console.log('Error occurred: ' + err);
																return;
												} else {
																for (i=0;i<5;i++) {
																				console.log("Artist: "+data.tracks.items[i].artists[0].name);
																				console.log("Song Name: "+data.tracks.items[i].name);
																				console.log("Album Name: "+data.tracks.items[i].album.name);
																				console.log("Preview URL: "+data.tracks.items[i].preview_url+"\n");
																};
												};
});
								break;
								case("movie-ths"):
								//holder;
								break;
								case("do-what-it-says"):
								//holder;
								break;
								
}