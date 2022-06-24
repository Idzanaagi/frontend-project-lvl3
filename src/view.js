import onChange from 'on-change';

const input = document.querySelector('#url-input');

const view = (obj) => {
  const watchedObj = onChange(obj, (path, value) => {
    if (path === 'RssForm.state') {
      if (value === 'failed') {
        input.style.border = 'thick solid red';
      }
      if (value === 'finished') {
        input.style.border = null;
        input.value = '';
        input.focus();
      }
    }
  });

  return watchedObj;
};

export default view;
