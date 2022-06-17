/* eslint-disable import/extensions */
import { checkDuplication, validateForm } from './validator.js';

const app = () => {
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
      input.value = '';
      input.focus();
    } if (state.registrationForm.valid === false) {
      input.style.border = 'thick solid red';
    }
  };

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = input.value;
    state.registrationForm.value = inputValue;

    const promise = validateForm(inputValue);
    promise
      .then(() => {
        if (checkDuplication(state.registrationForm.feedList, inputValue)) {
          state.registrationForm.valid = true;
          state.registrationForm.errors = [];
          state.registrationForm.feedList.push(inputValue);
          render(state);
        } else {
          state.registrationForm.valid = false;
          state.registrationForm.errors.push('repeat value');
          render(state);
        }
      })
      .catch(() => {
        state.registrationForm.valid = false;
        state.registrationForm.errors.push('wrong format');
        render(state);
      });
  });
};
app();
