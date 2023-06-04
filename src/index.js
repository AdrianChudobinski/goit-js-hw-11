import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;

form.addEventListener('submit', e => {
  e.preventDefault();
  currentPage = 1;

  const q = document.querySelector('[name="searchQuery"]').value;
  console.log(q);

  async function getPhotos() {
    try {
      const apiKey = '37018650-559b86afe30fd9216457fcff9';
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${q}&page=${currentPage}&per_page=40`;

      const response = await axios.get(apiUrl);
      const photos = response.data.hits;

      console.log(photos);

      if (photos.length === 0) {
        Notify.failure('Brak wyników wyszukiwania');
      }

      photos.forEach(photo => {
        const image = document.createElement('img');
        image.src = photo.webformatURL;
        gallery.appendChild(image);
      });

      if (currentPage === 1) {
        loadMoreBtn.style.display = 'block';
      }
    } catch (error) {
      Notify.failure(error);
    }
  }

  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  getPhotos();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  getPhotos();
});
