// Importa los datos
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle, sortByReleaseDate, sortByTitle} from './data.js';

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
  let moviesHTML; // Declarar moviesHTML fuera de la condición
  // MODIFCACIóN 12-08
  if (Array.isArray(movies) && movies.length > 0) {
    moviesHTML = movies.map(createMovieHTML).join('');
    // MODIFCACIóN 12-08
  } else {
    // Manejar el caso en el que "movies" no está definido o es una matriz vacía
    // container.innerHTML = moviesHTML;
    container.innerHTML = '';
  }
  // Asegurarse de que todas las imágenes tengan el mismo tamaño
  container.innerHTML = moviesHTML; 
  const movieImages = container.querySelectorAll('img');
  movieImages.forEach(image => {
    image.style.height = '260px'; // Establecer la misma altura para todas las imágenes
  });
}

// Obtén los elementos del campo de entrada y el botón de búsqueda
const searchInput = document.querySelector('#searchInput');
//const refreshButton = document.querySelector('#refreshButton');
//   43:9  error  Parsing error: Identifier 'container' has already been declared
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


//Función para vincular sort con el DOM
const sortSelect = document.querySelector('#sort');
const Container = document.querySelector('#movies-container');

// Agregar un evento change al select
sortSelect.addEventListener('change', () => {
  const sortOrder = sortSelect.value; // 'asc' o 'desc'
  //  Para que funcione correctamente agregamos un arreglo luego del test
  let sortedFilms;
  
  if (sortOrder === 'asc' || sortOrder === 'desc') { //OR (el resultado es verdadero si alguna expresión es verdadera)
    sortedFilms = sortByReleaseDate(data.films, sortOrder);  
  } 
  else if (sortOrder === 'AZ' || sortOrder === 'ZA') {
    sortedFilms = sortByTitle(data.films, sortOrder);
  }
  
  
  // Llamar a la función para mostrar las películas ordenadas en el DOM
  renderMovies(sortedFilms, container);
});

