var applescript = require('applescript')
var mysql = require("mysql");

//var script = 'tell application "Spotify" to play track "blah"';

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

songData();

/*set currentlyPlayingTrack to getCurrentlyPlayingTrack()
displayTrackName(currentlyPlayingTrack)

on getCurrentlyPlayingTrack()
	tell application "Spotify"
	set currentArtist to artist of current track as String
	set currentTrack to name of current track as String

	return currentArtist & " - " currentTrack
	end tell
end getCurrentlyPlayingTrack
*/

//function skipChecker
//function skipper
function songData(){
	var script1 = heredoc(function(){/*
		tell application "Spotify"
			set currentTrack to name of current track as string
			return currentTrack
		end tell
	*/});

	applescript.execString(script1, function(err1, rtn1) {
	if (err1) {
		//Something went wrong
	}
	console.log(rtn1);
)};

	var script2 = heredoc(function(){/*
		tell application "Spotify"
			set currentTrack to artist of current track as string
			return currentTrack
		end tell
	*/});

	applescript.execString(script2, function(err2, rtn2) {
	if (err2) {
		//Something went wrong
	}
	console.log(rtn2);
)};

	var script3 = heredoc(function(){/*
		tell application "Spotify"
			set currentTrack to album of current track as string
			return currentTrack
		end tell
	*/});

	applescript.execString(script3, function(err3, rtn3) {
	if (err3) {
		//Something went wrong
	}
	console.log(rtn3);
)};

	var script4 = heredoc(function(){/*
		tell application "Spotify"
			set currentTrack to artwork of current track as string
			return currentTrack
		end tell
	*/});

	applescript.execString(script4, function(err4, rtn4) {
	if (err4) {
		//Something went wrong
	}
	console.log(rtn4);

	var SongInfo = rtn1 + rtn2 + rtn3 + rtn4;
});
};
//function startPlaylist
//function userId
//function publicId
//function user
//function pushToSite
//fucntion pullFromSite

songData();

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
