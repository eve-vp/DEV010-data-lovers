
// ... Tu array de películas 'films' ...

  function showmoviesdetails(films, modalContainer) {
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = films.title;
  modalContent.appendChild(modalTitle);

  const modalImage = document.createElement("img");
  modalImage.src = films.poster;
  modalImage.alt = films.title;
  modalContent.appendChild(modalImage);

  const modalDescription = document.createElement("p");
  modalDescription.textContent = films.description;
  modalContent.appendChild(modalDescription);

  // Agregar más detalles que deseas mostrar en el modal

  modalContainer.innerHTML = ""; // Limpiar el contenido actual del modal
  modalContainer.appendChild(modalContent);
}

export function showmoviesdetails(films, modalContainer) {
  // ... código de la función showmoviesdetails ...
}
