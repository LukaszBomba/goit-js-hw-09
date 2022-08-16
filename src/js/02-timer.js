import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const value = Array.from(document.querySelectorAll('span.value'));
const labels = Array.from(document.querySelectorAll('.label'));
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const fields = Array.from(document.querySelectorAll('div.field'));
const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector(`button[data-start]`);

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '50vw',
      });
    }
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      startBtn.disabled = false;
      localStorage.setItem('selectedDate', `${selectedDates[0].getTime()}`);
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  if (`${num}`.length === 1) {
    return (num = `${num}`.padStart(2, '0'));
  } else {
    return `${num}`;
  }
}

startBtn.addEventListener('click', () => {
  const intFunction = () => {
    const selectDate = localStorage.getItem('selectedDate');
    const dateToday = new Date();
    const getDatet = dateToday.getTime();
    const ms = selectDate - getDatet;
    const objDate = convertMs(ms);
    if (ms < 1000) {
      clearInterval(timerId);
    }
    const getSpan = () => {
      dataDays.textContent = `${addLeadingZero(objDate.days)}`;
      dataHours.textContent = `${addLeadingZero(objDate.hours)}`;
      dataMinutes.textContent = `${addLeadingZero(objDate.minutes)}`;
      dataSeconds.textContent = `${addLeadingZero(objDate.seconds)}`;
    };
    getSpan();
  };
  const timerId = setInterval(intFunction, 1000);
});
