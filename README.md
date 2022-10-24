[![Actions Status](https://github.com/Idzanaagi/frontend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/Idzanaagi/frontend-project-lvl3/actions)
[![CI](https://github.com/Idzanaagi/frontend-project-lvl3/workflows/CI/badge.svg)](https://github.com/Idzanaagi/frontend-project-lvl3/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/652cf42e93a2b00eb99f/maintainability)](https://codeclimate.com/github/Idzanaagi/frontend-project-lvl3/maintainability)

<h1> RSS-агрегатор </h1>
<h2> Позволяет добавлять и читать RSS-ленты </h2>

### Стек: JavaScript, bootstrap, DOM api, axios, on-change, i18next, webpack, CI, yup

### Описание: 
- подключила и [настроила](https://github.com/Idzanaagi/frontend-project-lvl3/blob/7ad5d79b7f79fe9dbda13330e318d21690a866f7/src/main.js#L25) библиотеку i18next для [хранения текстов](https://github.com/Idzanaagi/frontend-project-lvl3/blob/7ad5d79b7f79fe9dbda13330e318d21690a866f7/src/locales/ru.js) в одном месте и последующей локализации;
- реализовала проверки на корректность и дубли в форме добавления RSS-потока с помощью валидатора yup и state;
- завела слой [view](https://github.com/Idzanaagi/frontend-project-lvl3/blob/7ad5d79b7f79fe9dbda13330e318d21690a866f7/src/view.js) для отображения данных в рамках концепта MVC;
- запрограммировала скачивание и [отображение](https://github.com/Idzanaagi/frontend-project-lvl3/blob/7ad5d79b7f79fe9dbda13330e318d21690a866f7/src/parser.js) данных RSS-потока;
- написала [автообновление](https://github.com/Idzanaagi/frontend-project-lvl3/blob/7ad5d79b7f79fe9dbda13330e318d21690a866f7/src/main.js#L48) постов в случае появления новых.

<b> Базовая функциональность: </b>

<img src="https://github.com/Idzanaagi/frontend-project-lvl3/blob/main/src/demo/My%20HTML%20(1).gif" />

### Деплой - https://frontend-project-lvl3-idzanaagi.vercel.app/ 
