// INCLUIDO EN FORMATO //
//import { example } from './data.js';
// import data from './data/lol/lol.js';
//import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';

import data from './data/ghibli/ghibli.js'
// queremos que cuando el usuario escriba el nombre de la película y le traiga la imagen //

function printdata(array){
  const container = document.querySelector('.movie-grid')
  for(let i = 0 ; i< array.length; i++){
    // console.log(array[i]);
    // Esto se vino del HTML -->
    container.innerHTML += ` <figure>  
        <img
          src="${array[i].poster}"
          alt="${array[i].title}"
        />
        <figcaption>${array[i].title}</figcaption>
      </figure>` //template string
  }
}
printdata(data.films)





/// BUSCADOOOOOOOOORRRRRRR 
const searchTitle = 'Castle in the Sky';
// Utilizamos el método 'find()' para buscar la película por su título
const foundFilm = data.films.find((film) => film.title === searchTitle);
// Mostramos la película encontrada en la consola
// console.log(foundFilm);

let films = data.films;

// METODO MAP
// const titles = films.map((title) => title.title);
// console.log(titles);

// const directors = films.map((director) => director.director);
// console.log(directors);

// const releaseDates = films.map((releaseDate) => releaseDate.release_date);
// console.log(releaseDates); 

//METODO FLAT //Muestra todos los niveles, pero entrega TODA la información
// const characters = films.flat(Infinity);
// console.log(characters);





//BUSCADOR EN TIEMPO REAL // NO FUNCIONA

// const searcher = document.querySelector('input[placeholder="Search films"]');

// const containerTitles = document.querySelector(".contenedor-card");
// renderFilms(films, containerTitles, modalTitle);

// searcher.addEventListener("keyup", (e) => {
// //filtramos convirtiendo en minúsculas()
// //usamos includes para comparar el valor 
//   const results = films.filter(
//     (film) =>
//       film.title.toLocaleLowerCase().includes(e.target.value) ||
//       film.director.toLocaleLowerCase().includes(e.target.value)
//   );

//   renderFilms(results, containerTitles, modalTitle);
// });





