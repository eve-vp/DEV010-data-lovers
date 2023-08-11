
// Función pura para filtrar películas
export function filterMoviesByTitle(movies, searchTerm) {
  return movies.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}


// Función para ordenar por año
// Creo un array con los date_release
// Los ordeno en orden ascendente y descendente
// Lo vinculo a DOM


// Obtener el array de películas desde la data
// const films = films.title

// Función para ordenar las fechas de lanzamiento
// function sortByReleaseDate(order = 'asc') {
//   const releaseDates = films.map(film => film.release_date);
  
//   if (order === 'asc') {
//     return releaseDates.slice().sort((a, b) => a.localeCompare(b));
//   } else if (order === 'desc') {
//     return releaseDates.slice().sort((a, b) => b.localeCompare(a));
//   } else {
//     return [];
//   }
// }

// console.log(releaseDates);
