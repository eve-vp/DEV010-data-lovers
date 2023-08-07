import data from './data/ghibli/ghibli.js'

// const titles = films.map((title) => title.title);
// console.log(titles);
{

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

// Llamar a la función printdata()
printdata(data.films);

}


// Obtén el elemento del campo de entrada y el botón de búsqueda
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

// Obtén el contenedor de las películas
const container = document.querySelector('.movie-grid');

// Función para mostrar las películas que coinciden con el término de búsqueda
function showMatchingFilms(searchTerm) {
  container.innerHTML = ''; // Limpiar el contenedor antes de mostrar las películas

  // Filtrar las películas que coinciden con el término de búsqueda
  const matchingFilms = data.films.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mostrar las películas que coinciden con el término de búsqueda
  for (let i = 0; i < matchingFilms.length; i++) {
    const movie = matchingFilms[i];
    container.innerHTML += ` <figure>  
      <img
        src="${movie.poster}"
        alt="${movie.title}"
      />
      <figcaption>${movie.title}</figcaption>
      <p>"${movie.director}"</p>
      <p>"${movie.release_date}"</p>
      <p>"${movie.description}"</p>
      <p>"${movie.director}"</p>
    </figure>`;
  }
}

// Llama a la función inicialmente para mostrar todas las películas
printdata(data.films);

//Agrega un evento keyup al botón de búsqueda//FUNCIONA :)
searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.trim(); // Obtén el término de búsqueda y elimina espacios en blanco al inicio y final
  showMatchingFilms(searchTerm);
});

//Queremos que se limpie el buscador y vuelva a aparecer la data de películas // VA A FUNCIONAR :)
searchButton.addEventListener('click', () => {
  searchInput.value = "";
  //start();
})




