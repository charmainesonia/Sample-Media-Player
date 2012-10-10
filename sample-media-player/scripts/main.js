var mediaContent = null; 
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var src = "http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3";
    mediaContent = new Media(src, onMediaSuccess, onError);
    
    var playAudioButton = document.getElementById("buttonPlayAudio"),
        stopAudioButton = document.getElementById("buttonStopAudio"),
        recordAudioButton = document.getElementById("buttonPauseAudio");
                            
    playAudioButton.addEventListener("click", playAudio); 
    stopAudioButton.addEventListener("click", stopAudio);
    recordAudioButton.addEventListener("click", pauseAudio)
}

function onMediaSuccess() {
    console.log("Media played without errors"); 
}
    
function onError(error) {
    var statusBox = document.getElementById('statusBox');
    var errorMessage =  "code: " + error.code + "\n" +
                        "message: " + error.message + "\n";
    
    statusBox.innerText = errorMessage;
}
    
function playAudio() {
    mediaContent.play();
}
    
function stopAudio() {
    mediaContent.pause();
}
    
function pauseAudio() {
    mediaContent.stop();
}