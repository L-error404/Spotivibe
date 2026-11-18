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

const audio=document.getElementById("audio"),title=document.getElementById("title"),artist=document.getElementById("artist"),lyricsDiv=document.getElementById("lyrics"),player=document.getElementById("player"),songList=document.getElementById("songList");

songs.forEach((s,i)=>{
  const div=document.createElement("div");div.className="song"+(i===0?" active":"");
  div.innerHTML=`<div class="song-info"><b>${s.title}</b><span>${s.artist}</span></div>`;
  div.onclick=()=>playSong(i);
  songList.appendChild(div);
});

function setupLyrics(){
  const lines = lyricsDiv.querySelectorAll(".line");
  let last = null;
  audio.ontimeupdate = null;
  audio.ontimeupdate = () => {
    const t = audio.currentTime;
    let cur = null;
    lines.forEach(l=>{ if(t >= Number(l.dataset.time)) cur = l; });
    if(cur !== last){
      if(last) last.classList.remove("active");
      if(cur){ cur.classList.add("active"); cur.scrollIntoView({behavior:"smooth",block:"center"}); }
      last = cur;
    }
  }
}
function saveRecentlyPlayed(song, index){
  let list = [];
  try {
    list = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
  } catch(e) {}

  list = list.filter(x => x.title !== song.title);   
  list.unshift({ title: song.title, artist: song.artist, index: index });
  list = list.slice(0, 4);                            

  localStorage.setItem("recentlyPlayed", JSON.stringify(list));
}
function playSong(i){
  const s = songs[i];
  title.textContent = s.title;
  artist.textContent = s.artist;

  audio.src = s.file;
  const hidden = document.getElementById("lyric-" + i);
  if(hidden){ lyricsDiv.innerHTML = hidden.innerHTML; }
  document.querySelectorAll(".song").forEach((el,idx)=>el.classList.toggle("active",idx===i));
  audio.play().catch(()=>{});
  saveRecentlyPlayed(s, i);
  setupLyrics();
}

audio.addEventListener("play",()=>player.classList.add("playing"));
audio.addEventListener("pause",()=>player.classList.remove("playing"));
setupLyrics();

const selectedSong = JSON.parse(
    localStorage.getItem("selectedSong")
);

if (selectedSong) {
    const index = songs.findIndex(
        song => song.title === selectedSong.title
    );

    if (index !== -1) {
        playSong(index);
    }

    localStorage.removeItem("selectedSong");
}