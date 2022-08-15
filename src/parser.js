/* eslint-disable no-restricted-syntax */

import _ from 'lodash';
import { Modal } from 'bootstrap';

export const renderStatic = () => {
  // начало рендера постов
  const posts = document.querySelector('.posts');

  const cardForPosts = document.createElement('div');
  cardForPosts.classList.add('card', 'border-0');
  posts.append(cardForPosts);

  const divForCardBodyPosts = document.createElement('div');
  divForCardBodyPosts.classList.add('card-body');

  const h2ForPosts = document.createElement('h2');
  h2ForPosts.classList.add('card-title', 'h4', 'h2ForPosts');
  divForCardBodyPosts.append(h2ForPosts);
  cardForPosts.append(divForCardBodyPosts);

  const ulForPosts = document.createElement('ul');
  ulForPosts.classList.add('list-group', 'border-0', 'rounded-0', 'posts-list');
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
  h2ForFeeds.classList.add('card-title', 'h4', 'h2ForFeeds');
  divForCardBodyfeeds.append(h2ForFeeds);
  cardForFeeds.append(divForCardBodyfeeds);

  const ulForFeeds = document.createElement('ul');
  ulForFeeds.classList.add('list-group', 'border-0', 'rounded-0', 'feed-list');
  cardForFeeds.append(ulForFeeds);
};

const parser = (value) => {
  const domParser = new DOMParser();
  const xml = domParser.parseFromString(value.data.contents, 'application/xml');
  return xml;
};

export const render = (value, state) => {
  const postsList = document.querySelector('.posts-list');
  const feedsList = document.querySelector('.feed-list');
  const h2ForFeeds = document.querySelector('.h2ForFeeds');
  h2ForFeeds.textContent = 'Фиды';
  const h2ForPosts = document.querySelector('.h2ForPosts');
  h2ForPosts.textContent = 'Посты';
  const xml = parser(value);

  const itemsList = xml.querySelectorAll('item');
  const channel = xml.querySelector('channel');

  const firstChannelElement = channel.firstElementChild;
  const channelTitle = firstChannelElement.textContent;
  const channelDescription = firstChannelElement.nextElementSibling.textContent;

  if (!state.feedList.includes(channelTitle)) {
    const li = document.createElement('li');
    li.classList.add('list-group', 'border-0', 'rounded-0', 'border-end-0');
    li.setAttribute('id', _.uniqueId());

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = channelTitle;
    li.append(h3);

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = channelDescription;

    li.append(p);
    feedsList.append(li);
    state.feedList.push(channelTitle);
  }

  for (const i of itemsList) {
    if (!state.posts.includes(i.querySelector('title').textContent)) {
      const title = i.querySelector('title');
      const link = i.querySelector('link');
      const description = i.querySelector('description');

      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      li.setAttribute('id', _.uniqueId());

      const a = document.createElement('a');
      a.setAttribute('href', link.textContent);
      a.classList.add('fw-bold');
      a.textContent = title.textContent;

      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'my-btn');
      button.textContent = 'Просмотр';

      const descriptionElement = document.createElement('description');
      descriptionElement.textContent = description.textContent;

      button.append(descriptionElement);
      descriptionElement.style.display = 'none';
      li.append(a);
      li.append(button);
      postsList.append(li);
      state.posts.push(i.querySelector('title').textContent);
    }
  }

  const buttons = document.querySelectorAll('.my-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = new Modal(document.querySelector('#modal'));
      const titleModal = document.querySelector('.modal-title');
      titleModal.textContent = button.previousSibling.textContent;
      const bodyModal = document.querySelector('.modal-body');
      bodyModal.textContent = button.lastChild.textContent;
      const a = document.querySelector('.full-article');
      const link = button.previousSibling.href;
      a.setAttribute('href', link);
      const postLink = button.parentNode.firstChild;
      postLink.removeAttribute('class');
      postLink.classList.add('fn-normal');
      modal.show();
    });
  });

  return postsList;
};
