// Importación de módulos y configuración
import data from './data/ghibli/ghibli.js';
import { filterMoviesByTitle , sortByReleaseDate, sortByTitle } from './data.js';
// import Chart from 'chart.js';

// Obtención de referencias a elementos en el DOM
const statsContainer = document.querySelector(".stats-container");
const containerCard = document.querySelector(".grid-container");

// Función para crear el fragmento HTML de una película
// createElement es un método utilizado para crear un nuevo elemento HTML, recibe un parámetro el nombre de la etiqueta del elemento.
const createMovieHTML = (movie) => {
  // Crear elementos de imagen, figura y botón
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = movie.poster;
  img.alt = movie.title;
  img.id = 'data-movie-id';

  // Crear el título de la película
  // figcaption se utiliza como hijo del elemento figure y puede contener texto u otros elementos HTML
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
  // appendChild es un método utilizado para agregar un elemento como hijo de otro elemento en el árbol DOM
  figcaption.appendChild(viewDetailsButton);

  // Agregar imagen y figcaption a la figura
  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure.outerHTML;
};

// Crear popup para mostrar detalles de la película
// Se crea un elemento "dialog" que se utilizará como un popup emergente para mostrar detalles de una película.
// Se agrega al DOM y se establece su ID.
const popUp = document.createElement('dialog');
document.body.appendChild(popUp);
popUp.setAttribute('id', 'popupDialog');
containerCard.appendChild(popUp);

// Renderizar las películas en el contenedor
// La función renderMovies se encarga de renderizar las películas en el contenedor especificado.
// Recibe dos parámetros: movies, que es un arreglo con las películas a renderizar, 
// y container , que es el elemento HTML donde se mostrarán las películas.
// La funcion crea una cadena de HTML utilizando el método map para recorrer el arreglo de películas y
// la función createMovieHTML para generar el HTML de cada película. 
// Por ultimo asigna ese cadena al contenido a mostrar en el HTML
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
// Obtiene referencias a elementos HTML como el campo de búsqueda, el contenedor de películas y mensajes de no resultados.
const searchInput = document.querySelector('#searchInput');
const container = document.querySelector('.movie-grid');
const noResultsMessage = document.querySelector('#noResultsMessage');

// Mostrar todas las películas inicialmente
// Al cargar la página, se muestran todas las películas en el contenedor utilizando la función 'renderMovies'.
renderMovies(data.films, container);

