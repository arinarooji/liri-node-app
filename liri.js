//Grab the data from keys.js
var Keys = require('./keys.js');

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
        console.log("TOP 3 RESULTS");
        for (var i = 0; i < 3; i++) {
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


//Commands
//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    
    //my-tweets : show last 20 tweets
        //Read docs

    //spotify-this-song '<song name here>': show song info (artist, song name, preview link, album) (default to "The Sign" by Ace of Base)
        //sign up as dev for credentials
    
    //node liri.js movie-this '<movie name here>' : show movie data (default mr nobody)
