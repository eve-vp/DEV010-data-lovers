
// Función pura para filtrar películas
export function filterMoviesByTitle(movies, searchTerm) {
  return movies.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Función para ordenar películas por fecha de lanzamiento
export const sortByReleaseDate = (films, sortOrder) => {
  // Ordenar de manera ascendente
  if (sortOrder === 'asc') {
    return films.slice().sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }
  
  // Ordenar de manera descendente
  if (sortOrder === 'desc') {
    return films.slice().sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }
};

// export const sortByReleaseDate = (films, sortOrder) => {
//   // Ordenar de manera ascendente
//   if (sortOrder === 'asc') {
//     return films.slice().sort((a, b) => a.release_date.localeCompare(b.release_date))
//     // return films.slice().sort((a, b) => a.release_date - b.release_date); 
//     // films.slice() crea una nueva copia de la matriz de películas para evitar modificar la matriz original.
//     // .sort() ordena la matriz en su lugar según la función de comparación proporcionada.
//   }
  
//   // Ordenar de manera descendente
//   if (sortOrder === 'desc') {
//     return films.slice().sort((a, b) => b.release_date.localeCompare(a.release_date));
//     // return films.slice().sort((a, b) => b.release_date - a.release_date);
//   }
// };

// Función para ordenar películas por nombre alfabéticamente
export const sortByTitle = (films, sortOrder) => {
  // Ordenar de manera ascendente
  if (sortOrder === 'AZ') {
    return films.slice().sort((a, b) => a.title.localeCompare(b.title));
  }
  
  // Ordenar de manera descendente
  if (sortOrder === 'ZA') {
    return films.slice().sort((a, b) => b.title.localeCompare(a.title));
  }
};

