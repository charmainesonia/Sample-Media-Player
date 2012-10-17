document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("touchstart", function() {},false);

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
											 that.play.apply(that, arguments)
										 }); 
		
        stopAudioButton.addEventListener("click", 
										 function() {
											 that.stop.apply(that, arguments)
										 });
		
        pauseAudioButton.addEventListener("click", 
										  function() {
											  that.pause.apply(that, arguments)
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
        if(!isPlaying) {
            this.mediaContent.release();
            this.showMessage("");
        }
	},
    
	_onError: function(error) {
		var errorMessage = "code: " + error.code + "\n" +
						   "message: " + error.message + "\n";
        this.showMessage(errorMessage);
	},
    
	play: function() {
        this.mediaContent.play();
        this.showMessage('Playing...');
        isPlaying = true;
	},
    
	pause: function () {
        this.mediaContent.pause();
        this.showMessage('Paused');
	},
    
	stop: function () {
        this.mediaContent.stop();
        this.showMessage('');
        isPlaying = false;
	},
    
    showMessage: function(text) {
        var statusBox = document.getElementById('result');
		statusBox.innerText = text;
    }
}