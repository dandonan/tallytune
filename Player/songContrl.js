var applescript = require('applescript')
var mysql = require("mysql");
var express = require("express");
var async = require("async");
var app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static('public')); 

app.get('/', function(req, res) {
     res.render('Home2.html');
});


app.get('/party', function(req, res) {
     res.render('JoinParty.html');
});

app.get('/join', function(req, res) {
	res.redirect('/rooms/'+ req.query.roomcode);
});

app.get('/rooms/*', function(req, res) {
	songData(function (data) {
		console.log(data);
		res.render('VoteToSkip.html', {album: data.album, artist: data.artist, song: data.song});
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function users(PublicName, Private) {
    this.PublicName = PublicName;
    this.Private = Private;
}

function heredoc (f) {
    return f.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
};

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

con.query('select * from userData',function(err,rows){
    if (err) throw err;

    //console.log('Data received from Db:\n');
    //console.log(rows);
});


var CurrentParty;

function skipNeed(){
	var partyID = "888888";
	var sheeple = con.query("select userData.partyID from userData where userData.partyID = " + partyID,function(err,rows){
		if (err) throw err;
		console.log(rows.length);
		return rows.length;
	});
	//var sheeple = attendance.length;
	var voteNeed = sheeple/2 + 1;
	return voteNeed;
};
skipNeed();

function skipCheck(voteNeed){
	var partyID = CurrentParty;
	var wantSkip = con.query("select userData.partyID,userData.wantSkip from userData where userData.partyID = " + partyID + "and userData.wantSkip = true",function(err,rows){
		if (err) throw err;
		return rows.length;
	});
	if(wantSkip > voteNeed) skipper();
};

function skipper(){
	var script = heredoc(function(){/*
		tell application "Spotify"
			next track
		end tell
	*/})
}

function songData(cb){
	var SongInfo = {};
	async.parallel([
		function (hollaback) {
			var trackNameScript = heredoc(function(){/*
				tell application "Spotify"
					set currentTrack to name of current track as string
					return currentTrack
				end tell
			*/});

			applescript.execString(trackNameScript, function(err, rtn) {
				if (err) {
					//Something went wrong
				}
				console.log(rtn);
				SongInfo.song = rtn;
				hollaback();
			});
		},
		function (hollaback) {

			var trackArtistScript = heredoc(function(){/*
				tell application "Spotify"
					set currentTrack2 to artist of current track as string
					return currentTrack2
				end tell
			*/});

			applescript.execString(trackArtistScript, function(err, rtn) {
				if (err) {
					//Something went wrong
				}
				console.log(rtn);
				SongInfo.artist = rtn;
				hollaback();
			});
		},
		function (hollaback) {

			var trackAlbumScript = heredoc(function(){/*
				tell application "Spotify"
					set currentTrack3 to album of current track as string
					return currentTrack3
				end tell
			*/});

			applescript.execString(trackAlbumScript, function(err, rtn) {
				if (err) {
					//Something went wrong
				}
				console.log(rtn);
				SongInfo.album = rtn;
				hollaback();
			});
		}],
		function () {
			console.log(SongInfo);
			cb(SongInfo);
		});
};

//function pushToSite
//fucntion pullFromSite

function HostNew(){
    var id = makePid();
    partyID = id;
 	//add inital play functionality
}

function makePid()
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	for(var i = 0; i < 6; i++){
		text += possible.charAt(Math.floor(Math.random() * possilbe.length));
	}
	return text;
}

function userId(){
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < 10; i++){
        text += possible.charAt(Math.floor(Math.random() * possilbe.length));
    }
    return text;
}

/*function publicId(){
    var PubName = //input from website
    var User = new users(PubName, userId());

}*/

/*applescript.execString(script, function(err, rtn) {
	if (err) {
		//Something went wrong
	}
	if (Array.isArray(rtn)) {
		rtn.forEach(function(songName){
			console.log(songName);
		});
	}
});*/
con.end(function(err){
    //The connection is terminated gracefully
    //Ensures all previously enqueued quereis are still
    //before sending a COM_QUIT packed to the MySql server.
});