/* eslint-disable no-return-assign */
/* eslint-disable import/extensions */
import i18next from 'i18next';
import { setLocale } from 'yup';
import axios from 'axios';
import * as yup from 'yup';
import ru from './locales/index.js';
import generateRequestLink from './validator.js';
import view from './view.js';
import { render } from './parser.js';

const app = () => {
  const form = document.querySelector('.rss-form');

  const state = {
    RssForm: {
      state: '',
      errors: '',
    },
    feedList: [],
    posts: [],
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
    const newLink = getForm.get('url').trim();

    const scheme = yup.string().url();
    const promise = scheme.notOneOf(state.feedList);

    promise.validate(newLink)
      // .then((res) => state.feedList.push(res))
      .then(() => watchedState.RssForm.state = 'finished')
      .catch((err) => {
        watchedState.RssForm.errors = err.type;
        watchedState.RssForm.state = 'failed';
      });

    setTimeout(function someFunc() {
      axios.get(generateRequestLink(newLink))
        .then((res) => render(res, state));
      setTimeout(someFunc, delay);
    }, 0);
  });
};

app();
