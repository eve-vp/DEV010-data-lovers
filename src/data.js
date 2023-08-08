// export const anotherExample = () => {
//   return 'OMG';
// };

// Función pura para filtrar películas
function filterMoviesByTitle(movies, searchTerm) {
  return movies.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export { filterMoviesByTitle };
