// <----------------------------- For the hamburger icon ------------------------------------>

function toggleHamburgerIcon(change) {
    var toggleHam = document.querySelector('.hamIcon');
    if (change) {
        toggleHam.innerHTML = "<h1>&#10006;</h1>";
    }
    else {
        toggleHam.innerHTML = "<h1>&#9776;</h1>";
    }
}

function opentheSideBar(value)
{
    if(value)
    {
        var navBar = document.querySelector('nav');
        navBar.style.backgroundColor = 'black';
        navBar.style.height = '50vh';
        navBar.style.position = 'fixed';
        
        var navBarContent = document.getElementById('about');
        setTimeout(() => {
            navBarContent.style.display = 'block';
        }, 400);
        navBarContent.style.position = 'fixed';
        navBarContent.style.top = '20vh';
        navBarContent.style.left = '40vw';
        toggleHamburgerIcon(true);
    }
    else
    {
        toggleHamburgerIcon(false);
        var navBar = document.querySelector('nav');
        navBar.style.backgroundColor = 'transparent';
        navBar.style.height = 'auto';
        navBar.style.position = 'relative';


        var navBarContent = document.getElementById('about');
        navBarContent.style.display = 'none';
    }
}


var hamburgerIcon = document.getElementsByClassName("hamIcon")[0];

hamburgerIcon.addEventListener('click', () => {

    var toggleHam = document.querySelector('.hamIcon');
    var temp = toggleHam.children[0];
    
    if(temp.innerHTML == "☰")
        opentheSideBar(true);
    else
        opentheSideBar(false);
});


// <----------------------------- For playing the song ------------------------------------>

// Array to store all the players for the music stations
const allPlayer = [];

// For loading all the videos
window.onload = function allVideo() {

    for (let i = songName.length - 1; i >= 0; i--) {
        let songId = songName[i].children[0].id;
        let ctrlq = document.getElementById(songId);
        onYouTubeIframeAPIReady(ctrlq);
    }
};

// The api function to load the videos
var player;
function onYouTubeIframeAPIReady(ctrlq) {

    ctrlq.innerHTML = '<div id="youtube-player"></div>';
    ctrlq.style.cssText = 'width:0%;cursor:pointer;display:none';

    player = new YT.Player('youtube-player', {
        VideoPlaybackQuality: 'small',
        height: '0',
        width: '0',
        videoId: ctrlq.dataset.video,
        playerVars: {
            autoplay: ctrlq.dataset.autoplay,
            loop: ctrlq.dataset.loop,
        }
    });

    allPlayer.unshift(player);
}


// <------------------------------- For handling the button clicks on the channels ---------------------------------->

// For handling the button click of the channels 
var songName = Array.from(document.getElementsByClassName('song'));

var currentVideo;
var firstTimePlay = true;
songName.forEach(element => {
    element.addEventListener('click', () => {
        var songNameText = document.querySelector('.song-name');
        // songNameText.style.opacity = 0;
        songNameText.innerHTML = element.innerHTML;

        // callTheTransition();

        currentVideo = allPlayer[songName.indexOf(element)];
        pauseAllVideos();
        currentVideo.setVolume(masterVolumeSlider.value);
        currentVideo.playVideo();
        togglePlayButton(false);

    });
});


// To handle the event listener for space bar to play or pause the music
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        playPause();
    }
});

function callTheTransition() {
    songNameText.style.opacity = 1;
}

// To pause all the videos
function pauseAllVideos() {
    for (let i = songName.length - 1; i >= 0; i--) {
        let element = allPlayer[songName.indexOf(songName[i])];
        if (element.getPlayerState() == 1) {
            element.pauseVideo();
        }
    }
}

// To toggle the play and pause button
function togglePlayButton(play) {
    document.getElementById("masterPlay").className = play ? "fa-solid fa-play fa-4x controlButton" : "fa-solid fa-pause fa-4x controlButton";
}


// <------------------------------ For displaying the about tab ----------------------------------->

document.getElementById('about').addEventListener('click',
    function () {
        document.querySelector('.bg-modal').style.display = 'flex';
        
        var navBar = document.querySelector('nav');
        if(navBar.style.backgroundColor == 'black')
        {
            opentheSideBar(false);
        }
    });


document.querySelector('.close').addEventListener('click',
    function () {
        document.querySelector('.bg-modal').style.display = 'none';
    });

