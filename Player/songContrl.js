var applescript = require('applescript')
var mysql = require("mysql");

//var script = 'tell application "Spotify" to play track "blah"';

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
	var script = 'on getCurrentlyPlayingTrack() \
	tell application "Spotify"\
	set currentTrack to name of current track as String\
	return currentTrack\
	end tell\
	end get currentlyPlayingTrack';

	applescript.execString(script, function(err, rtn) {
	if (err) {
		//Something went wrong
	}
	console.log(rtn);
});
};
//function startPlaylist
//function userId
//function publicId
//function user
//function pushToSite
//fucntion pullFromSite



applescript.execString(script, function(err, rtn) {
	if (err) {
		//Something went wrong
	}
	if (Array.isArray(rtn)) {
		rtn.forEach(function(songName){
			console.log(songName);
		});
	}
});
