//Grab the data from keys.js
var Keys    = require('./keys.js');
var request = require('request');
var inquire = require('inquirer');
var fs      = require('fs');

//Then store the keys in a variable
var twitter = Keys.twitterKeys;
var spotify = Keys.spotifyKeys;
var omdb    = Keys.omdbKey;

//PROMPT
inquire.prompt([
    //Take command
    {
        type: 'list',
        message: 'LIRI Command: ',
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: 'command'
    }
]).then(response => {
    //Begin switch statement
    switch (response.command) {
        //Get the 20 most recent tweets
        case "my-tweets":
            GetTweets(20);
            break;

        //Search for a song
        case "spotify-this-song":
            //Retrieve song name
            inquire.prompt([{
                type: 'input',
                message: 'Song name?',
                name: 'song',
                default: 'The Sign, Ace of Base'
            }]).then(retrieve => {
                SongSearch(retrieve.song, 3);
            });
            break;

        //Search for a movie
        case "movie-this":
            inquire.prompt([{
                type: 'input',
                message: 'Movie name?',
                name: 'movie',
                default: 'Mr. Nobody'
            }]).then(retrieve => {
                MovieSearch(retrieve.movie);
            });
            break;

        //Read random.txt for command
        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(err, data) {
                if (err) return console.log(err);
                var array = data.split(",");
                if(array[0] === 'my-tweets') {
                    GetTweets(20);
                }
                else if (array[0] === 'spotify-this-song') {
                    SongSearch(array[1], 3);
                }
                else if (array[0] === 'movie-this') {
                    MovieSearch(array[1]);
                }
                else {
                    console.log("ERROR: Command not recognized.");
                    console.log("Commands: my-tweets OR spotify-this-song,<song-name> OR movie-this,<movie-name>");
                }
            });
            break;

        default:
            console.log("ERROR");
    }
});


//FUNCTIONS===========================
//Using the Twitter api, retrieves user's most recent tweets within the specified limit
function GetTweets(resultLimit) {
    twitter.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < resultLimit; i++) {
                console.log(tweets[i].text, tweets[i].created_at);
            }
        }
    });
}

//Using node-spotify-api, finds a song with the specified result limit
function SongSearch(song, resultLimit) {
    //Search by song name (track)
    spotify.search({ type: 'track', query: song, limit: resultLimit }, function (err, data) {
        if (err) return console.log('Error occurred: ' + err);
        //Iterate through each result (3)
        for (var i = 0; i < resultLimit; i++) {
            //Store desired result properties
            var properties = [(i + 1), data.tracks.items[i].album.artists[0].name, data.tracks.items[i].name, data.tracks.items[i].preview_url, data.tracks.items[i].album.name];
            //Corresponding text (aesthetics)
            var text = ["RESULT: ", "Artist: ", "Song: ", "Preview: ", "Album: "];
            //Space (aesthetics)
            console.log("");
            //Log each property of iterated result
            for (var a = 0; a < properties.length; a++) {
                console.log(text[a], properties[a])
            }
        }
    });
}

//Using Request to make http calls, searchs for a movie utilizing the OMDB API
function MovieSearch(movie) {
    request(omdb.url + movie, function (error, response, body) {
        if (error) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
        }
        //Convert string to JSON object
        var data = JSON.parse(body)
        //Desired properties to log
        var properties = [data.Title, data.Year, data.Rated, data.Ratings[1].Value,
            data.Country, data.Language, data.Plot, data.Actors
        ];
        //Property text (aesthetics)
        var text = ['Title: ', 'Year: ', 'Rated: ', 'Rotten Tomatoes: ',
            'Country: ', 'Language: ', 'Plot: ', 'Actors: '
        ];
        //Log results
        for (var i = 0; i < properties.length; i++) {
            console.log(text[i], properties[i]);
        }
    });
}