// Agrega un evento keyup al campo de búsqueda
// Cuando el usuario escribe en el campo de búsqueda, se filtran las películas por título y se actualiza la visualización.
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
//sortSelect es una constante que almacena una referencia al elemento select del DOM con el id "sort"
//Este elemento se utiliza para seleccionar el orden de clasificación de las películas.

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
// Esta función muestra un popup con los detalles de una película cuando se hace clic en el botón "View details".
// Utiliza información como título, fecha de lanzamiento, director, etc., del objeto de película.
const showMoviePopup = (movie) => {
  // Obtener nombres de los personajes
  const characters = movie.people.map(person => person.name).join(', ');
  
  // Crear contenido del popup con detalles de la película
  // Se utiliza ${ como parte de una cadena en JS
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
  // El código popUp se refiere a un elemento del DOM que representa una ventana emergente o modal
  // innerHTML es una propiedad de los elementos del DOM en JavaScript que permite acceder y modificar el contenido HTML dentro de un elemento.
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
// Esta función reemplaza las películas en el contenedor por tarjetas que, cuando se hacen clic, muestran el popup de detalles.
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
// Esta función calcula estadísticas como el número de personajes femeninos, masculinos y especies no humanas.
// Itera a través de las películas y sus personajes, incrementando contadores según ciertas condiciones.
function computeStats(data) {
  let num_female_characters = 0; // Contador para el número de personajes femeninos.
  let num_male_characters = 0; //C ontador para el número de personajes masculinos.
  let num_nonhuman_species = 0; // nun_ son variables que se crean y se inicializan con un valor de 0

  data.films.forEach((film) => { // forEach código que se ejecutará para cada elemento
    film.people.forEach((person) => {
      if (person.gender === "Female") {
        num_female_characters += 1; //  a medida que el código itera a través de los datos permitirá el cálculo de estadísticas
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
// Agrega un evento click al botón "Show Stats" para mostrar u ocultar las estadísticas.
// También define funciones para mostrar y ocultar las estadísticas.
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
// La variable stats es una constante que se utiliza para almacenar las estadísticas calculadas.
// La función computeStats recibe un parámetro llamado data
// data y se encarga de calcular las estadísticas de los personajes en base a ese conjunto de datos 
// data retorna un objeto que representa con número
  const stats = computeStats(data);
  const statsHTML = `
    <p>The number of female characters is: ${stats.num_female_characters}</p>
    <p>The number of male characters is: ${stats.num_male_characters}</p>
    <p>The number of non-human species is: ${stats.num_nonhuman_species}</p>
  `;
  statsContainer.innerHTML = statsHTML;
  statsContainer.style.display = "block";
}
//El código ${stats se utiliza para mostrar el valor de la variable stats dentro de una cadena de texto.
// La interpolación de cadenas en Js y permite insertar variables dentro de una cadena sin tener que concatenarlas manualmente. 
// Mostrará el valor de la variable stats dentro del texto que se asigna a la variable statsHTML.

// Ocultar las estadísticas
function hideStats() {
  statsContainer.style.display = "none";
}

// Llamar a hideStats al inicio para que las estadísticas estén ocultas
hideStats();

// CHART.JS //

// Obtén una referencia al botón de mostrar gráfico
// La variable chart es una constante que se utiliza para almacenar una referencia al gráfico.
const showChartButton = document.getElementById("showChartButton");

// Obtiene una referencia al contenedor donde se mostrará el gráfico.
const chartContainer = document.querySelector(".chart-container");

// Almacena una referencia al gráfico actual para poder destruirlo antes de recrearlo.
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
    // La variable labels se utiliza para almacenar las etiquetas que se mostrarán en el gráfico
    // La variable dataPoints es una constante que se utiliza para almacenar los valores de la estadística.
    const labels = ['Female Characters', 'Male Characters', 'Non-Human Species'];
    const dataPoints = [81, 87, 171]; // Valores de la estadistica 

    // Crear el gráfico
    // la variable ctx se utiliza para almacenar referencia  en el que se va dibujar el gráfico
    const ctx = document.getElementById('characterStatsChart').getContext('2d');

    // La línea de código crea una nueva instancia de la clase Chart y la asigna a la variable characterStatsChart. 
    // Se pasa el contexto (ctx) como argumento al constructor de Chart para especificar en qué elemento del DOM se dibujará el gráfico.
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
            beginAtZero: true // La propiedad beginAtZero se utiliza en la configuración del gráfico para especificar si el eje y debe comenzar en cero. Al establecerla en true, el gráfico comenzará desde cero en el eje y//
          }
        },
        plugins: { // plugins se utiliza para especificar los complementos que se utilizarán en la configuración del gráfico. 
          datalabels: { //activa el plugin "datalabels"
            display: true, // y se establece la propiedad "display" en true para mostrar las etiquetas de datos en el gráfico.
            color: 'black',
            anchor: 'end',
            align: 'top',
            // función formatter personaliza las etiquetas en el gráfico de barras de acuerdo a tipo de dato
            formatter: function(value, context) {
              // value es el válor numérico del punto actual de datos
              // contex es un objeto información sobre el punto actual de datos
              if (context.dataIndex === 0) { // === igualdad estricta a la posición 0
                return 'Female: ' + value;
              } else if (context.dataIndex === 1) { // === igualdad estricta a la posición 1
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
// Agrega un evento click al botón de cerrar para ocultar tanto el contenedor de estadísticas como el de gráfico.
const closeButton = document.getElementById("closeButton");

closeButton.addEventListener("click", () => {
  const statsContainer = document.querySelector(".stats-container");
  const chartContainer = document.querySelector(".chart-container");
  statsContainer.style.display = "none";
  chartContainer.style.display = "none";
});