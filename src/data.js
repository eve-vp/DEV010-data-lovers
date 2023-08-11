
// Función pura para filtrar películas
export function filterMoviesByTitle(movies, searchTerm) {
  return movies.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

