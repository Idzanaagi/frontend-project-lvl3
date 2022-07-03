/* eslint-disable no-restricted-syntax */
const getRss = (value) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(value.data.contents, 'application/xml');

  const channel = doc.querySelector('channel');
  const channelTitle = channel.querySelector('title');
  const channelDescription = channel.querySelector('description');
  const feedsField = document.querySelector('.feeds');

  const newContainer = document.createElement('div');
  newContainer.classList.add('card', 'border-0');
  feedsField.append(newContainer);

  const newContainer2 = document.createElement('div');
  newContainer2.classList.add('card-body');

  const newH2 = document.createElement('h2');
  newH2.classList.add('card-title', 'h4');
  newH2.textContent = 'Фиды';
  newContainer2.prepend(newH2);
  feedsField.prepend(newContainer2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group-item', 'border-0', 'border-end-0');
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'border-0', 'border-end-0');
  const h3 = document.createElement('h3');
  h3.classList.add('h6', 'm-0');
  h3.textContent = channelDescription.textContent;
  const p = document.createElement('p');
  p.classList.add('m-0', 'small', 'text-black-50');
  p.textContent = channelTitle.textContent;
  li.append(p);
  li.append(h3);
  ul.append(li);
  newContainer.append(ul);

  const item = channel.querySelectorAll('item');
  const posts = document.querySelector('.posts');
  const divForPosts = document.createElement('div');
  divForPosts.classList.add('card', 'border-0');
  posts.append(divForPosts);

  const postH2 = document.createElement('h2');
  postH2.classList.add('card-title', 'h4');
  postH2.textContent = 'Посты';
  const newUl = document.createElement('ul');

  for (const i of item) {
    const title = i.querySelector('title');
    const href = i.querySelector('link');
    const li2 = document.createElement('li');

    const a = document.createElement('a');
    a.setAttribute('href', href.textContent);
    li2.textContent = title.textContent;
    li2.append(a);
    newUl.append(li2);
  }

  divForPosts.append(postH2);
  divForPosts.append(newUl);
};

export default getRss;
