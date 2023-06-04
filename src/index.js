import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async e => {
  e.preventDefault();

  const q = document.querySelector('[name="searchQuery"]').value;
  console.log(q);

  try {
    const apiKey = '37018650-559b86afe30fd9216457fcff9';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${q}&per_page=40`;

    currentQuery = q;
    currentPage = 1;

    const response = await axios.get(apiUrl);
    const photos = response.data.hits;

    console.log(photos);

    gallery.innerHTML = '';

    if (photos.length === 0) {
      Notify.failure('Brak wyników wyszukiwania');
      loadMoreBtn.style.display = 'none';
    } else {
      photos.forEach(photo => {
        const image = document.createElement('img');
        image.src = photo.webformatURL;
        gallery.appendChild(image);
      });

      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    Notify.failure(error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    const apiKey = '37018650-559b86afe30fd9216457fcff9';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${currentQuery}&per_page=40&page=${
      currentPage + 1
    }`;

    const response = await axios.get(apiUrl);
    const photos = response.data.hits;

    if (photos.length === 0) {
      Notify.failure('Brak kolejnych wyników');
      loadMoreBtn.style.display = 'none';
    } else {
      photos.forEach(photo => {
        const image = document.createElement('img');
        image.src = photo.webformatURL;
        gallery.appendChild(image);
      });

      currentPage += 1;
    }
  } catch (error) {
    Notify.failure(error);
  }
});
