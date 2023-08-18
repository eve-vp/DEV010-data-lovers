// Importación de módulos y configuración
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle , sortByReleaseDate, sortByTitle } from './data.js';
// import Chart from 'chart.js';

// Obtención de referencias a elementos en el DOM
const statsContainer = document.querySelector(".stats-container");
const containerCard = document.querySelector(".grid-container");

// Función para crear el fragmento HTML de una película
const createMovieHTML = (movie) => {
  // Crear elementos de imagen, figura y botón
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = movie.poster;
  img.alt = movie.title;
  img.id = 'data-movie-id';

  // Crear el título de la película
  const figcaption = document.createElement('figcaption');
  figcaption.textContent = movie.title; // Agregar el título

  // Agregar el botón "Ver detalles"
  const viewDetailsButton = document.createElement('button');
  viewDetailsButton.textContent = 'View details';
  viewDetailsButton.classList.add('view-details-button');

  // Agregar evento click para mostrar el popup
  viewDetailsButton.addEventListener('click', () => {
    showMoviePopup(movie);
  });

  // Agregar título y botón al figcaption
  figcaption.appendChild(viewDetailsButton);

  // Agregar imagen y figcaption a la figura
  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure.outerHTML;
};

// Crear popup para mostrar detalles de la película
const popUp = document.createElement('dialog');
document.body.appendChild(popUp);
popUp.setAttribute('id', 'popupDialog');
containerCard.appendChild(popUp);

// Renderizar las películas en el contenedor
function renderMovies(movies, container) {
  const moviesHTML = movies.map(createMovieHTML).join('');
  container.innerHTML = moviesHTML;

  // Establecer altura fija para las imágenes
  const movieImages = container.querySelectorAll('img');
  movieImages.forEach(image => {
    image.style.height = '260px';
  });
}

// Obtén los elementos del campo de entrada y el contenedor
const searchInput = document.querySelector('#searchInput');
const container = document.querySelector('.movie-grid');
const noResultsMessage = document.querySelector('#noResultsMessage');

// Mostrar todas las películas inicialmente
renderMovies(data.films, container);

// Agrega un evento keyup al campo de búsqueda
searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.trim();
  const matchingFilms = filterMoviesByTitle(data.films, searchTerm);
  // Mostrar u ocultar mensajes y películas según los resultados
  if (matchingFilms.length === 0) {
    noResultsMessage.style.display = 'block';
    container.style.display = 'none';
  } else {
    noResultsMessage.style.display = 'none';
    container.style.display = 'grid';
    renderMovies(matchingFilms, container)
  }
});

//Función para vincular sort con el DOM
const sortSelect = document.querySelector('#sort');

// Agregar un evento change al select de ordenamiento por fecha
sortSelect.addEventListener('change', () => {
  const sortOrder = sortSelect.value; // 'asc' o 'desc'
  const sortedFilms = sortByReleaseDate(data.films, sortOrder);
  renderMovies(sortedFilms, container);
});

// Agregar un evento change al select de ordenamiento por título
sortSelect.addEventListener('change', () => {
  const sortOrder = sortSelect.value; // 'AZ - ZA'
  const sortedFilms = sortByTitle(data.films, sortOrder);
  renderMovies(sortedFilms, container);
});

// Función para mostrar el popup de la película
const showMoviePopup = (movie) => {
  // Obtener nombres de los personajes
  const characters = movie.people.map(person => person.name).join(', ');
  
  // Crear contenido del popup con detalles de la película
  const popContent = `
      <h2>${movie.title}</h2>
      <p>Release date: ${movie.release_date}</p>
      <p>Director: ${movie.director}</p>
      <p>Producer: ${movie.producer}</p>
      <p>Description: ${movie.description}</p>
      <p>Characters: ${characters}</p>
      <img src="${movie.poster}" alt="${movie.title} Poster" />
    `;

  // Agregar contenido al popup
  popUp.innerHTML = popContent;
  
  // Crear botón de cierre y agregar evento click
  const closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.textContent = "Close";
  popUp.appendChild(closeButton);
  
  closeButton.addEventListener('click', () => {
    popUp.close();
  });
  
  // Mostrar el popup
  popUp.showModal();
};

