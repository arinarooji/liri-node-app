//Grab the data from keys.js
var Keys = require('./keys.js');
var request = require('request');

//Then store the keys in a variable
var twitter = Keys.twitterKeys;
var spotify = Keys.spotifyKeys;
var omdb    = Keys.omdbKey;

//Input (test)
var task = process.argv[2];

//COMMANDS
//Retrieve 20 most recent tweets
if (task.toLowerCase() === "my-tweets") {
    twitter.get('statuses/user_timeline', function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < 20; i++) {
            console.log(tweets[i].text, tweets[i].created_at);
        }
      }
    });
}
//Search by song name (return top 3 results)
else if (task.toLowerCase() === 'spotify') {
    spotify.search({ type: 'track', query: 'I Want it That Way', limit: 3 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < 3; i++) {
            //Result count
            console.log("RESULT: " + (i + 1));
            //Artist name
            console.log("Artist: ", data.tracks.items[i].album.artists[0].name);
            //Song name
            console.log("Song: ", data.tracks.items[i].name);
            //Preview URL
            console.log("Preview: ", data.tracks.items[i].preview_url);
            //Album name
            console.log("Album: ", data.tracks.items[i].album.name);
            //Space (Aesthetics)
            console.log("");
        }
    });
}
//Movie search
else if (task.toLowerCase() === "movie") {
    request(omdb.url+'mr+nobody', function (error, response, body) {
        if (error) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode); 
        }
        //Convert string to JSON object
        var data = JSON.parse(body)
        //Desired properties to log
        var properties = [data.Title, data.Year, data.Rated, data.Ratings[1].Value,
                            data.Country, data.Language, data.Plot, data.Actors];
        //Property text (aesthetics)
        var text = ['Title: ', 'Year: ', 'Rated: ', 'Rotten Tomatoes: ', 
                    'Country: ', 'Language: ', 'Plot: ', 'Actors: '];
        //Log results
        for (var i = 0; i < properties.length; i++) {
            console.log(text[i], properties[i]);
        }
    });
}
