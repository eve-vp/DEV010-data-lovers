// Importa los datos
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle, sortByReleaseDate, sortByTitle } from './data.js';

const containerCard = document.querySelector(".grid-container");

// Función para crear el HTML de una película
const createMovieHTML = (movie) => {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = movie.poster;
  img.alt = movie.title;
  img.id = 'data-movie-id';
  const figcaption = document.createElement('figcaption');
  figcaption.textContent = movie.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure.outerHTML;
};

const popUp = document.createElement('dialog');
document.body.appendChild(popUp);
popUp.setAttribute('id', 'popupDialog');
containerCard.appendChild(popUp);

function renderMovies(movies, container) {
  const moviesHTML = movies.map(createMovieHTML).join('');
  container.innerHTML = moviesHTML;

  const movieImages = container.querySelectorAll('img');
  movieImages.forEach(image => {
    image.style.height = '260px';
  });
}

const searchInput = document.querySelector('#searchInput');
const container = document.querySelector('.movie-grid');
const noResultsMessage = document.querySelector('#noResultsMessage');

renderMovies(data.films, container);

searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.trim();
  const matchingFilms = filterMoviesByTitle(data.films, searchTerm);
  if (matchingFilms.length === 0) {
    noResultsMessage.style.display = 'block';
    container.style.display = 'none';
  } else {
    noResultsMessage.style.display = 'none';
    container.style.display = 'grid';
    renderMovies(matchingFilms, container);
  }
});

const sortSelect = document.querySelector('#sort');

sortSelect.addEventListener('change', () => {
  const sortOrder = sortSelect.value;
  let sortedFilms;

  if (sortOrder === 'releaseDate') {
    sortedFilms = sortByReleaseDate(data.films);
  } else if (sortOrder === 'title') {
    sortedFilms = sortByTitle(data.films);
  }

  renderMovies(sortedFilms, container);
});

const showMoviePopup = (movie) => {
  const popContent = `
    <h2>${movie.title}</h2>
    <p>Release Year: ${movie.releaseYear}</p>
    <p>Director: ${movie.director}</p>
    <p>Producer: ${movie.producer}</p>
    <p>Description: ${movie.description}</p>
    <p>People: ${movie.people}</p>
    <img src="${movie.posterURL}" alt="${movie.title} Poster" />
  `;

  popUp.innerHTML = popContent;
  const closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.textContent = "Cerrar";
  popUp.appendChild(closeButton);

  closeButton.addEventListener('click', () => {
    popUp.close();
  });

  popUp.showModal();
};

const showMoviesInCards = (movies) => {
  container.innerHTML = '';
  movies.forEach((movie, index) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('box');
    movieCard.dataset.movieIndex = index;
    movieCard.innerHTML = createMovieHTML(movie);
    movieCard.addEventListener('click', () => {
      showMoviePopup(movie);
    });
    container.appendChild(movieCard);
  });
};

showMoviesInCards(data.films);
