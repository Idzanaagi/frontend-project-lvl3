import * as yup from 'yup';

const schema = yup.string().min(25).matches(/^https:\/\/ru\.hexlet\.io\/[a-zA-z]{1,}\.rss$/);
const validateInputValue = (path) => schema.validate(path);
export const checkDuplication = (state, path) => !state.includes(path);

export const validateForm = (path) => new Promise((res) => {
  const qq = validateInputValue(path);
  if (validateInputValue(path)) {
    res(qq);
  } else {
    throw new Error('Ошибка!');
  }
});
