// Función pura para filtrar películas
// La función toma dos parámetros: movies y searchTerm. 
// Recorre la lista de películas y devuelve aquellas que coinciden con el término de búsqueda, independientemente de si está en mayúsculas o minúsculas.
export function filterMoviesByTitle(movies, searchTerm) {
  return movies.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Función para ordenar películas por fecha de lanzamiento
export const sortByReleaseDate = (films, sortOrder) => {
  // La función toma dos parámetros: una matriz de películas y un orden de clasificación (ascendente o descendente). 
  // Usa el método slice() para crear una copia de la lista original, 
  // luego usa el método sort() para ordenar los elementos en base a las fechas de lanzamiento.
  // Compara las fechas en los objetos a y b con el método Date(), luego restando los resultados para obtener un valor numérico que indicará si la fecha en el objeto a es mayor, menor o igual a la del objeto b.

  // Ordenar de manera ascendente
  // Si el orden es ascendente, la función devuelve la matriz de películas ordenadas por fecha de lanzamiento más antigua a más reciente. Si el orden es descendente, la función devuelve la matriz de películas en el orden inverso.
  if (sortOrder === 'asc') {
    return films.slice().sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }
  
  // Ordenar de manera descendente
  if (sortOrder === 'desc') {
    return films.slice().sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }
};

// Función para ordenar películas por nombre alfabéticamente
// Condicional que comprueba si el parámetro sortOrder es igual a "AZ". 
// Si es así, devuelve una copia de la matriz films ordenada alfabéticamente ascendentemente usando el método localeCompare().
// La función localeCompare() compara dos cadenas de caracteres y devuelve un número entero que indica si la primera cadena es mayor, menor o igual a la segunda.
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