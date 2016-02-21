var applescript = require('applescript')
var mysql = require("mysql");

//var script = 'tell application "Spotify" to play track "blah"';

function users(Public, Private) {
    this.Public = Public;
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


//songData();

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

function songData(){
	var SongInfo = "";
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
	SongInfo += rtn1;
	});

	var script2 = heredoc(function(){/*
		tell application "Spotify"
			set currentTrack2 to artist of current track as string
			return currentTrack2
		end tell
	*/});

	applescript.execString(script2, function(err2, rtn2) {
	if (err2) {
		//Something went wrong
	}
	console.log(rtn2);
	SongInfo += rtn2;
	});

	var script3 = heredoc(function(){/*
		tell application "Spotify"
			set currentTrack3 to album of current track as string
			return currentTrack3
		end tell
	*/});

	applescript.execString(script3, function(err3, rtn3) {
	if (err3) {
		//Something went wrong
	}
	console.log(rtn3);
	SongInfo += rtn3;
	});

	console.log(SongInfo);
	return SongInfo;
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