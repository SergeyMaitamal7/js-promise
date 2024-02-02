import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputCalendar: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  daysSpan: document.querySelector('span[data-days]'),
  hoursSpan: document.querySelector('span[data-hours]'),
  minutesSpan: document.querySelector('span[data-minutes]'),
  secondsSpan: document.querySelector('span[data-seconds]'),
};

refs.button.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.button.disabled = false;
      const timeNow = selectedDates[0].getTime();
      onTimer(timeNow);
    }
  },
};

function onTimer(timeSelected) {
  timerId = setInterval(() => {
    const deltaMs = timeSelected - new Date().getTime();
    if (deltaMs > 0) {
      addLeadingZero(deltaMs);
    } else {
      clearInterval(timerId);
      refs.button.disabled = true;
    }
  }, 1000);
}

flatpickr(refs.inputCalendar, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const time = convertMs(value);
  refs.daysSpan.textContent = time.days.toString().padStart(2, '0');
  refs.hoursSpan.textContent = time.hours.toString().padStart(2, '0');
  refs.minutesSpan.textContent = time.minutes.toString().padStart(2, '0');
  refs.secondsSpan.textContent = time.seconds.toString().padStart(2, '0');
}
