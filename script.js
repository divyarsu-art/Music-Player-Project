let currentAlbumSongs = [];
const musicDatabase = {
  albums: [
    {
      title: "Vikram",
      artist: "Anirudh Ravichander",
      image: "vikram.jpg",
      songs: [
        { title: "Pathala Pathala", duration: "3:31" },
        { title: "Vikram Title Track", duration: "3:39" },
        { title: "Wasted", duration: "3:03" }
      ]
    },
    {
  title: "Master",
  artist: "Anirudh Ravichander",
  image: "master.jpg",
  songs: [
    { title: "Vaathi Coming", duration: "3:48" },
    { title: "Kutty Story", duration: "4:02" },
    { title: "Quit Pannuda", duration: "4:10" }
  ]
},

{
  title: "Dude",
  artist: "Aai Sabhyankhar",
  image: "dude.jpg",
  songs: [
    { title: "Oorum Blood", duration: "3:27" },
    { title: "Kannukulla", duration: "3:10" },
    { title: "Nasama Po", duration: "4:05" }
  ]
}
  ],
  singles: [
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      image: "shape.jpg"
    },
    {
      title: "Les",
      artist: "Childish Gambino",
      image: "les.jpg"
    },
    
{
  title: "Out of Time",
  artist: "The Weeknd",
  image: "dawn.jpg"
},
{
  title: "The Color Violet",
  artist: "Tory Lanez",
  image: "tory.jpg"
},
{
  title: "Delicate",
  artist: "Taylor Swift",
  image: "taylor.jpg"
}
  ],
playlists: [
  {
    name: "Chill Vibes",
    songs: [
      { title: "Heat Waves", artist: "Glass Animals", duration: "3:58", image: "heatwaves.jpg" },
      { title: "Peaches", artist: "Justin Bieber", duration: "3:20", image: "peaches.jpg" },
      { title: "MIA", artist: "Bad Bunny", duration: "3:30", image: "mia.jpg" },
      { title: "Euphoria", artist: "Jungkook", duration: "3:45", image: "euphoria.jpg" },
      { title: "Good Goodbye", artist: "Hwasa", duration: "3:10", image: "hwasa.jpg" }
    ]
  },
  {
    name: "Workout Hits",
    songs: []
  },
  {
    name: "Late Night Drive",
    songs: []
  }
]
};


// PLAY / PAUSE
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const volumePopup = document.querySelector(".volume-popup");
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
  setTimeout(setupWaveCanvas, 100);
  
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

let waveCanvas, waveCtx;
let t = 0;

