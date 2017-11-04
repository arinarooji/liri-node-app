//Grab the data from keys.js
var Keys = require('./keys.js');
var request = require('request');
var inquire = require('inquirer');

//Then store the keys in a variable
var twitter = Keys.twitterKeys;
var spotify = Keys.spotifyKeys;
var omdb = Keys.omdbKey;

//Input (test)
var task = process.argv[2];

//PROMPT
inquire.prompt([
    //Take command
    {
        type: 'list',
        message: 'LIRI command: ',
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: 'command'
    }
]).then(response => {
    //Begin switch/case
    switch (response.command) {
        
        //Get the 20 most recent tweets
        case "my-tweets":
            var resultLimit = 20;
            twitter.get('statuses/user_timeline', function (error, tweets, response) {
                if (!error) {
                    for (var i = 0; i < resultLimit; i++) console.log(tweets[i].text, tweets[i].created_at);
                }
            });
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
                //3 results to be returned
                var resultLimit = 3;
                //Search by song name (track)
                spotify.search({ type: 'track', query: retrieve.song, limit: resultLimit }, function (err, data) {
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
                request(omdb.url + retrieve.movie, function (error, response, body) {
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
            });
            break;

        default:
            console.log("ERROR");
    }
});