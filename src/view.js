import onChange from 'on-change';

const input = document.querySelector('#url-input');

/*
const render = (state) => {
  if (state.RssForm.state === 'finished') {
    input.style.border = null;
    input.value = '';
    input.focus();
  } else {
    input.style.border = 'thick solid red';
  }
};
*/

export default onChange(state, (path, value) => {
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
// export default watchedState;
// export default render;
