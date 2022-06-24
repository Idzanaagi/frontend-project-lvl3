import onChange from 'on-change';

const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

const view = (obj, i18n) => {
  const watchedObj = onChange(obj, (path, value) => {
    if (path === 'RssForm.state') {
      if (value === 'failed') {
        input.style.border = 'thick solid red';
        feedback.textContent = i18n.t('errors.notValidInput');
      }
      if (value === 'finished') {
        input.style.border = null;
        input.value = '';
        input.focus();
        feedback.textContent = i18n.t('successful.download');
      }
    }
  });

  return watchedObj;
};

export default view;
