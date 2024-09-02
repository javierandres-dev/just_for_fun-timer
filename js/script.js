'use strict';
const d = document;

const $work = d.getElementById('work'),
  $break = d.getElementById('break'),
  $display = d.getElementById('display'),
  $tenMinutesMore = d.getElementById('tenMinutesMore'),
  $moreMinutes = d.getElementById('moreMinutes'),
  $lessMinutes = d.getElementById('lessMinutes'),
  $tenMinutesLess = d.getElementById('tenMinutesLess'),
  $play = d.getElementById('play'),
  $reset = d.getElementById('reset');

let intervalId = null,
  playing = false;

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
  $play.addEventListener('click', () => {
    if (playing) stopTimer();
    else startTimer('custom');
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
  timer = 3;
  intervalId = setInterval(() => {
    let minutes = parseInt(timer / 60, 10),
      seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    setDisplay(`${minutes}:${seconds}`);
    if (--timer < 0) stopTimer(duration);
  }, 1000);
  playing = true;
  $play.textContent = 'pause';
}

function handleTimer(trigger) {
  let ms = $display.textContent;
  ms = ms.split(':');
  let m = +ms[0];
  if (trigger === 'moreMinutes' || trigger === 'tenMinutesMore')
    trigger === 'moreMinutes' ? m++ : (m += 10);
  if (trigger === 'lessMinutes' || trigger === 'tenMinutesLess') {
    trigger === 'lessMinutes' ? m-- : (m -= 10);
  }
  if (m <= 0) return;
  m = m < 10 ? `0${m}` : m;
  setDisplay(`${m}:${ms[1]}`);
}

function stopTimer(trigger = null) {
  if (trigger) {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis,
        utterance = new SpeechSynthesisUtterance(`${trigger} time completed`);
      synthesis.speak(utterance);
    } else {
      alert(`${trigger} time completed | Text-to-speech not supported.`);
    }
    $play.setAttribute('disabled', true);
    resetTimer();
  } else {
    clearInterval(intervalId);
    playing = false;
    $play.textContent = 'play';
  }
}

function resetTimer() {
  clearInterval(intervalId);
  playing = false;
  $play.textContent = 'play';
  setDisplay();
}

function handleButtons(trigger = null) {
  /*

  $play.removeAttribute('disabled');

  $work.removeAttribute('disabled');
  $break.removeAttribute('disabled');
  $tenMinutesMore.removeAttribute('disabled');
  $moreMinutes.removeAttribute('disabled');
  $lessMinutes.removeAttribute('disabled');
  $tenMinutesLess.removeAttribute('disabled');
  $play.setAttribute('disabled', true);

  if (intervalId) {
    $work.setAttribute('disabled', true);
    $break.setAttribute('disabled', true);
    $tenMinutesMore.setAttribute('disabled', true);
    $moreMinutes.setAttribute('disabled', true);
    $lessMinutes.setAttribute('disabled', true);
    $tenMinutesLess.setAttribute('disabled', true);
  }

  */
}
