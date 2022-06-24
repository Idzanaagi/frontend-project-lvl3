import * as yup from 'yup';

const validateForm = (link, array) => {
  const scheme = yup.string().url().notOneOf(array);
  return scheme.validate(link).then(() => null).catch((e) => {
    throw new Error(e);
  });
};

export default validateForm;
