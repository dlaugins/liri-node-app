var Spotify = require('node-spotify-api');
// console.log('this is loaded');

exports.spotify = new Spotify( {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});