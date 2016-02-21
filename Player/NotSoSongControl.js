//--native_auido = false
var mysql = require("mysql");

function users(Public, Private) {
    this.Public = Public;
    this.Private = Private;
}

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '4e4c173ad3294d79ba685cedc4650f16'; // Your client id
var client_secret = '969b58f8055449f58801fb3042d80f15'; // Your client secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'streaming user-read-private user-read-email user-library-read playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);


var options = {
    settingsFolder: 'settings',
    cacheFolder: 'cache',
    traceFile: 'trace.txt', //default is empty,
    appkeyFile: 'spotify_appkey.key' //required
}

var spotify = require('node-spotify')({appkeyFile:'spotify_appkey.key'});

//First you need to craete a connection to the database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "tallyData"
});

con.connect(function(err) {
    if(err){
        console.log('Error connectiong to the database');
        return;
    }
    console.log('Connection to the database established');
});

con.query('select * from partyData',function(err,rows){
    if (err) throw err;

    console.log('Data received from Db:\n');
    console.log(rows);
});



con.end(function(err){
    //The connection is terminated gracefully
    //Ensures all previously enqueued quereis are still
    //before sending a COM_QUIT packed to the MySql server.
});

console.log(spotify.remeberedUser);

spotify.login('danyedidovich','Don@n7477', true, true);

//spotify.login('danyedidovich','Don@n7477', true, true);

console.log(spotify.playlistContainer);
//user sessionUser;

function printTrack(track) {
	console.log(track);
}

function waitForTrack(playlist) {
    //At this point the playlist will be loaded
    var track = playlist.getTracks()[0];
    track.position = 0;
    console.log('Track is loaded: ' + track.isLoaded);
    spotify.waitForLoaded([track], printTrack);
}
//initalize the first playlist in the host's library to be the playlist played
//var playlist = spotify.playlistContainer.getPlaylists()[1];
//spotify.waitForLoaded([playlist], waitForTrack);

function makePid()
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	for(var i = 0; i < 6; i++){
		text += possible.charAt(Math.floor(Math.random() * possilbe.length));
	}
	return text;
}

function HostNew(){
    var id = makePid();
    var partyPlay = RootList(1);
    //console.log("Playing First Playlist in Library:" partyPlay.name);
    if(party == true)play();
    else pause();
}

/*function userId(){
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < 10; i++){
        text += possible.charAt(Math.floor(Math.random() * possilbe.length));
    }
    return text;
}*/

/*function publicId(){
    var PubName = //input from website
    var User = new users(PubName, userId());

}*/

//player player //may or may not need this line, can't remeber why I put it here in the first place

/*function playSongs(playlist){
    var skip = 0; //variable to determine skip
    var attendence; //total number of people logged into party
    var skipNeed = attendance/2 + 1;
    var PlayLength = numTracks();
    var CurrentPlay = 1;
    while(CurrentPlay < PlayLength){
        PlayLength = numTracks();
    	if(skip entered){
    		skip += 1;
    	}
    	if(skip > skipNeed){
    		stop();
    		CurrentPlay += 1;
    		void play(track CurrentPlay);
    	}
    }
}*/

/*var endOfTrack = function() {
    console.log('End of track reached');
};*/
/*
function checkTheRest(database){
    var attendance = ;//total guests at party
    var Threshold = ;//percent of partygoes with song in top playlist for song to be added into party list
    //set by the host....THIS IS A REACHY REACHY GOAL IF EVERYTHING AND I MEAN EVERYTHING IS WORKING
    var songs[2048];
    while(database->users){
        //think of a way to do this nonesense at some point maybe, if we feel like it
    }
}*/


		

