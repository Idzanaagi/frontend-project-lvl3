/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

export const renderStatic = () => {
  // начало рендера постов
  const posts = document.querySelector('.posts');

  const cardForPosts = document.createElement('div');
  cardForPosts.classList.add('card', 'border-0');
  posts.append(cardForPosts);

  const divForCardBodyPosts = document.createElement('div');
  divForCardBodyPosts.classList.add('card-body');

  const h2ForPosts = document.createElement('h2');
  h2ForPosts.classList.add('card-title', 'h4');
  h2ForPosts.textContent = 'Посты';
  divForCardBodyPosts.append(h2ForPosts);
  cardForPosts.append(divForCardBodyPosts);

  const ulForPosts = document.createElement('ul');
  ulForPosts.classList.add('list-group', 'border-0', 'rounded-0');
  cardForPosts.append(ulForPosts);
  // конец рендера постов

  // начало рендера фидов
  const feeds = document.querySelector('.feeds');

  const cardForFeeds = document.createElement('div');
  cardForFeeds.classList.add('card', 'border-0');
  feeds.append(cardForFeeds);

  const divForCardBodyfeeds = document.createElement('div');
  divForCardBodyfeeds.classList.add('card-body');

  const h2ForFeeds = document.createElement('h2');
  h2ForFeeds.classList.add('card-title', 'h4');
  h2ForFeeds.textContent = 'Фиды';
  divForCardBodyfeeds.append(h2ForFeeds);
  cardForFeeds.append(divForCardBodyfeeds);

  const ulForFeeds = document.createElement('ul');
  ulForFeeds.classList.add('list-group', 'border-0', 'rounded-0', 'feed-list');
  cardForFeeds.append(ulForFeeds);
};

const getRss = (value) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(value.data.contents, 'application/xml');
  return xml;
};

export const render = (value, state) => {
  const ul = document.querySelector('.list-group');
  const feedsF = document.querySelector('.feed-list');

  const xml = getRss(value);
  const item = xml.querySelectorAll('item');

  const descr = xml.querySelector('channel');
  const feedField = descr.firstElementChild.textContent;

  if (!state.feedList.includes(feedField)) {
    const li = document.createElement('li');
    li.append(feedField);
    feedsF.append(li);
    state.feedList.push(feedField);
  }

  for (const i of item) {
    if (!state.posts.includes(i.querySelector('title').textContent)) {
      const title = i.querySelector('title');
      const href = i.querySelector('link');
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      li.setAttribute('id', _.uniqueId());
      const a = document.createElement('a');
      a.setAttribute('href', href.textContent);
      a.textContent = title.textContent;
      li.append(a);
      ul.append(li);
      state.posts.push(i.querySelector('title').textContent);
    }
  }
  return ul;
};
