/* eslint-disable import/extensions */
// import i18next from 'i18next';
// import onChange from 'on-change';
// import { setLocale } from 'yup';
// import resources from './locales/index.js';
import validateForm from './validator.js';
import render from './view.js';

const app = () => {
  const form = document.querySelector('.rss-form');

  const state = {
    RssForm: {
      state: '',
    },
    feedList: [],
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const getForm = new FormData(e.target);
    const newValue = getForm.get('url').trim();

    const promise = validateForm(newValue, state.feedList);
    promise
      .then(() => {
        if (!state.feedList.includes(newValue)) {
          state.feedList.push(newValue);
          state.RssForm.state = 'finished';
        } else {
          state.RssForm.state = 'failed';
        }
        render(state);
      })
      .catch(() => {
        state.RssForm.state = 'failed';
        render(state);
      });
  });
};
app();
