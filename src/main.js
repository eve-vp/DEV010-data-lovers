// Importa los datos
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle , sortByReleaseDate, sortByTitle } from './data.js';

const statsContainer = document.querySelector(".stats-container");
const containerCard = document.querySelector(".grid-container");
const createMovieHTML = (movie, index) => {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = movie.poster;
  img.alt = movie.title;
  img.id = 'data-movie-id';

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

  // Agregar imagen y figcaption al figure
  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure.outerHTML;
};

// Función para mostrar las películas que coinciden con el término de búsqueda
function showMatchingFilms(movies, searchTerm, container) {
  const matchingFilms = filterMoviesByTitle(movies, searchTerm);
  // renderMovies(matchingFilms, container);
  showMoviesInCards(matchingFilms); // Generar elementos con controladores de eventos
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
  closeButton.textContent = "Close";
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
      showMoviePopup(movie);// Llama a la función con la película adecuada
    });
    container.appendChild(movieCard);
  });
};

showMoviesInCards(data.films);

//ESTADÍSTICAS
// Cuenta la cantidad de caracteres con género femenino o masculino.

function computeStats(data) {
  let num_female_characters = 0;
  let num_male_characters = 0;
  let num_nonhuman_species = 0;

  data.films.forEach((film) => {
    film.people.forEach((person) => {
      if (person.gender === "Female") {
        num_female_characters += 1;
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
    const dataPoints = [81, 87, 10]; // Valores de ejemplo, reemplázalos con tus valores

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
