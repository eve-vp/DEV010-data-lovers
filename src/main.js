import data from './data/ghibli/ghibli.js'

function printdata(array) {
  const container = document.querySelector('.movie-grid');

  for (let i = 0; i < array.length; i++) {
    const movie = array[i];
    const figure = document.createElement("figure");

    // Agregar la imagen y título de la película
    const movieImage = document.createElement("img");
    movieImage.src = movie.poster;
    movieImage.alt = movie.title;
    figure.appendChild(movieImage);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = movie.title;
    figure.appendChild(figcaption);

    // Crear el botón "Open modal"
    const openModalButton = document.createElement("button");
    openModalButton.textContent = "More Info";
    openModalButton.addEventListener("click", () => {
      // Mostrar los detalles de la película en el modal
      showmoviesdetails(movie, modalContainer);
    });

    // Agregar el botón al figure
    figure.appendChild(openModalButton);

    // Agregar el figure al contenedor de películas
    container.appendChild(figure);
  }
}

// Obtener el contenedor del modal
const modalContainer = document.querySelector(".modal-container");

// Llamar a la función printdata() con los datos de películas
printdata(data.films);
