import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const firsDelay = Number(refs.form.elements.delay.value);
  const stepDelay = Number(refs.form.elements.step.value);
  const amount = Number(refs.form.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    const delay = firsDelay + stepDelay * i;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(` Rejected promise ${position} in ${delay}ms`);
      });
    e.currentTarget.reset();
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


const sucses = true;
const promise = new Promise((resolve, reject) => {
  if (sucses) {
    resolve('dfsdg');
  }
  reject('ahahah');
});

promise.then((data)=> console.log(data)).catch((error)=> console.log(error))