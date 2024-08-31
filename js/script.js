'use strict';
const d = document;

const $work = d.getElementById('work'),
  $break = d.getElementById('break'),
  $rest = d.getElementById('rest'),
  $display = d.getElementById('display'),
  $moreMinutes = d.getElementById('moreMinutes'),
  $lessMinutes = d.getElementById('lessMinutes'),
  $start = d.getElementById('start'),
  $stop = d.getElementById('stop'),
  $reset = d.getElementById('reset');

let intervalId = null,
  hours = null,
  minutes = null,
  seconds = null;

d.addEventListener('DOMContentLoaded', () => {
  eventListeners();
  setDisplay();
});

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
  $moreMinutes.addEventListener('click', () => {
    handleTimer('moreMinutes');
  });
  $lessMinutes.addEventListener('click', () => {
    handleTimer('lessMinutes');
  });
  $start.addEventListener('click', () => {
    startTimer('custom');
  });
  $stop.addEventListener('click', () => {
    stopTimer();
  });
  $reset.addEventListener('click', () => {
    resetTimer();
  });
}

function setDisplay(content = null) {
  console.log('setDisplay');
  if (!content) $display.textContent = '00:00';
  else $display.textContent = content;
}

function startTimer(duration = null) {
  let timer = null;
  if (duration === 'custom') {
    console.log('custom...');
    let ms = $display.textContent;
    ms = hms.split(':');
    console.log(ms);
    const m = +ms[0];
    console.log(m);
    console.log('...');
    timer = 60 * m;
  } else {
    if (duration === 'work') timer = 60 * 25;
    if (duration === 'break') timer = 60 * 5;
    if (duration === 'rest') timer = 60 * 30;
  }
  intervalId = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    setDisplay(`${minutes}:${seconds}`);
    if (--timer < 0) resetTimer();
  }, 1000);
}

function handleTimer(trigger) {
  let ms = $display.textContent;
  ms = hms.split(':');
  let m = +hms[0];
  if (trigger === 'moreMinutes') {
    if (m === 59) return;
    m++;
  }
  if (trigger === 'lessMinutes') {
    if (m === 0) return;
    m--;
  }
  m = m < 10 ? `0${m}` : m;
  setDisplay(`${m}:${hms[1]}`);
}

function stopTimer() {
  console.log('stopTimer');
}

function resetTimer() {
  clearInterval(intervalId);
  setDisplay();
}
