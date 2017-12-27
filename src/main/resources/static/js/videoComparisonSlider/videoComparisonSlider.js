
console.log("Test");
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

var videoContainer = document.getElementById("video-compare-container"),
    videoUI = document.getElementById("videoUI"),
    videoMerge = document.getElementById("videoMerge"),
    leftVideo = document.getElementById("leftVideo"),
    rightVideo = document.getElementById("rightVideo"),
    videoControl = document.createElement("button"),
    videoReturn = document.createElement("button"),
    position = 0.5,
    vidHeight = 576,
    vidWidth = 1024;
mergeContext = videoMerge.getContext("2d");
videoContainer.style.display = "none";
videoControl.innerHTML = "Play",
    playThroughs = 0;
videoUI.appendChild(videoReturn);
videoUI.appendChild(videoControl);

videoControl.addEventListener("click", playPause, false);
videoReturn.addEventListener("click", returnToStart, false);

function playPause() {
    if (leftVideo.paused) {
        videoControl.innerHTML = "Pause";
        playVids();
    } else {
        leftVideo.pause();
        rightVideo.pause();
        videoControl.innerHTML = "Play";
    }
}

function returnToStart() {
    leftVideo.currentTime = 0;
    rightVideo.currentTime = 0;
    playVids();
}

function playVids() {
    if (leftVideo.readyState > 3 && rightVideo.readyState > 3) {
        leftVideo.play();
        rightVideo.play();
        if (playThroughs == 0) {
            videoReturn.innerHTML = "Rewind";
        }

        function trackLocation(e) {
            position = ((e.pageX - videoMerge.offsetLeft) / videoMerge.offsetWidth);
        }

        videoMerge.addEventListener("mousemove", trackLocation, false);	videoMerge.addEventListener("touchstart",trackLocation,false);
        videoMerge.addEventListener("touchmove",trackLocation,false);

        function drawLoop() {
            mergeContext.drawImage(leftVideo, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);
            mergeContext.drawImage(rightVideo, (vidWidth * position).clamp(0.01,vidWidth), 0, (vidWidth - (vidWidth * position)).clamp(0.01,vidWidth), vidHeight,(vidWidth * position).clamp(0.01,vidWidth), 0, (vidWidth - (vidWidth * position)).clamp(0.01,vidWidth), vidHeight);
            requestAnimationFrame(drawLoop);
        }
        requestAnimationFrame(drawLoop);
    }
    playThroughs = 1;
}