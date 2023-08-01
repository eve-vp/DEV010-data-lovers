//Para todo el código que tenga que ver con mostrar los datos en la pantalla. Con esto nos referimos básicamente a la interacción con el DOM.
// Operaciones como creación de nodos, registro de manejadores de eventos (event listeners o event handlers)...

// INCLUIDO EN FORMATO //
//import { example } from './data.js';
// import data from './data/lol/lol.js';
//import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';

import data from './data/ghibli/ghibli.js'

console.log(data.films);

//const cant = data.films.length;
//console.log(cant);

function searchFilms() {
    const searchInput = document.getElementById("searchInput").value;
    const searchResults = document.getElementById("searchResults");

    // Limpia los resultados anteriores
    searchResults.innerHTML = "";

    // Filtra las películas que coincidan con la búsqueda
    const results = data.films.filter((film) =>
    film.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (results.length === 0) {
    searchResults.innerHTML = "No se encontraron resultados.";
    return;
    }

    // Muestra los resultados
    results.forEach((film) => {
    const filmDiv = document.createElement("div");
    filmDiv.innerHTML = `
        <h3>${film.title}</h3>
        <p>${film.description}</p>
        <img src="${film.poster}" alt="${film.title}" width="200">
        <p>Director: ${film.director}</p>
        <p>Productor: ${film.producer}</p>
        <p>Fecha de lanzamiento: ${film.release_date}</p>
        <p>Puntuación Rotten Tomatoes: ${film.rt_score}</p>
    `;
    searchResults.appendChild(filmDiv);
    });
}  


