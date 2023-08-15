// Importa los datos
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle , sortByReleaseDate, sortByTitle } from './data.js';

const containerCard = document.querySelector(".grid-container");

// Función para crear el HTML de una película
// function createMovieHTML(movie) {
//   return `
//     <figure>
//       <img src="${movie.poster}" id="data-movie-id" alt="${movie.title}" />
//       <figcaption>${movie.title}</figcaption>
//     </figure>
//   `;
// }

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

// Función para mostrar las películas que coinciden con el término de búsqueda
function showMatchingFilms(movies, searchTerm, container) {
  const matchingFilms = filterMoviesByTitle(movies, searchTerm);
  renderMovies(matchingFilms, container);
}

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

// Obtén los elementos del campo de entrada y el contenedor
const searchInput = document.querySelector('#searchInput');
const container = document.querySelector('.movie-grid');
const noResultsMessage = document.querySelector('#noResultsMessage');

// Llama a la función inicialmente para mostrar todas las películas
renderMovies(data.films, container);

// Agrega un evento keyup al campo de búsqueda
searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.trim();
  const matchingFilms = filterMoviesByTitle(data.films, searchTerm);
  if (matchingFilms.length === 0) {
    noResultsMessage.style.display = 'block';
    container.style.display = 'none';
    // container.innerHTML = ''; 
  } else {
    noResultsMessage.style.display = 'none';
    container.style.display = 'grid';
    renderMovies(matchingFilms, container)
  }
});

//Función para vincular sort con el DOM
const sortSelect = document.querySelector('#sort');

// Agregar un evento change al select
sortSelect.addEventListener('change', () => {
  const sortOrder = sortSelect.value; // 'asc' o 'desc'
  const sortedFilms = sortByReleaseDate(data.films, sortOrder);
  
  // Llamar a la función para mostrar las películas ordenadas en el DOM
  renderMovies(sortedFilms, container);
});

// Agregar un evento change al select
sortSelect.addEventListener('change', () => {
  const sortOrder = sortSelect.value; // 'AZ - ZA'
  const sortedFilms = sortByTitle(data.films, sortOrder);
  
  // Llamar a la función para mostrar las películas ordenadas en el DOM
  renderMovies(sortedFilms, container);
});

// Función para mostrar el popup de la película
const showMoviePopup = (movie) => {
  const popContent = `
      <h2>${movie.title}</h2>
      <p>Release date: ${movie.release_date}</p>
      <p>Director: ${movie.director}</p>
      <p>Producer: ${movie.producer}</p>
      <p>Description: ${movie.description}</p>
      <img src="${movie.poster}" alt="${movie.title} Poster" />
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
