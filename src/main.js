/* eslint-disable import/extensions */
import i18next from 'i18next';
import { setLocale } from 'yup';
import ru from './locales/index.js';
import validateForm from './validator.js';
// import render from './view.js';
import view from './view.js';

const app = () => {
  const form = document.querySelector('.rss-form');

  const state = {
    RssForm: {
      state: '',
    },
    feedList: [],
  };

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  }).then(() => {
    setLocale({
      mixed: {
        notOneOf: () => i18n.t('errors.alreadyExist'),
      },
      string: {
        url: () => i18n.t('errors.notValidInput'),
      },
    });
  });

  const watchedState = view(state, i18n);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const getForm = new FormData(e.target);
    const newValue = getForm.get('url').trim();

    const promise = validateForm(newValue, state.feedList);
    promise
      .then(() => {
        if (!state.feedList.includes(newValue)) {
          state.feedList.push(newValue);
          watchedState.RssForm.state = 'finished';
        } else {
          watchedState.RssForm.state = 'failed';
        }
      })
      .catch(() => {
        watchedState.RssForm.state = 'failed';
      });
  });
};
app();
