// Importa los datos
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle , sortByReleaseDate, sortByTitle} from './data.js';

// Función para crear el HTML de una película
// Recibe un objeto movie como argumento y devuelve una cadena de texto en formato HTML
// Contiene una estructura de figura que incluye una imagen con la URL del póster y el título de la película como atributos
function createMovieHTML(movie) {
  return `
    <figure>
      <img src="${movie.poster}" alt="${movie.title}" />
      <figcaption>${movie.title}</figcaption>
    </figure>
  `;
}

// Función para mostrar las películas que coinciden con el término de búsqueda
function showMatchingFilms(movies, searchTerm, container) {
  const matchingFilms = filterMoviesByTitle(movies, searchTerm);
  renderMovies(matchingFilms, container);
}

// Función para renderizar las películas en el contenedor
function renderMovies(movies, container) {
  const moviesHTML = movies.map(createMovieHTML).join('');
  container.innerHTML = moviesHTML;

  // Asegurarse de que todas las imágenes tengan el mismo tamaño
  const movieImages = container.querySelectorAll('img');
  movieImages.forEach(image => {
    image.style.height = '260px'; // Establecer la misma altura para todas las imágenes
  });
}

// Obtén los elementos del campo de entrada y el botón de búsqueda
const searchInput = document.querySelector('#searchInput');
//const refreshButton = document.querySelector('#refreshButton');
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

// Agrega un evento click al botón de actualización
// refreshButton.addEventListener('click', () => {
//   container.value = '';
//   renderMovies(data.films, container);
// });


// Obtén el elemento del popup y los elementos para mostrar la información
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');
const closePopupButton = document.getElementById('closePopup');

// Agrega un evento click a las imágenes de las películas
container.addEventListener('click', (event) => {
  const movieImage = event.target.closest('img');
  if (movieImage) {
    const movieId = movieImage.dataset.movieId; // Asegúrate de tener un atributo 'data-movie-id' en la imagen
    const selectedMovie = data.films.find(movie => movie.id === movieId);
    
    if (selectedMovie) {
      popupTitle.textContent = selectedMovie.title;
      popupDescription.textContent = selectedMovie.description;
      // Actualiza más detalles del popup con la información de la película
      popup.style.display = 'block';
    }
  }
});

// Agrega un evento click para cerrar el popup
closePopupButton.addEventListener('click', () => {
  popup.style.display = 'none';
});


// Obtén los elementos del campo de entrada y el botón de búsqueda
// ... (tu código existente)

// Agrega un evento click a las imágenes para abrir el popup
container.addEventListener('click', event => {
  const clickedImage = event.target;
  const movieId = clickedImage.getAttribute('data-movie-id');
  if (movieId) {
    openPopup(movieId);
  }
});

// ... (tu código existente)


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