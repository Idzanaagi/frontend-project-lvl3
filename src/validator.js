import * as yup from 'yup';

const schema = yup.string().min(25).matches(/^https:\/\/ru\.hexlet\.io\/[a-zA-z]{1,}\.rss$/);
const validateField = (path) => schema.validate(path);
const checkDuplication = (state, path) => !state.includes(path);

const validateForm = (state, path) => new Promise((res) => {
  const qq = validateField(path);
  if (validateField(path) && checkDuplication(state, path)) {
    res(qq);
  } else {
    throw new Error('Ошибка!');
  }
});

export default validateForm;