// Función para mostrar las películas como tarjetas
const showMoviesInCards = (movies) => {
  container.innerHTML = '';
  movies.forEach((movie, index) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('box');
    movieCard.dataset.movieIndex = index;
    movieCard.innerHTML = createMovieHTML(movie);

    movieCard.addEventListener('click', () => {
      showMoviePopup(movie);// Llama a la función con la película adecuada
    });
    container.appendChild(movieCard);
  });
};

// Mostrar películas como tarjetas
showMoviesInCards(data.films);

// ESTADÍSTICAS //

// Cálculo y visualización de estadísticas
function computeStats(data) {
  let num_female_characters = 0; //Contador para el número de personajes femeninos.
  let num_male_characters = 0; //Contador para el número de personajes masculinos.
  let num_nonhuman_species = 0; //nun_  son variables que se crean y se inicializan con un valor de 0


  data.films.forEach((film) => { // forEach código que se ejecutará para cada elemento
    film.people.forEach((person) => {
      if (person.gender === "Female") {
        num_female_characters += 1; //a medida que el código itera a través de los datos permitirá el cálculo de estadísticas
      } else if (person.gender === "Male") {
        num_male_characters += 1;
      }

      if (person.species !== "Human") {
        num_nonhuman_species += 1;
      }
    });
  });

  return {
    num_female_characters: num_female_characters,
    num_male_characters: num_male_characters,
    num_nonhuman_species: num_nonhuman_species
  };
}

// Mostrar y ocultar el display de estadísticas
document.addEventListener("DOMContentLoaded", () => {
  const showStatsButton = document.getElementById("showStatsButton");
  
  showStatsButton.addEventListener("click", () => {
    if (statsContainer.style.display === "none" || !statsContainer.style.display) {
      showStats();
    } else {
      hideStats();
    }
  });
})

// Mostrar las estadísticas
function showStats() {
  const stats = computeStats(data);
  const statsHTML = `
    <p>The number of female characters is: ${stats.num_female_characters}</p>
    <p>The number of male characters is: ${stats.num_male_characters}</p>
    <p>The number of non-human species is: ${stats.num_nonhuman_species}</p>
  `;
  statsContainer.innerHTML = statsHTML;
  statsContainer.style.display = "block";
}

// Ocultar las estadísticas
function hideStats() {
  statsContainer.style.display = "none";
}

// Llamar a hideStats al inicio para que las estadísticas estén ocultas
hideStats();

// CHART.JS //

/// Obtén una referencia al botón de mostrar gráfico
const showChartButton = document.getElementById("showChartButton");

// Obtén una referencia al contenedor del gráfico
const chartContainer = document.querySelector(".chart-container");

// Almacena una referencia al gráfico actual para poder destruirlo
let characterStatsChart = null;

// Agrega un evento click al botón de mostrar gráfico
showChartButton.addEventListener("click", () => {
  if (chartContainer.style.display === "none" || !chartContainer.style.display) {
    // Mostrar el gráfico
    chartContainer.style.display = "block";

    // Destruye el gráfico existente si hay uno
    if (characterStatsChart) {
      characterStatsChart.destroy();
    }

    // Reemplaza estos valores con los datos adecuados de tu estadística
    const labels = ['Female Characters', 'Male Characters', 'Non-Human Species'];
    const dataPoints = [81, 87, 171]; // Valores de ejemplo, reemplázalos con tus valores

    // Crear el gráfico
    const ctx = document.getElementById('characterStatsChart').getContext('2d');

    characterStatsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Characters',
          data: dataPoints,
          backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          datalabels: {
            display: true,
            color: 'black',
            anchor: 'end',
            align: 'top',
            formatter: function(value, context) {
              // Personaliza la etiqueta o el punto de datos aquí
              if (context.dataIndex === 0) {
                return 'Female: ' + value;
              } else if (context.dataIndex === 1) {
                return 'Male: ' + value;
              } else {
                return 'Non-Human Species: ' + value;
              }
            }
          }
        }
      }
    });
  } else {
    // Ocultar el gráfico
    chartContainer.style.display = "none";
  }
});

// Boton close
const closeButton = document.getElementById("closeButton");

closeButton.addEventListener("click", () => {
  const statsContainer = document.querySelector(".stats-container");
  const chartContainer = document.querySelector(".chart-container");
  statsContainer.style.display = "none";
  chartContainer.style.display = "none";
});
