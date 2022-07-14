/* eslint-disable import/extensions */
import i18next from 'i18next';
import { setLocale } from 'yup';
import axios from 'axios';
import * as yup from 'yup';
import ru from './locales/index.js';
import { generateRequestLink } from './validator.js';
import view from './view.js';
import { getRss, renderposts } from './parser.js';

const app = () => {
  const form = document.querySelector('.rss-form');

  const state = {
    RssForm: {
      state: '',
      errors: '',
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
  const delay = 50000;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const getForm = new FormData(e.target);
    const newValue = getForm.get('url').trim();

    const scheme = yup.string().url();
    const promise = scheme.notOneOf(state.feedList);
    promise.validate(newValue)
      .then(() => {
        if (promise) {
          state.feedList.push(newValue);
          watchedState.RssForm.state = 'finished';
        } else {
          watchedState.RssForm.state = 'failed';
        }
      })
      .then(() => {
        setTimeout(function someFunc() {
          axios.get(generateRequestLink(newValue))
            .then((res) => getRss(res))
            .then((res) => renderposts(res));
          setTimeout(someFunc, delay);
        }, 1000);
      })
      .catch((err) => {
        watchedState.RssForm.errors = err.type;
        watchedState.RssForm.state = 'failed';
      });
  });
};
app();
