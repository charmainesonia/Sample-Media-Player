document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("touchstart", function() {}, false);

var mediaPlayer;

function onDeviceReady() {
	mediaPlayer = new MediaPlayer();
	mediaPlayer.run();
}

function MediaPlayer() {
}

MediaPlayer.prototype = {
	mediaContent : null,
	isPlaying : false,
    
	run: function() {
		var src = "http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3",
		that = this;
        
		var playAudioButton = document.getElementById("buttonPlayAudio"),
		stopAudioButton = document.getElementById("buttonStopAudio"),
		pauseAudioButton = document.getElementById("buttonPauseAudio");
                                
		playAudioButton.addEventListener("click",
										 function() {
											 that._play.apply(that, arguments)
										 }); 
		
		stopAudioButton.addEventListener("click", 
										 function() {
											 that._stop.apply(that, arguments)
										 });
		
		pauseAudioButton.addEventListener("click", 
										  function() {
											  that._pause.apply(that, arguments)
										  });
        
		that.mediaContent = new Media(src, 
									  function() {
										  that._onMediaSuccess.apply(that, arguments);
									  },
									  function() {
										  that._onError.apply(that, arguments);
									  });
	},
    
	_onMediaSuccess: function() {
		if (!this.isPlaying) {
			this.mediaContent.release();
			this._showMessage("");
		}
	},
    
	_onError: function(error) {
		var errorMessage = "code: " + error.code + "\n" +
						   "message: " + error.message + "\n";
		this._showMessage(errorMessage);
	},
    
	_play: function() {
		this.mediaContent.play();
		this._showMessage('Playing...');
		this.isPlaying = true;
	},
    
	_pause: function () {
		this.mediaContent.pause();
		this._showMessage('Paused');
	},
    
	_stop: function () {
		this.mediaContent.stop();
		this._showMessage('');
		this.isPlaying = false;
	},
    
	_showMessage: function(text) {
		var statusBox = document.getElementById('result');
		statusBox.innerText = text;
	}
}