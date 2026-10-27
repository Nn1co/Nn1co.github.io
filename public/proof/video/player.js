'use strict';
const video = document.querySelector('video');
document.querySelector('#captionLanguage').addEventListener('change', event => {
  for (const track of video.textTracks) track.mode = track.language === event.target.value ? 'showing' : 'disabled';
});
