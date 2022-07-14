import * as yup from 'yup';

export const scheme = yup.string().url();
export const generateRequestLink = (link) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`;
