
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
    return films.slice().sort((a, b) => a.release_date - b.release_date);
  }
  
  // Ordenar de manera descendente
  if (sortOrder === 'desc') {
    return films.slice().sort((a, b) => b.release_date - a.release_date);
  }
};

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

