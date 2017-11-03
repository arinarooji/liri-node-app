//Grab the data from keys.js
var Keys = require('./keys.js');

//Then store the keys in a variable
var twitter = Keys.twitterKeys;
var spotify = Keys.spotifyKeys;
var omdb    = Keys.omdbKey;


//Commands
//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    
    //my-tweets : show last 20 tweets
        //Read docs

    //spotify-this-song '<song name here>': show song info (artist, song name, preview link, album) (default to "The Sign" by Ace of Base)
        //sign up as dev for credentials
    
    //node liri.js movie-this '<movie name here>' : show movie data (default mr nobody)
