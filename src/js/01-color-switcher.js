function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

console.dir(refs.buttonStart);
let timerId = null;
refs.buttonStart.addEventListener('click', onChangeColor);
refs.buttonStop.addEventListener('click', onButtonDisabled);

function onChangeColor() {
  refs.buttonStart.disabled = true;
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onButtonDisabled() {
  clearInterval(timerId);
  refs.buttonStart.disabled = false;
}


console.log('gdfgdgdfgfjfjj')