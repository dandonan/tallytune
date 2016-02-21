var applescript = require('applescript')

var script = 'tell application "Spotify" to play track "blah"';

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
