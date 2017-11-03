//Twitter
var Twitter = require("twitter");
var twitterKeys = new Twitter ({
  consumer_key: '4LsmsvjIfKfZpx9E3egmCz8DY',
  consumer_secret: 'HR8MWpxVRT2KmTkUbPVFol2r3Ds4R8SdKKyOajDA2cqrRgzG2i',
  access_token_key: '926163597025308673-395iTyhASQB3F8lCicRq8Le7QqPwDNu',
  access_token_secret: 'mPTi0BVS86gdFnXrdj7Ieea5LTvUGcBLZbP1xb1GsICjI',
});

//Spotify
var spotifyKeys = {
  clientID: '010cd4ab4abb47ca88ba3e0b5cf696aa',
  clientSecret: '94a9654ea42e4477aaeab69fe534ecb4'
}

//OMDB
var omdbKey = {
  apiKey: '40e9cece'
}

//Export keys
module.exports = {
  twitterKeys: twitterKeys,
  spotifyKeys: spotifyKeys,
  omdbKey: omdbKey
}