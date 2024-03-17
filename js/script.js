'use strict';
const d = document;

const $work = d.getElementById('work'),
  $break = d.getElementById('break'),
  $rest = d.getElementById('rest'),
  $display = d.getElementById('display'),
  $hours = d.getElementById('hours'),
  $minutes = d.getElementById('minutes'),
  $start = d.getElementById('start'),
  $stop = d.getElementById('stop'),
  $reset = d.getElementById('reset');

let intervalId = null;

d.addEventListener('DOMContentLoaded', () => {
  eventListeners();
  $display.textContent = '00:00:00';
});

function startTimer(duration = null) {
  console.log('startTimer');
  let timer = null;
  let hours = null;
  let minutes = null;
  let seconds = null;
  if (duration === 'work') timer = 60 * 25;
  if (duration === 'break') timer = 60 * 5;
  if (duration === 'rest') timer = 60 * 30;
  intervalId = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    $display.textContent = `00:${minutes}:${seconds}`;
    if (--timer < 0) resetTimer();
  }, 1000);
  console.log(intervalId);
}

function resetTimer() {
  console.log('handleReset');
  clearInterval(intervalId);
  $display.textContent = '00:00:00';
}

function eventListeners() {
  $work.addEventListener('click', () => {
    startTimer('work');
  });
  $break.addEventListener('click', () => {
    startTimer('break');
  });
  $rest.addEventListener('click', () => {
    startTimer('rest');
  });
  $hours.addEventListener('click', handleHours);
  $minutes.addEventListener('click', handleMinutes);
  $start.addEventListener('click', handleStart);
  $stop.addEventListener('click', () => {
    stopTimer();
  });
  $reset.addEventListener('click', () => {
    resetTimer();
  });
}

function handleHours() {
  console.log('handleHours');
}

function handleMinutes() {
  console.log('handleMinutes');
}

function handleStart() {
  console.log('handleStart');
}

function stopTimer() {
  console.log('stopTimer');
}
