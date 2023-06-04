import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

import axios from 'axios';

form.addEventListener('submit', e => {
  e.preventDefault();

  const q = document.querySelector('[name="searchQuery"]').value;
  console.log(q);

  async function getPhotos() {
    try {
      const apiKey = '37018650-559b86afe30fd9216457fcff9';
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${q}&per_page=40`;

      const response = await axios.get(apiUrl);
      const photos = response.data.hits;

      console.log(photos);

      photos.forEach(photo => {
        const image = document.createElement('img');
        image.src = photo.webformatURL;
        gallery.appendChild(image);
      });
    } catch (error) {
      Notify.failure(error);
    }
  }
  getPhotos();
});
