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
  h2ForPosts.classList.add('card-title', 'h4');
  h2ForPosts.textContent = 'Посты';
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
  const ul = document.querySelector('.posts-list');
  const feedsF = document.querySelector('.feed-list');

  const xml = getRss(value);
  const item = xml.querySelectorAll('item');

  const channel = xml.querySelector('channel');
  const getFirstChannelElement = channel.firstElementChild;

  const getTitle = getFirstChannelElement.textContent;
  const getDescriptionChannel = getFirstChannelElement.nextElementSibling.textContent;

  if (!state.feedList.includes(getTitle)) {
    const li = document.createElement('li');
    li.classList.add('list-group', 'border-0', 'rounded-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = getTitle;
    li.append(h3);

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = getDescriptionChannel;

    li.append(p);
    feedsF.append(li);
    state.feedList.push(getTitle);
  }

  for (const i of item) {
    if (!state.posts.includes(i.querySelector('title').textContent)) {
      const title = i.querySelector('title');
      const href = i.querySelector('link');
      const description = i.querySelector('description');

      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      li.setAttribute('id', _.uniqueId());

      const a = document.createElement('a');
      a.setAttribute('href', href.textContent);
      a.classList.add('fw-bold');
      a.textContent = title.textContent;

      const myBtn = document.createElement('button');
      myBtn.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'my-btn');
      myBtn.textContent = 'Просмотр';

      const des = document.createElement('description');
      des.textContent = description.textContent;

      myBtn.append(des);
      des.style.display = 'none';
      li.append(a);
      li.append(myBtn);
      ul.append(li);
      state.posts.push(i.querySelector('title').textContent);
    }
  }

  const links = document.querySelectorAll('.my-btn');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      const myModal = new Modal(document.querySelector('#modal'));
      const title = document.querySelector('.modal-title');
      title.textContent = link.previousSibling.textContent;
      const body = document.querySelector('.modal-body');
      body.textContent = link.lastChild.textContent;
      const linkTo = document.querySelector('.full-article');
      const hr = link.previousSibling.href;
      linkTo.setAttribute('href', hr);
      const getA = link.parentNode.firstChild;
      getA.removeAttribute('class');
      getA.classList.add('fn-normal');
      myModal.show();
    });
  });

  return ul;
};
