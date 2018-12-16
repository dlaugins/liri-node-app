
var axios = require("axios");
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var moment = require('moment');
var Spotify = require('node-spotify-api');

// console.log(keys.spotify)
// var spotify = new Spotify(keys.spotify);
var request = require("request")

// Grab or assemble the movie name and store it in a variable called "movieName"



// This line is just to help us debug against the actual URL.
// request(queryUrl, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var result = JSON.parse(body);
//             console.log(result.Year);
//             console.log(result);
//     }
// });

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
function processArguments(val1, val2) {
    switch (val1) {
        case "concert-this":
            var artist = val2;
            concertthis2(artist);
            logData("concert-this " + val2);
            break;

        case "spotify-this-song":
            var song = val2;
            spotifyThisSong(song);
            console.log("spotify-this-song")
            logData("spotify-this-song " + val2);
            break;

        case "movie-this":
            var movie = val2
            moviethis(movie)
            console.log("movie-this")
            logData("movie-this " + val2);
            break;

        case "do-what-it-says":
            console.log("do-what-it-says")
            doWhatItSays()
            logData("do-what-it-says ");
            break;
    }
}

processArguments(process.argv[2], process.argv[3]);

function concertthis2(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    //var queryUrl = "https://rest.bandsintown.com/artists/ladygaga/events?app_id=codingbootcamp"
    // This line is just to help us debug against the actual URL.
    console.log(artist, "is playing at the following locations:");
    axios.get(queryUrl).then(
        response => {
            // console.log(response.data);
            response.data.forEach(function (res) {
                //console.log(res);
                console.log("--------------------");
                console.log(res.venue.name + " in " + res.venue.city + " on " + moment(res.datetime).format('MMMM Do YYYY, h:mm:ss a'));
            });
        })
        .catch(error => {
            console.log(error);
        });

}
function spotifyThisSong(song) {
    console.log(song)
    if (song === undefined) {
        song = " the sign ace of base"
    }

    keys.spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log("error in search ", err)
        };


        // console.log(data.tracks.items);
        //console.log(data.tracks.items[0].name);
        console.log("*******")
        console.log(data.tracks.items[0].name + " by " + data.tracks.items[0].album.artists[0].name +
            " from the album " + data.tracks.items[0].album.name +
            " Paste the url in browser to hear a preview!: " + data.tracks.items[0].preview_url);



    });
}
function moviethis(movie) {
    if (movie === undefined) {
        movie = "Mr. Nobody "
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"
    //var queryUrl = "https://rest.bandsintown.com/artists/ladygaga/events?app_id=codingbootcamp"
    // This line is just to help us debug against the actual URL.

    axios.get(queryUrl).then(
        response => {
            var res = response.data;
            // console.log(response.data);
            // console.log(res);
            console.log("--------------------");
            console.log("Title: " + res.Title);
            console.log("Year: " + res.Year);
            console.log("Rating: " + res.Rated);
            console.log("Reviews: " + res.Ratings[1].Value);
            console.log("Country: " + res.Country);
            console.log("language: " + res.Language);
            console.log("Plot: " + res.Plot);
            console.log("Actors: " + res.Actors);

        })

        .catch(error => {
            console.log(error);
        });

}
function doWhatItSays() {
    fs.readFile('./random.txt', 'utf-8', function read(err, data) {
        if (err) {
            throw err;
        }

        var command = data.split(",")
        processArguments(command[0], command[1]);
    });
}

function logData(data) {
    var divider = "\n------------------------------------------------------------\n\n";
    fs.appendFile("log.txt", data + divider, function (err) {
        if (err) throw err;
    });

}
