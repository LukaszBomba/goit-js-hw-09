function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');

const start = document.querySelector('[data-start]');

const stop = document.querySelector('[data-stop]');

let color = null;

start.addEventListener('click', () => {
  color = setInterval(() => {
    const color = getRandomHexColor();
    body.style.background = color;
  }, 1000);
});

stop.addEventListener('click', () => {
  clearInterval(color);
});
