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
  playing = false,
  paused = false;

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
  handleButtons(content);
}

function startTimer(duration = null) {
  if (playing) return;
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
    if (--timer < 0) stopTimer(duration);
  }, 1000);
  paused = false;
  playing = true;
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
  if (m <= 0 || m >= 100) return;
  m = m < 10 ? `0${m}` : m;
  setDisplay(`${m}:${ms[1]}`);
}

function stopTimer(duration = null) {
  if (duration) {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis,
        utterance = new SpeechSynthesisUtterance(`${duration} time completed`);
      synthesis.speak(utterance);
    } else alert(`${duration} time completed | Text-to-speech not supported.`);
    resetTimer();
  } else {
    clearInterval(intervalId);
    playing = false;
    paused = true;
    setDisplay($display.textContent);
  }
}

function resetTimer() {
  clearInterval(intervalId);
  paused = false;
  playing = false;
  setDisplay();
}

function handleButtons(content = null) {
  if (playing) {
    handleTimeButtons(false);
    $play.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
    $play.removeAttribute('disabled');
  } else {
    if (!content && !paused) {
      $play.setAttribute('disabled', true);
      $play.style.cursor = 'initial';
    }
    if (paused) handleTimeButtons(false);
    else {
      if (content) {
        $play.removeAttribute('disabled');
        $play.style.cursor = 'pointer';
      }
      handleTimeButtons(true);
    }
    $play.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
  }
}

function handleTimeButtons(enable) {
  const timeButtons = [
    $work,
    $break,
    $tenMinutesMore,
    $moreMinutes,
    $lessMinutes,
    $tenMinutesLess,
  ];
  if (enable) {
    timeButtons.forEach((tb) => {
      tb.removeAttribute('disabled');
      tb.style.cursor = 'pointer';
      tb.classList.add('btn-time');
    });
  } else {
    timeButtons.forEach((tb) => {
      tb.setAttribute('disabled', true);
      tb.style.cursor = 'initial';
      tb.classList.remove('btn-time');
    });
  }
}
