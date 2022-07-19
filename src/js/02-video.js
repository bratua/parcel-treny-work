import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const refVimeoPlayerHtml = document.querySelector('#vimeo-player');
const player = new Player(refVimeoPlayerHtml);
const STORAGE_CURRENT_TIME_KEY = 'videoplayer-current-time';
// let currentPosition = 0;

console.log(
  'Current position, sec. :   ',
  localStorage.getItem(STORAGE_CURRENT_TIME_KEY)
);

// console.log('my current position', currentPosition);

player.on('play', onStartPlay);
player.on('timeupdate', throttle(onPlay, 5));

function onStartPlay() {
  const currentPosition = localStorage.getItem(STORAGE_CURRENT_TIME_KEY);

  if (currentPosition) {
    player.setCurrentTime(currentPosition);
  }
}

function onPlay({ seconds }) {
  localStorage.setItem(STORAGE_CURRENT_TIME_KEY, seconds);
  //   consol.log(localStorage.getItem(STORAGE_CURRENT_TIME_KEY));
}
