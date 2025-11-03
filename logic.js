window.addEventListener('load', bindEvents);

function bindEvents() {
  loadAllSongs('sonunigam');
  document.querySelector('#searchBt').addEventListener('click', searchSong);
}

function searchSong() {
  const singerName = document.querySelector('#searchTxt').value.trim();
  if (singerName) loadAllSongs(singerName);
}

function toggleLoader(show) {
  const loader = document.querySelector('.loader-container');
  loader.style.display = show ? 'flex' : 'none';
}

function createCard(songObject) {
  const songDiv = document.querySelector('.songs');
  const cardDiv = document.createElement('div');
  cardDiv.className = 'cards';

  const image = document.createElement('img');
  image.className = 'art';
  image.src = songObject.artworkUrl100;
  image.alt = songObject.collectionName;

  const titleDiv = document.createElement('div');
  titleDiv.className = 'title';
  titleDiv.innerText = songObject.collectionName;

  const artistDiv = document.createElement('div');
  artistDiv.className = 'artist';
  artistDiv.innerText = songObject.artistName;

  const audioTag = document.createElement('audio');
  audioTag.src = songObject.previewUrl;
  audioTag.controls = true;

  cardDiv.append(image, titleDiv, artistDiv, audioTag);
  songDiv.appendChild(cardDiv);
}

async function loadAllSongs(singerName) {
  const url = `https://itunes.apple.com/search?term=${singerName}&limit=50`;
  try {
    toggleLoader(true);
    const response = await fetch(url);
    const allSongs = await response.json();
    const songs = allSongs.results;
    const songsDiv = document.querySelector('.songs');
    songsDiv.innerHTML = '';
    songs.forEach((song, index) => {
      setTimeout(() => createCard(song), index * 70); // smooth staggered fade-in
    });
  } catch (err) {
    console.log('Failed to Load Songs:', err);
  } finally {
    toggleLoader(false);
  }
}
