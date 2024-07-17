let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
  isRunning = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  display.textContent = '00:00:00';
  lapsContainer.innerHTML = '';
}

function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsContainer.appendChild(lapItem);
}

startPauseButton.addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
    startPauseButton.textContent = 'Start';
  } else {
    startTimer();
    startPauseButton.textContent = 'Pause';
  }
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
