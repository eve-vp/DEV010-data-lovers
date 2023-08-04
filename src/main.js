import data from './data/ghibli/ghibli.js'; // Importar los datos de las películas

function createMovieElement(movie) {
  const figure = document.createElement("figure");

  const movieImage = document.createElement("img");
  movieImage.src = movie.poster;
  movieImage.alt = movie.title;
  figure.appendChild(movieImage);

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = movie.title;
  figure.appendChild(figcaption);

  const openModalButton = document.createElement("button");
  openModalButton.textContent = "More info";
  openModalButton.classList.add("open-modal-button"); // Agregar una clase para identificar los botones de abrir modal
  figure.appendChild(openModalButton);

  // Agregar el evento click para abrir el modal
  openModalButton.addEventListener("click", () => {
    // Obtener el contenedor del modal
    const modalContainer = document.querySelector(".modal-container");

    // Mostrar los detalles de la película en el modal
    showmoviesdetails(movie, modalContainer);
  });

  return figure;
}

function printdata(array) {
  const container = document.querySelector('.movie-grid');

  for (let i = 0; i < array.length; i++) {
    const movie = array[i];
    const movieElement = createMovieElement(movie);
    container.appendChild(movieElement);
    // const figure = document.createElement("figure");

    // // Agregar la imagen y título de la película
    // const movieImage = document.createElement("img");
    // movieImage.src = movie.poster;
    // movieImage.alt = movie.title;
    // figure.appendChild(movieImage);
  
    // const figcaption = document.createElement("figcaption");
    // figcaption.textContent = movie.title;
    // figure.appendChild(figcaption);

  }
}
// Llamar a la función printdata() con los datos de películas
printdata(data.films);
