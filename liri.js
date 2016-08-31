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
for (var i = 3; i < nodeArgs.length; i++) {
 // Build a string for the search term
 searchItem += nodeArgs[i] + " ";
};
console.log(searchItem);

function commands(userCommand) {switch (userCommand) {
 case ("my-tweets"):
  var params = {
   screen_name: 'zachlowe_nba'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
   //compiling last twenty tweets from user
   if (!error) {
    for (i = 0; i < 20; i++) {
     console.log(tweets[i].text + "\n");
    }
   }
  });
  break;
 case ("spotify-this-song"):
  // if no search query entered, returns "The Sign" by Ace of Base
  if (searchItem == "") {
   spotify.lookup({
    type: 'track',
    id: "0hrBpAOgrt8RXigk83LLNE"
   }, function (err, data) {
    if (err) {
     console.log('Error occurred: ' + err);
     return;
    } else {
     console.log("Artist: " + data.artists[0].name);
     console.log("Song Name: " + data.name);
     console.log("Album Name: " + data.album.name);
     console.log("Preview URL: " + data.preview_url + "\n");
    };
   })
  } else {
   spotify.search({
    type: 'track',
    query: searchItem
   }, function (err, data) {
    if (err) {
     console.log('Error occurred: ' + err);
     return;
    } else {
     console.log("Artist: " + data.tracks.items[0].artists[0].name);
     console.log("Song Name: " + data.tracks.items[0].name);
     console.log("Album Name: " + data.tracks.items[0].album.name);
     console.log("Preview URL: " + data.tracks.items[0].preview_url + "\n");
    };
   })

  };
  break;
 case ("movie-this"):
  //if no search query entered returns the film "Mr. Nobody"
  if (searchItem == "") {
   request('http://www.omdbapi.com/?t=Mr+Nobody&tomatoes=true', function (error, response, body) {
    if (!error && response.statusCode == 200) {
     console.log("Title: " + JSON.parse(body)["Title"]);
     console.log("Release Year: " + JSON.parse(body)["Year"]);
     console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
     console.log("Country: " + JSON.parse(body)["Country"]);
     console.log("Language: " + JSON.parse(body)["Language"]);
     console.log("Plot: " + JSON.parse(body)["Plot"]);
     console.log("Actors: " + JSON.parse(body)["Actors"]);
     console.log("Rotten Tomatoes Tomato Meter: " + JSON.parse(body)["tomatoMeter"]);
     console.log("Link to Rotten Tomatoes: " + JSON.parse(body)["tomatoURL"]);
    }
   })
  } else {
   request('http://www.omdbapi.com/?t=' + searchItem + "&tomatoes=true", function (error, response, body) {
    if (!error && response.statusCode == 200) {
     console.log("Title: " + JSON.parse(body)["Title"]);
     console.log("Release Year: " + JSON.parse(body)["Year"]);
     console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
     console.log("Country: " + JSON.parse(body)["Country"]);
     console.log("Language: " + JSON.parse(body)["Language"]);
     console.log("Plot: " + JSON.parse(body)["Plot"]);
     console.log("Actors: " + JSON.parse(body)["Actors"]);
     console.log("Rotten Tomatoes Tomato Meter: " + JSON.parse(body)["tomatoMeter"]);
     console.log("Link to Rotten Tomatoes: " + JSON.parse(body)["tomatoURL"]);

    }
   });
  }

  break;
 case ("do-what-it-says"):
  fs.readFile("random.txt", "utf8", function (error, data) {
   var dataArr = data.split(',');
   userCommand = dataArr[0];
   searchItem = dataArr[1];
   commands(userCommand);
  });
  break;
 default:
  console.log("Please enter a valid command");
  break;
} //end of switch
                    };
commands(userCommand)