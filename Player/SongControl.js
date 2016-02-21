--native_auido = false

function users(Public, Private) {
    this.Public = Public;
    this.Private = Private;
}

var resumeFunction = spotify.useNodjsAudio(handleAudio);
function handleAudio(err, buffer) {
  if(err) throw err;
  var needMoreData = true;
  // write buffer somewhere, set needMoreData
  // if necessary call resumeFunction();
  return needMoreData;
}

var options = {
    settingsFolder: 'settings',
    cacheFolder: 'cache',
    traceFile: 'trace.txt' //default is empty,
    appkeyFile: 'spotify_appkey.key' //required
}
var spotify = require('spotify')(options);

playlist.on({
    playlistRenamed: function(err, playlist),
    tracksAdded: function(err, playlist, track[], position),
    tracksMoved: function(err, playlist, trackIndices[], newPosition),
    tracksRemoved: function(err, playlist, trackIndices[]),
    trackCreatedChanged: function(err, playlist, position, user, date),
    trackSeenChanged: function(err, playlist, position, seen),
    trackMessageChanged: function(err, playlist, position, message)
});

playlistContainer.on({
    playlistAdded: function(err, newPlaylist, position),
    playlistMoved: function(err, position, newPosition),
    playlistRemoved: function(err, position)
});

spotify.on({
    ready: function(),
    metadataUpdated: function(),
    logout: function()
});

spotify.player.on({
    endOfTrack: function()
});

console.log(spotify.remeberedUser);

spotify.login('myusername','mypassword', true, false);

playlistContainer RootList
user sessionUser

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
var playlist = spotify.playlistContainer.getPlaylists()[14];
spotify.waitForLoaded([playlist], waitForTrack);

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
    console.log("Playing First Playlist in Library:" partyPlay.name);
    if(party == true)play();
    else pause();
}

function userId(){
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < 10; i++){
        text += possible.charAt(Math.floor(Math.random() * possilbe.length));
    }
    return text;
}

function publicId(){
    var PubName = //input from website
    var User = new users(PubName, userId());

}

player player

int skip = 0; //variable to determine skip
int attendence; //total number of people logged into party
int skipNeed = attendance/2 + 1;
int PlayLength = numTracks();
int CurrentPlay = 1;
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

var endOfTrack = function() {
    console.log('End of track reached');
};


		

