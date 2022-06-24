const input = document.querySelector('#url-input');

const render = (state) => {
  if (state.RssForm.state === 'finished') {
    input.style.border = null;
    input.value = '';
    input.focus();
  } else {
    input.style.border = 'thick solid red';
  }
};

export default render;
