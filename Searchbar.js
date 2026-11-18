const songs = [
{title:"Tahanan", artist:"El Manu", file:"./Tahanan.mp3"},
{title:"Kanlungan", artist:"Noel Cabangon", file:"./Kanlungan.mp3"},
{title:"Training Season", artist:"Dua Lipa", file:"./Training Season.mp3"},
{title:"With a smile", artist:"Eraserheads", file:"./With a smile.mp3"},
{title:"Angels like you", artist:"Miley Cyrus", file:"./Angels like you.mp3"},
{title:"Love Again", artist:"Dua Lipa", file:"./Love Again.mp3"},
{title:"Lord I need you", artist:"Matt Maher", file:"./Lord I need you.mp3"},
{title:"Blank Space", artist:"Taylor Swift", file:"./Blank Space.mp3"},
{title:"Goodness of God", artist:"Bethel Music", file:"./Goodness of God.mp3"},
{title:"Kalimutan ka", artist:"Skusta Clee", file:"./Kalimutan ka.mp3"},
];
const audioPlayer = new Audio();

let recentlyPlayed = [];

function displaySongs(list, elementId, isRecent = false) {
    const container = document.getElementById(elementId);

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No songs found.</p>";
        return;
    }

    list.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "song";

        div.innerHTML = `
            <div class="song-info">
                <strong>${song.title}</strong>
                <small>${song.artist}</small>
            </div>

            <div>
                <button onclick="playSong('${song.title}')">
                    ▶ Play
                </button>

                ${isRecent ? `
                    <button class="remove-btn"
                    onclick="removeSong('${song.title}')">
                    ✕
                    </button>
                ` : ""}
            </div>
        `;

        container.appendChild(div);
    });
}

function searchSongs() {
    const query = document
        .getElementById("searchInput")
        .value.trim()
        .toLowerCase();

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );

    displaySongs(filteredSongs, "songList");
}
function playSong(title) {
    const song = songs.find(s => s.title === title);

    if (!song) return;

    // Save selected song for the playlist page
    localStorage.setItem("selectedSong", JSON.stringify(song));

    // Go to My Playlist
    window.location.href = "My Playlist.html";
}
function removeSong(title) {
    recentlyPlayed = recentlyPlayed.filter(
        song => song.title !== title
    );

    displaySongs(recentlyPlayed, "recentList", true);
}

displaySongs(songs, "songList");
displaySongs(recentlyPlayed, "recentList", true);