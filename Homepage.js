document.addEventListener("DOMContentLoaded", function () {
  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();

  if (greeting) {
    if (hour < 12) greeting.textContent = "Good Morning!";
    else if (hour < 18) greeting.textContent = "Good Afternoon!";
    else greeting.textContent = "Good Evening!";
  }

  const container = document.getElementById("recentlyPlayed");

  let recentSongs = [];
  try {
    recentSongs = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
  } catch (e) {}

  if (recentSongs.length === 0) {
    container.textContent = "No recently played songs yet.";
    return;
  }

  const classes = ["five", "six", "seven", "eight"];

  recentSongs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "music-card";
    card.innerHTML = `
      <div class="card-image image-${classes[index % 4]}">
        <span>♫</span>
        <a href="My Playlist.html?song=${song.index}" class="play-button">▶</a>
      </div>
      <h3></h3>
      <p></p>
    `;
    card.querySelector("h3").textContent = song.title;
    card.querySelector("p").textContent = song.artist;
    container.appendChild(card);
  });
});