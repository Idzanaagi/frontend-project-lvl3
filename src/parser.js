/* eslint-disable no-restricted-syntax */
export const renderStatic = () => {
  const section = document.createElement('section');
  section.classList.add('container-fluid', 'container-xxl', 'p-5');

  const row = document.createElement('div');
  row.classList.add('row');
  section.append(row);

  const posts = document.createElement('div');
  posts.classList.add('col-md-10', 'col-lg-8', 'order-1', 'mx-auto', 'posts');
  row.append(posts);

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  posts.append(card);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);

  const postsH2 = document.createElement('h2');
  postsH2.classList.add('card-title', 'h4');
  posts.textContent = 'Посты';
  card.append(postsH2);

  const container = document.querySelector('.container-fluid');
  container.append(section);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  posts.append(ul);

  const feeds = document.createElement('div');
  feeds.classList.add('col-md-10', 'col-lg-4', 'mx-auto', 'order-0', 'order-lg-1', 'feeds');
  row.append(feeds);

  const cardForFeeds = document.createElement('div');
  cardForFeeds.classList.add('card', 'border-0');
  feeds.append(cardForFeeds);

  const cardBodyForFeeds = document.createElement('div');
  cardBodyForFeeds.classList.add('card-body');
  cardForFeeds.append(cardBodyForFeeds);

  const feedsH2 = document.createElement('h2');
  feedsH2.classList.add('card-title', 'h4');
  feedsH2.textContent = 'Фиды';
  cardBodyForFeeds.append(feedsH2);

  const ulForFeed = document.createElement('ul');
  ulForFeed.classList.add('list-group', 'border-0', 'rounded-0');
  feeds.append(ulForFeed);
};

export const getRss = (value) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(value.data.contents, 'application/xml');
  return xml;
};

export const renderposts = (xml) => {
  const ul = document.querySelector('.list-group');
  ul.textContent = '';

  const item = xml.querySelectorAll('item');

  let count = 0;
  for (const i of item) {
    const title = i.querySelector('title');
    const href = i.querySelector('link');
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', href.textContent);
    a.setAttribute('data-id', `${count += 1}`);
    a.textContent = title.textContent;
    li.append(a);
    ul.append(li);
  }

  return ul;
};
