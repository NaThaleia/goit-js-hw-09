const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;
let intID = null;

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  changeRandomBGColor();
});

refs.stopBtn.addEventListener('click', () => {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(intID);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeRandomBGColor() {
  intID = setInterval(() => {
    let backGroundBodyColor = getRandomHexColor();
    refs.body.style.backgroundColor = backGroundBodyColor;
    console.log(backGroundBodyColor);
  }, 1000);
}
