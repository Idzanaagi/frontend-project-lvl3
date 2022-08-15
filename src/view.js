/* eslint-disable import/extensions */
import onChange from 'on-change';
import { renderStatic } from './parser.js';

const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

const view = (obj, i18n) => {
  const watchedObj = onChange(obj, (path, value) => {
    if (path === 'RssForm.state') {
      if (value === 'failed') {
        input.style.border = 'medium solid red';
      }
      if (value === 'finished') {
        input.style.border = null;
        input.value = '';
        input.focus();
        feedback.textContent = i18n.t('successful.download');
        feedback.style.color = 'green';
        renderStatic();
      }
    }
    if (path === 'RssForm.errors') {
      if (value === 'url') {
        feedback.textContent = i18n.t('errors.notValidRss');
      } if (value === 'notOneOf') {
        feedback.textContent = i18n.t('errors.alreadyExist');
      } if (value === 'matches') {
        feedback.textContent = i18n.t('errors.notRss');
      } if (value === 'network') {
        feedback.textContent = i18n.t('errors.networkErr');
      }
      feedback.style.color = 'red';
    }
  });
  return watchedObj;
};

export default view;
