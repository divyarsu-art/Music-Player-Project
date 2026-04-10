let currentAlbumSongs = [];
const musicDatabase = {
  albums: [
    {
      title: "Vikram",
      artist: "Anirudh Ravichander",
      image: "vikram.jpg",
      songs: [
        { title: "Pathala Pathala", duration: "3:31",lyrics: "Pathala Pathala, Enna Kodumai Saravanan Idhu?" },
        { title: "Vikram Title Track", duration: "3:39", lyrics: "No Lyrics Available :(" },
        { title: "Wasted", duration: "3:03", lyrics: "No Lyrics Available :(" }
      ]
    },
    {
  title: "Master",
  artist: "Anirudh Ravichander",
  image: "master.jpg",
  songs: [
    { title: "Vaathi Coming", duration: "3:48", lyrics: "Vaathi Coming, MOVE " },
    { title: "Kutty Story", duration: "4:02", lyrics: "Let me sing a kutty story\n Pay attention listen to me " },
    { title: "Quit Pannuda", duration: "4:10", lyrics: "No Lyrics Available :(" }
  ]
},

{
  title: "Dude",
  artist: "Aai Sabhyankhar",
  image: "dude.jpg",
  songs: [
    { title: "Oorum Blood", duration: "3:27", lyrics: "Oorum Blood 10000 AURA kondu achaadu \nOorum Blood 10000 AURA kondu achaadu \nOorum Blood 10000 AURA kondu achaadu " },
    { title: "Kannukulla", duration: "3:10", lyrics: "Yen Kannukulla Thitaathe \n Nenju kulla nachaathe \n Sollae Pothum 🙏🏻" },
    { title: "Nasama Po", duration: "4:05", lyrics: "Paakama Pesama \n Yenkuda Seraame \n Ponaalum Nallaru Pooooo" }
  ]
}
  ],
  singles: [
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      image: "shape.jpg",
      lyrics: "The club isn't the best place to find a lover...\nSo the bar is where I go..." 
    },
    {
      title: "Les",
      artist: "Childish Gambino",
      image: "les.jpg",
      lyrics: "No Lyrics Available :("
    },
    
{
  title: "Out of Time",
  artist: "The Weeknd",
  image: "dawn.jpg",
  lyrics: "Out of time, out of time\nEither you or me, we're running out of time\nI don't wanna be alone tonight"
},
{
  title: "The Color Violet",
  artist: "Tory Lanez",
  image: "tory.jpg",
  lyrics: "Violet, violet, violet\nI see the world through a color violet\nViolet, violet, violet\nAll of my dreams in a color violet"
},
{
  title: "Delicate",
  artist: "Taylor Swift",
  image: "Taylor.jpg",
  lyrics: "I'm delicate, I'm delicate\nI'm delicate, I'm delicate"
}
  ],
playlists: [
  {
    name: "Chill Vibes",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
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
    gradient: "linear-gradient(135deg, #f7971e, #ff5858)",
    songs: []
  },
  {
    name: "Late Night Drive",
    gradient: "linear-gradient(135deg, #56ab2f, #a8e063)",
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
let navHistory = [];

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



function openPlayer(title, artist, color, imagePath, lyrics = "No lyrics available") {
  currentTitle = title;
  currentArtist = artist;
  currentColor = color;
  currentImage = imagePath;

  document.getElementById("playerTitle").textContent = title;
  document.getElementById("playerArtist").textContent = artist;
  document.getElementById("albumBox").src = imagePath;
  document.getElementById("miniTitle").textContent = title;
  document.getElementById("miniArtist").textContent = artist;
  document.getElementById("miniPlayer").style.background = color;
  document.querySelector(".lyrics-box").innerHTML = 
  `<p><strong>LYRICS</strong></p><br>${lyrics.replace(/\n/g, "<br>")}`;

  showScreen("player"); // ← uses the stack now
  setTimeout(setupWaveCanvas, 100);
}





function goBack() {
  if (navHistory.length === 0) return;
  const prev = navHistory.pop(); // go back without pushing to history
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active-screen"));
  document.getElementById(prev).classList.add("active-screen");
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
  const current = document.querySelector(".active-screen");
  if (current && current.id !== screenId) {
    navHistory.push(current.id); // save where we came from
  }

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active-screen"));
  document.getElementById(screenId).classList.add("active-screen");

  document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
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
      openPlayer(song.title, song.artist, "#ff4da6", song.image,song.lyrics);

    container.appendChild(card);
  });
}

function openAlbum(album) {
  currentAlbumSongs = album.songs;
  

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

    div.onclick = () => openPlayer(song.title, album.artist, "#ff4da6", album.image, song.lyrics);

    list.appendChild(div);
  });
  const cover = document.getElementById("albumCover");
cover.classList.remove("playlist-cover");
cover.style.backgroundImage = `url('${album.image}')`;
cover.style.backgroundSize = "cover";
cover.style.backgroundPosition = "center";
showScreen("album");
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
  showScreen("album");
}
function createPlaylist() {
  const name = prompt("Enter playlist name:");
  if (!name) return;

  const gradients = [
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f7971e, #ff5858)",
    "linear-gradient(135deg, #56ab2f, #a8e063)",
    "linear-gradient(135deg, #ff4da6, #ff9a9e)",
    "linear-gradient(135deg, #00c6ff, #0072ff)"
  ];

  const gradient = gradients[musicDatabase.playlists.length % gradients.length];

  musicDatabase.playlists.push({ name, gradient, songs: [] });
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

  const gradients = [
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f7971e, #ff5858)",
    "linear-gradient(135deg, #56ab2f, #a8e063)",
    "linear-gradient(135deg, #ff4da6, #ff9a9e)",
    "linear-gradient(135deg, #00c6ff, #0072ff)"
  ];

  musicDatabase.playlists.forEach((playlist, index) => {
    const card = document.createElement("div");
    card.classList.add("playlist-card");
    card.style.background = playlist.gradient;
    card.innerHTML = `<h3>${playlist.name}</h3>`;
    card.setAttribute("draggable", "true");
    card.dataset.index = index; // track position

    // --- DRAG EVENTS ---

    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", index); // store original index
      setTimeout(() => card.classList.add("dragging"), 0);
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      document.querySelectorAll(".playlist-card").forEach(c => {
        c.classList.remove("drag-over");
      });
    });

    card.addEventListener("dragover", (e) => {
      e.preventDefault(); // needed to allow drop
      e.dataTransfer.dropEffect = "move";
      card.classList.add("drag-over");
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove("drag-over");
    });

    card.addEventListener("drop", (e) => {
  e.preventDefault();
  const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));

  // 🔥 Get live index from current DOM, not stale dataset
  const allCards = [...document.querySelectorAll(".playlist-card")];
  const toIndex = allCards.indexOf(card);

  if (fromIndex === toIndex) return;

  const moved = musicDatabase.playlists.splice(fromIndex, 1)[0];
  musicDatabase.playlists.splice(toIndex, 0, moved);

  showToast(`"${moved.name}" moved to position ${toIndex + 1}`);
  loadPlaylists();
  function showToast(msg) {
  console.log(msg);
}
});

    card.addEventListener("click", () => openPlaylist(playlist.name));

    container.appendChild(card);
  });
}


loadPlaylists(); 
