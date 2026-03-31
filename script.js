// PLAY / PAUSE
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const volumePopup = document.querySelector(".volume-popup");
const songs = document.querySelectorAll(".song");
const miniPlayBtn = document.getElementById("miniPlayBtn");
const miniProgressBar = document.getElementById("miniProgressBar");


let isPlaying = false;
let progress = 0;
let interval;
let volume = 80;
let previousScreen = "home";


function togglePlay() {
  if (!isPlaying) {
    isPlaying = true;
    playBtn.textContent = "⏸";
    miniPlayBtn.textContent = "⏸";
    startProgress();
  } else {
    isPlaying = false;
    playBtn.textContent = "▶";
    miniPlayBtn.textContent = "▶";
    stopProgress();
  }
}
playBtn.addEventListener("click", togglePlay);

miniPlayBtn.addEventListener("click", function(event){
  event.stopPropagation(); // prevents mini player from opening full player
  togglePlay();
});


// FAKE PROGRESS BAR
function startProgress() {
  interval = setInterval(() => {
    if (progress >= 100) progress = 0;
    progress += 1;
    progressBar.style.width = progress + "%";
    miniProgressBar.style.width = progress + "%";
  
  }, 300);
}

function stopProgress() {
  clearInterval(interval);
}



// ACTIVE SONG HIGHLIGHT
songs.forEach(song => {
  song.addEventListener("click", () => {
    songs.forEach(s => s.classList.remove("active-song"));
    song.classList.add("active-song");
  });
});
let currentTitle = "Shape of You";
let currentArtist = "Ed Sheeran";
let currentColor = "#ff4da6";



function openPlayer(title, artist, color, imagePath) {

  // Remember where we came from
  previousScreen = document.querySelector(".active-screen").id;

  currentTitle = title;
  currentArtist = artist;
  currentColor = color;
  currentImage = imagePath;

  // Update text
  document.getElementById("playerTitle").textContent = title;
  document.getElementById("playerArtist").textContent = artist;
  document.getElementById("albumBox").src = imagePath;

  // Update mini player
  document.getElementById("miniTitle").textContent = title;
  document.getElementById("miniArtist").textContent = artist;
  document.getElementById("miniPlayer").style.background = color;

  // Switch screens
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active-screen");
  });

  document.getElementById("player").classList.add("active-screen");
  
}





function goBack() {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active-screen");
  });

  document.getElementById(previousScreen).classList.add("active-screen");
}



const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

function goSearch() {
  document.getElementById("home").classList.remove("active-screen");
  document.getElementById("player").classList.remove("active-screen");
  document.getElementById("search").classList.add("active-screen");
}

function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active-screen");
  });

  // Show selected screen
  document.getElementById(screenId).classList.add("active-screen");

  // Remove active class from all sidebar items
  document.querySelectorAll(".sidebar li").forEach(li => {
    li.classList.remove("active");
  });

  // Find the matching sidebar item
  const activeItem = Array.from(document.querySelectorAll(".sidebar li"))
    .find(li => li.textContent.trim().toLowerCase() === screenId);

  // Add active class
  if (activeItem) activeItem.classList.add("active");
}


let volumeValue = 80;

function toggleVolume(event) {
  event.stopPropagation();
  const slider = document.getElementById("volumeSlider");
  slider.classList.toggle("show");
}


const volumeRange = document.getElementById("volumeRange");
const volumePercent = document.getElementById("volumePercent");

volumeRange.addEventListener("input", function () {
  volumeValue = this.value;
  volumePercent.textContent = volumeValue + "%";
});