// When ever the user click outside of the modal
var modal = document.querySelector('.bg-modal');
window.onclick = function (event) {

    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// <------------------------------- Displaying the time ---------------------------------->

setInterval(function () {
    const time = document.querySelector("#time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = "AM";
    if (hours >= 12) {
        day_night = "PM";
        hours = hours - 12;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    time.textContent = hours + ":" + minutes + ":" + seconds + " " + day_night;
}, 0);


// <----------------------------------------------  Bottom Bar  ------------------------------------------------------->

// <------------------------------- for playing and pause the the music ----------------------------------------->

// for playing and pause the the music 
document.getElementById('masterPlay').addEventListener('click', playPause);

function playPause() {
    let iconName = document.getElementById('masterPlay');
    if (iconName.className == "fa-solid fa-play fa-4x controlButton") {

        iconName.className = "fa-solid fa-pause fa-4x";
        currentVideo.playVideo();
        togglePlayButton(false);

        ocean.volume = oceanSlider.value / 100;
        sunnyDay.volume = sunnyDaySlider.value / 100;
        rain.volume = rainSlider.value / 100;
    }
    else {
        iconName.className = "fa-solid fa-play fa-4x controlButton";
        currentVideo.pauseVideo();
        togglePlayButton(true);

        rain.volume = 0;
        ocean.volume = 0;
        sunnyDay.volume = 0;
    }
}


// <------------------------ for Adding the sound effects of rain, ocean, sunny day ----------------------------------------->

var rain = document.querySelector('#rainAudio');

var rainSlider = document.querySelector('#rainSlider');
rainSlider.oninput = function () {
    if (this.value > 0)
        rain.play();
    rain.volume = this.value / 100;
}



var ocean = document.querySelector('#oceanAudio');

var oceanSlider = document.querySelector('#oceanSlider');
oceanSlider.oninput = function () {
    if (this.value > 0)
        ocean.play();
    ocean.volume = this.value / 100;
}


var sunnyDay = document.querySelector('#sunnyDayAudio');

var sunnyDaySlider = document.querySelector('#sunnyDaySlider');
sunnyDaySlider.oninput = function () {
    if (this.value > 0)
        sunnyDay.play();
    sunnyDay.volume = this.value / 100;
}

// <------------------------ To increase and decrease the volume of the song ----------------------------------------->

var masterVolumeSlider = document.querySelector("#masterVolume");

masterVolumeSlider.oninput = function () {
    if (this.value == 0) {
        document.querySelector("#volume").className = "fa-solid fa-volume-xmark fa-2x controlButton";
    }
    else
        document.querySelector("#volume").className = "fa-solid fa-volume-high fa-2x controlButton";
    currentVideo.setVolume(this.value);
}

var volumeButton = document.querySelector("#volume");
volumeButton.addEventListener('click', () => {

    if (volumeButton.className == "fa-solid fa-volume-high fa-2x controlButton") {
        document.querySelector("#volume").className = "fa-solid fa-volume-xmark fa-2x controlButton";
        document.querySelector("#masterVolume").value = 0;
        currentVideo.setVolume(0);
    }
    else {
        document.querySelector("#volume").className = "fa-solid fa-volume-high fa-2x controlButton";
        document.querySelector("#masterVolume").value = 100;
        currentVideo.setVolume(100);
    }

});


// <------------------------ To display the extra sound options ----------------------------------------->

var extraSoundIcon = document.querySelector(".adjustOption");

extraSoundIcon.addEventListener('click', ()=>{
    openCloseTheExtraSoundBar(true);
})

function openCloseTheExtraSoundBar(open)
{
    var rainHidden = document.querySelector('.rainAudioContainer');
    var oceanHidden = document.querySelector('.oceanWaveContainer');
    var sunnyHidden = document.querySelector('.sunnyDayContainer');

    if(open)
    {   
        openCloseTheBottomDiv(true);
        rainHidden.style.display = 'block';
        oceanHidden.style.display = 'block';
        sunnyHidden.style.display = 'block';
    }
    else{
        openCloseTheBottomDiv(false);
        rainHidden.style.display = 'none';
        oceanHidden.style.display = 'none';
        sunnyHidden.style.display = 'none';
    }
}

var bottomCloseIcon = document.querySelector('.CloseAtBottom');
bottomCloseIcon.addEventListener('click', ()=>{
    openCloseTheExtraSoundBar(false);
})


function openCloseTheBottomDiv(open)
{
    if(open)
    {
        document.querySelector('.extraSoundDivBackground').style.display = 'block';
    }
    else
    {
        document.querySelector('.extraSoundDivBackground').style.display = 'none';

    }
}