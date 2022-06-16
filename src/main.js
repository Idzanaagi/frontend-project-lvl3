/* eslint-disable import/extensions */
import validateForm from './validator.js';

const input = document.querySelector('#url-input');
const button = document.querySelector('.col-auto');

const state = {
  registrationForm: {
    valid: true,
    feedList: [],
    errors: [],
  },
};

const render = () => {
  if (state.registrationForm.valid === true) {
    input.style.border = null;
  } if (state.registrationForm.valid === false) {
    input.style.border = 'thick solid red';
  }
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = input.value;
  state.registrationForm.value = inputValue;

  const promise = validateForm(state.registrationForm.feedList, inputValue);
  promise
    .then(() => {
      state.registrationForm.valid = true;
      state.registrationForm.errors = [];
      state.registrationForm.feedList.push(inputValue);
      input.value = '';
      input.focus();
      render(state);
    })
    .catch(() => {
      state.registrationForm.valid = false;
      state.registrationForm.errors.push('wrong format');
      render(state);
    });
});
