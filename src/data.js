
// Función pura para filtrar películas
export function filterMoviesByTitle(movies, searchTerm) {
  return movies.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Función para abrir el popup con los detalles de la película
function openPopup(movieId) {
  const movie = data.films.find(movie => movie.id === movieId);
  if (movie) {
    const popupContent = `
      <div class="popup">
        <div class="popup-content">
          <button class="close-popup">Cerrar</button>
          <h2>${movie.title}</h2>
          <p>${movie.description}</p>
          <p>Director: ${movie.director}</p>
          <p>Productor: ${movie.producer}</p>
          <div class="characters">
            <h3>Personajes</h3>
            ${movie.people.map(person => `
              <div class="character">
                <img src="${person.img}" alt="${person.name}" />
                <p>${person.name}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupContent);

    const closePopupButton = document.querySelector('.close-popup');
    closePopupButton.addEventListener('click', closePopup);
  }
}


// Función para cerrar el popup
function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
}