function setupWaveCanvas() {
  waveCanvas = document.getElementById("waveCanvas");
  if (!waveCanvas) return;

  waveCtx = waveCanvas.getContext("2d");

  // ✅ AUTO SIZE (important)
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

  // ✨ Glow effect (optional but nice)
  waveCtx.shadowBlur = 10;
  waveCtx.shadowColor = "#ff4da6";

  let amplitude = isPlaying ? 10 : 3;
  let frequency = 0.05;

  let padding = 20; // 🔥 THIS FIXES POSITION

  // 🔝 TOP
  waveCtx.beginPath();
  for (let x = padding; x < w - padding; x++) {
    let y = padding + Math.sin((x + t) * frequency) * amplitude;
    waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();

  // 🔻 BOTTOM
  waveCtx.beginPath();
  for (let x = padding; x < w - padding; x++) {
    let y = h - padding + Math.sin((x + t) * frequency) * amplitude;
    waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();


  // ⬅️ LEFT
  waveCtx.beginPath();
  for (let y = padding; y < h - padding; y++) {
    let x = padding + Math.sin((y + t) * frequency) * amplitude;
    waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();

  // ➡️ RIGHT
  waveCtx.beginPath();
  for (let y = padding; y < h - padding; y++) {
    let x = w - padding + Math.sin((y + t) * frequency) * amplitude;
    waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();

  t += isPlaying ? 2 : 0.5;

  requestAnimationFrame(drawWave);
}

function loadHome() {
  const container = document.querySelector(".home-cards");
  if (!container) return;

  container.innerHTML = "";

  // Albums
  musicDatabase.albums.forEach(album => {
    const card = document.createElement("div");
    card.classList.add("music-card");

    card.innerHTML = `
      <img src="${album.image}" class="card-img">
      <p>${album.title}</p>
      <small>${album.artist}</small>
    `;

    card.onclick = () => openAlbum(album);

    container.appendChild(card);
  });

  // Singles
  musicDatabase.singles.forEach(song => {
    const card = document.createElement("div");
    card.classList.add("music-card");

    card.innerHTML = `
      <img src="${song.image}" class="card-img">
      <p>${song.title}</p>
      <small>${song.artist}</small>
    `;

    card.onclick = () =>
      openPlayer(song.title, song.artist, "#ff4da6", song.image);

    container.appendChild(card);
  });
}

function openAlbum(album) {
  currentAlbumSongs = album.songs;
  showScreen("album");

  document.querySelector(".album-cover-large").src = album.image;
  document.getElementById("albumTitle").textContent = album.title;
document.getElementById("albumArtist").textContent = album.artist;
document.getElementById("albumMeta").textContent = `${album.songs.length} Songs`;

  const list = document.querySelector(".album-song-list");
  list.innerHTML = "";

  album.songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("album-song");

    div.innerHTML = `
      <span>${index + 1}</span>
      <div>
        <strong>${song.title}</strong>
        <p>${album.artist}</p>
      </div>
      <span>${song.duration}</span>
    `;

    div.onclick = () => {
      openPlayer(song.title, album.artist, "#ff4da6", album.image);
    };

    list.appendChild(div);
  });
  const cover = document.getElementById("albumCover");

cover.classList.remove("playlist-cover");
cover.style.background = "none";
cover.src = album.image;
}
loadHome();

function playAlbum() {
  if (currentAlbumSongs.length === 0) return;

  const firstSong = currentAlbumSongs[0];

  openPlayer(
    firstSong.title,
    document.querySelector(".album-info h3").textContent,
    "#ff4da6",
    document.querySelector(".album-cover-large").src
  );
}

function shuffleAlbum() {
  if (currentAlbumSongs.length === 0) return;

  const randomIndex = Math.floor(Math.random() * currentAlbumSongs.length);
  const randomSong = currentAlbumSongs[randomIndex];

  openPlayer(
    randomSong.title,
    document.querySelector(".album-info h3").textContent,
    "#ff4da6",
    document.querySelector(".album-cover-large").src
  );
}
function openPlaylist(name) {
  previousScreen = "playlists"; // ✅ FIX BACK BUTTON
  showScreen("album");

  const playlist = musicDatabase.playlists.find(p => p.name === name);

  // ✅ IMPORTANT
  currentAlbumSongs = playlist.songs;

  // TEXT
  document.getElementById("albumTitle").textContent = playlist.name;
  document.getElementById("albumArtist").textContent = "Playlist";
  document.getElementById("albumMeta").textContent = `${playlist.songs.length} Songs`;

  const list = document.querySelector(".album-song-list");
  list.innerHTML = "";

  // ✅ EMPTY MESSAGE
  if (!playlist.songs || playlist.songs.length === 0) {
    list.innerHTML = `
      <p style="text-align:center; opacity:0.6; margin-top:40px;">
        This playlist is empty
      </p>
    `;
  } else {
    // LOAD SONGS
    playlist.songs.forEach((song, index) => {
      const div = document.createElement("div");
      div.classList.add("album-song");

      div.innerHTML = `
        <span>${index + 1}</span>
        <div>
          <strong>${song.title}</strong>
          <p>${song.artist}</p>
        </div>
      `;

      div.onclick = () =>
        openPlayer(song.title, song.artist, "#ff4da6", "shape.jpg");

      list.appendChild(div);
    });
  }

  // ➕ ADD BUTTON
  const addBtn = document.createElement("button");
  addBtn.textContent = "➕ Add Song";
  addBtn.style.marginTop = "20px";
  addBtn.onclick = () => addSongToPlaylist(name);

  list.appendChild(addBtn);

  // 🎨 COVER FIX
  const cover = document.getElementById("albumCover");

  cover.src = "";
  cover.classList.add("playlist-cover");

  const gradientMap = {
    "Chill Vibes": "linear-gradient(135deg, #667eea, #764ba2)",
    "Workout Hits": "linear-gradient(135deg, #f7971e, #ff5858)",
    "Late Night Drive": "linear-gradient(135deg, #56ab2f, #a8e063)",
    "Beach Sunset Vibes": "linear-gradient(135deg, #ff4da6, #ff9a9e)"
  };

  cover.style.background =
    gradientMap[name] || "linear-gradient(135deg, #00c6ff, #0072ff)";
}
function createPlaylist() {
  const name = prompt("Enter playlist name:");
  if (!name) return;

  musicDatabase.playlists.push({
    name: name,
    songs: []
  });

  loadPlaylists();
}
function addSongToPlaylist(playlistName) {
  const title = prompt("Song name:");
  const artist = prompt("Artist name:");

  if (!title || !artist) return;

  const playlist = musicDatabase.playlists.find(p => p.name === playlistName);

  playlist.songs.push({ title, artist });

  alert("Song added!");

  // 🔥 ADD THIS
  openPlaylist(playlistName);
}
function loadPlaylists() {
  const container = document.getElementById("playlistContainer");
  container.innerHTML = "";

  musicDatabase.playlists.forEach((playlist, index) => {
    const card = document.createElement("div");
    card.classList.add("playlist-card");

    // 🎨 RANDOM GRADIENTS
    const gradients = [
      "linear-gradient(135deg, #667eea, #764ba2)",
      "linear-gradient(135deg, #f7971e, #ff5858)",
      "linear-gradient(135deg, #56ab2f, #a8e063)",
      "linear-gradient(135deg, #ff4da6, #ff9a9e)",
      "linear-gradient(135deg, #00c6ff, #0072ff)"
    ];

    card.style.background = gradients[index % gradients.length];

    card.innerHTML = `<h3>${playlist.name}</h3>`;

    card.onclick = () => openPlaylist(playlist.name);

    container.appendChild(card);
  });
}


loadPlaylists(); 