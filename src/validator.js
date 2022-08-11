const generateRequestLink = (link) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`;

export default generateRequestLink;
