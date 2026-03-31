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

  
  const activeItem = Array.from(document.querySelectorAll(".sidebar li"))
    .find(li => li.textContent.trim().toLowerCase() === screenId);

  
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

let waveCanvas, waveCtx;
let t = 0;

function setupWaveCanvas() {
  waveCanvas = document.getElementById("waveCanvas");
  if (!waveCanvas) return;

  waveCtx = waveCanvas.getContext("2d");

  
  waveCanvas.width = waveCanvas.offsetWidth;
  waveCanvas.height = waveCanvas.offsetHeight;

  drawWave();
}

function drawWave() {
  if (!waveCtx) return;

  let w = waveCanvas.width;
  let h = waveCanvas.height;

  waveCtx.clearRect(0, 0, w, h);

  waveCtx.strokeStyle = "#ff4da6";
  waveCtx.lineWidth = 2;

  
  waveCtx.shadowBlur = 10;
  waveCtx.shadowColor = "#ff4da6";

  let amplitude = isPlaying ? 10 : 3;
  let frequency = 0.05;

  let padding = 20; 

  waveCtx.beginPath();
  for (let x = padding; x < w - padding; x++) {
    let y = padding + Math.sin((x + t) * frequency) * amplitude;
    waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();

  
  waveCtx.beginPath();
  for (let x = padding; x < w - padding; x++) {
    let y = h - padding + Math.sin((x + t) * frequency) * amplitude;
    waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();

  
  waveCtx.beginPath();
  for (let y = padding; y < h - padding; y++) {
    let x = padding + Math.sin((y + t) * frequency) * amplitude;
    waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();

  
  waveCtx.beginPath();
  for (let y = padding; y < h - padding; y++) {
    let x = w - padding + Math.sin((y + t) * frequency) * amplitude;
    waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();

  t += isPlaying ? 2 : 0.5;

  requestAnimationFrame(drawWave);
}
