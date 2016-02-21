//--native_auido = false
var mysql = require("mysql");

function users(Public, Private) {
    this.Public = Public;
    this.Private = Private;
}

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


		

