// Importa los datos
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle , sortByReleaseDate } from './data.js';

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

// *************// Función para renderizar las películas en el contenedor
// function renderMovies(movies, container) {
//   // MODIFCACIóN 12-08
//   if (Array.isArray(movies) && movies.length > 0) {
//   const moviesHTML = movies.map(createMovieHTML).join('');
//     // MODIFCACIóN 12-08
//   } else {
//   // Manejar el caso en el que "movies" no está definido o es una matriz vacía
//   container.innerHTML = moviesHTML;
// }
// }************ REVISAR MODIFICACION 12-08

///////////////////////////////////
// Función para renderizar las películas en el contenedor
function renderMovies(movies, container) {
  const moviesHTML = movies.map(createMovieHTML).join('');
  container.innerHTML = moviesHTML;
///////////////////////////////////////

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

//*************************************/
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

// Agrega un evento click a las imágenes para abrir el popup
container.addEventListener('click', event => {
  const clickedImage = event.target;
  const movieId = clickedImage.getAttribute('data-movie-id');
  if (movieId) {
    openPopup(movieId);
  }
});

/////**********************************/

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

// FUNCIÓN para crear el contenido HTML del popup FUNCIONA?

///////////////////////////////////// REVISAR 12-08
// // Esperar a que se cargue completamente el DOM antes de acceder a los elementos
// document.addEventListener("DOMContentLoaded", () => {

//   // Obtener referencias a los botones y al contenedor del popup
//   const openPopupButton = document.getElementById("openPopupButton");
//   const closePopupButton = document.getElementById("closePopupButton");
//   const popupContainer = document.getElementById("popupContainer");


// // Evento al hacer clic en el botón "Open Movie Info"
// openPopupButton.addEventListener("click", () => {
//   // Cargar los datos de la película y mostrar el popup
//   loadMovieData((movieData) => {
//     const popupContent = createPopupHTML(movieData);
//     showPopup(popupContent);
//   });
// });

//   function createPopupHTML(movie) {
//   return `
//     <div class="popup-content">
//       <h2>${movie.title}</h2>
//       <p>Release Year: ${movie.releaseYear}</p>
//       <p>Director: ${movie.director}</p>
//       <p>Producer: ${movie.producer}</p>
//       <p>Description: ${movie.description}</p>
//       <p>People: ${movie.people}</p>
//       <img src="${movie.posterURL}" alt="${movie.title} Poster" />
//     </div>
//   `;
// }

// // Función para mostrar el popup
// function showPopup(content) {
//   // Mostrar el contenido del popup en el contenedor
//   popupContainer.innerHTML = content;
//   // Mostrar el contenedor del popup
//   popupContainer.classList.remove("hidden");
// }

// // Función para ocultar el popup
// function hidePopup() {
//   // Ocultar el contenedor del popup
//   popupContainer.classList.add("hidden");
//   // Limpiar el contenido del popup
//   popupContainer.innerHTML = "";
// }
// });

// // Evento al hacer clic en el botón "Close Movie Info"
// closePopupButton.addEventListener("click", () => {
//   // Ocultar el popup
//   hidePopup();
// });

// // Función para cargar los datos de una película (simulación)
// function loadMovieData(callback) {
  
//   // Se supongane que obtenemos los datos de la película de alguna manera
//   const movieData = {
//     title: "My Neighbor Totoro",
//     releaseYear: "1988",
//     director: "Hayao Miyazaki",
//     producer: "Hayao Miyazaki",
//     description: "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.",
//     people: "name 1, name 2",
//     posterURL: "${movie.posterURL}",
//   };

//   // Llamar al callback con los datos de la película
//   callback(movieData);
// }