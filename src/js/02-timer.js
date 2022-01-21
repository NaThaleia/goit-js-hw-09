import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// это вместо алерт
import { Notify } from 'notiflix/build/notiflix-notify-aio';

require('flatpickr/dist/themes/airbnb.css');

let selectedDate = 0;
let intId = 0;

const buttonStart = document.querySelector('button[data-start]');
const timeInput = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('.timer [data-days]');
const dataHours = document.querySelector('.timer [data-hours]');
const dataMinutes = document.querySelector('.timer [data-minutes]');
const dataSeconds = document.querySelector('.timer [data-seconds]');

buttonStart.addEventListener('click', getButtonStart);
buttonStart.setAttribute('disabled', 'disabled');

// flatpickr
const options = {
  enableTime: true,
  // Human-friendly Dates
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  time_24hr: true,
  defaultDate: new Date(),
  weekNumbers: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (selectedDate < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.removeAttribute('disabled');
      console.log(selectedDates);
    }
  },
};
flatpickr(timeInput, options);

function getButtonStart() {
  intId = setInterval(() => {
    const targetDate = selectedDate - new Date();
    buttonStart.setAttribute('disabled', 'disabled');
    timeInput.setAttribute('disabled', 'disabled');
    stopTimeOut(targetDate);
    const convertObj = convertMs(targetDate);
    showDate(convertObj);
  }, 1000);
}

function stopTimeOut(targetDates) {
  if (targetDates <= 1000) {
    clearInterval(timerId);
    timeInput.removeAttribute('disabled');
    Notify.success('Time is out');
  }
}

function showDate(time) {
  dataDays.textContent = addLeadingZero(time.days);
  dataHours.textContent = addLeadingZero(time.hours);
  dataMinutes.textContent = addLeadingZero(time.minutes);
  dataSeconds.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

// возвращает объект с рассчитанным оставшимся временем до конечной даты

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
  console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
