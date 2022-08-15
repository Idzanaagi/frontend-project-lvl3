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
    linkList: [],
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
        default: 'field_invalid',
      },
      string: {
        url: () => i18n.t('errors.notValidInput'),
        matches: () => i18n.t('errors.notRss'),
        notOneOf: () => i18n.t('errors.alreadyExist'),
      },
    });
  });

  const watchedState = view(state, i18n);
  const delay = 5000;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const getForm = new FormData(e.target);
    const newLink = getForm.get('url').trim();

    const scheme = yup.string().url().matches(/rss/);
    const promise = scheme.notOneOf(state.linkList);

    promise.validate(newLink)
      .then(() => watchedState.RssForm.state = 'pending')
      .then(() => watchedState.linkList.push(newLink))
      .then(() => watchedState.RssForm.errors = '')
      .then(() => watchedState.RssForm.state = 'finished')
      .then(() => console.log(state))
      .catch((err) => {
        watchedState.RssForm.errors = err.type;
        watchedState.RssForm.state = 'failed';
      });

    setTimeout(function requestGeneration() {
      axios.get(generateRequestLink(newLink))
        .then((res) => render(res, state))
        .catch(() => {
          watchedState.RssForm.errors = 'networkErr';
          watchedState.RssForm.state = 'failed';
        });
      setTimeout(requestGeneration, delay);
    }, 0);
  });
};
app();
