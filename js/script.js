'use strict';
const d = document;

const $work = d.getElementById('work'),
  $break = d.getElementById('break'),
  $display = d.getElementById('display'),
  $tenMinutesMore = d.getElementById('tenMinutesMore'),
  $moreMinutes = d.getElementById('moreMinutes'),
  $lessMinutes = d.getElementById('lessMinutes'),
  $tenMinutesLess = d.getElementById('tenMinutesLess'),
  $start = d.getElementById('start'),
  $stop = d.getElementById('stop'),
  $reset = d.getElementById('reset');

let intervalId = null;

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
  $tenMinutesMore.addEventListener('click', () => {
    handleTimer('tenMinutesMore');
  });
  $moreMinutes.addEventListener('click', () => {
    handleTimer('moreMinutes');
  });
  $lessMinutes.addEventListener('click', () => {
    handleTimer('lessMinutes');
  });
  $tenMinutesLess.addEventListener('click', () => {
    handleTimer('tenMinutesLess');
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
  if (!content) $display.textContent = '00:00';
  else $display.textContent = content;
}

function startTimer(duration = null) {
  stopTimer();
  let timer = null;
  if (duration === 'custom') {
    let ms = $display.textContent;
    ms = ms.split(':');
    const m = +ms[0];
    const s = +ms[1];
    timer = 60 * m + s;
  } else {
    if (duration === 'work') timer = 60 * 25;
    if (duration === 'break') timer = 60 * 5;
  }
  intervalId = setInterval(() => {
    let minutes = parseInt(timer / 60, 10),
      seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    setDisplay(`${minutes}:${seconds}`);
    if (--timer < 0) stopTimer();
  }, 1000);
}

function handleTimer(trigger) {
  let ms = $display.textContent;
  ms = ms.split(':');
  let m = +ms[0];
  if (trigger === 'moreMinutes' || trigger === 'tenMinutesMore')
    trigger === 'moreMinutes' ? m++ : (m += 10);
  if (trigger === 'lessMinutes' || trigger === 'tenMinutesLess') {
    if (m <= 0) return;
    trigger === 'lessMinutes' ? m-- : (m -= 10);
  }
  m = m < 10 ? `0${m}` : m;
  setDisplay(`${m}:${ms[1]}`);
}

function stopTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  clearInterval(intervalId);
  setDisplay();
}
