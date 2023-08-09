///// PRUEBAS Y MAS PRUEBASSS //////
// Importa los datos
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle } from './data.js';

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
// Recibe tres parámetros (movies, searchTerm y container), luego llama a la función filterMoviesByTitle para filtrar las películas 
const matchingFilms = filterMoviesByTitle(movies, searchTerm);
renderMovies(matchingFilms, container);

// Función para renderizar las películas en el contenedor
// Toma un objeto de película y devuelve una cadena de HTML formateada con la información de la película. Esto separa la creación del contenido HTML de la función de renderizado principal.
// Utiliza el método map() para crear un nuevo array de cadenas HTML utilizando la función createMovieHTML(). Luego, utiliza el método join('') para combinar todas esas cadenas en una única cadena. Finalmente, actualiza el contenido del contenedor HTML con esta cadena.
function renderMovies(movies, container) {
  const moviesHTML = movies.map(createMovieHTML).join('');
  container.innerHTML = moviesHTML;
}

// Obtén los elementos del campo de entrada y el botón de búsqueda
// Crea tres constantes (searchImput, refreshButton y container)
const searchInput = document.querySelector('#searchInput');
const refreshButton = document.querySelector('#refreshButton');
const container = document.querySelector('.movie-grid');

// Llama a la función inicialmente para mostrar todas las películas
// Llamamos a renderMovies() pasando la lista de películas y el contenedor HTML.
renderMovies(data.films, container);

// Agrega un evento keyup al botón de búsqueda
searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.trim();
  showMatchingFilms(data.films, searchTerm, container);
});

// Agrega un evento click al botón de actualización
refreshButton.addEventListener('click', () => {
  renderMovies(data.films, container);
});



