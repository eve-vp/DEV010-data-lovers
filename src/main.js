import data from './data/ghibli/ghibli.js'



// queremos que cuando el usuario escriba el nombre de la película y le traiga la imagen //
const searchTitle = 'Castle in the Sky';
// Utilizamos el método 'find()' para buscar la película por su título
const foundFilm = data.films.find((film) => film.title === searchTitle);
// Mostramos la película encontrada en la consola
// console.log(foundFilm);

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
printdata(data.films);


