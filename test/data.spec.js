import { filterMoviesByTitle } from '../src/data.js';
import { sortByReleaseDate } from '../src/data.js';
import { sortByTitle } from '../src/data.js';

//import data from './data/ghibli/ghibli.js';


// función filterMoviesByTitle:
//     Si la función es una función.
//     Si la función filtra correctamente las películas según el término de búsqueda.
//     Si la función es insensible a mayúsculas y minúsculas en el término de búsqueda.

describe('filterMoviesByTitle', () => {
  // Ejemplo de peliculas para la prueba
  const movies = [
    { title: 'Castle in the Sky' },
    { title: 'Spirited Away' },
    { title: 'Ponyo on the Cliff by the Sea' },
    { title: 'The Wind Rises' },
  ];  

  it('is a function', () => {
    // Verificar si filterMoviesByTitle es una función
    expect(typeof filterMoviesByTitle).toBe('function')
  });

  it('returns movies containing the search term', () => {
    // devuelve películas que contienen el término de búsqueda
    const searchTerm = 'Away';
    const filteredMovies = filterMoviesByTitle(movies, searchTerm);
    // Esperamos que solo 'Spirited Away' esté en la lista filtrada
    expect(filteredMovies).toEqual([{ title: 'Spirited Away' }]); 
  });

  // mayúsculas y minúsculas en el término de búsqueda
  it('is case-insensitive', () => {
    const searchTerm = 'awAy';
    const filteredMovies = filterMoviesByTitle(movies, searchTerm);

    // Esperamos que solo 'Spirited Away' esté en la lista filtrada
    expect(filteredMovies).toEqual([{ title: 'Spirited Away' }]);
  });

  // Adicionar cuál es el error y sugerir con qué podría corrergir
});

// Test para el orden según
// ascendente o descendente por año

describe('sortByReleaseDate', () => {
    const films = [
    { title: 'Film 1', release_date: '1996-01-01' },
    { title: 'Film 2', release_date: '1984-01-01' },
    { title: 'Film 3', release_date: '2004-01-01' },
];

  it('should sort films by release date in ascending order', () => {
    const sortedFilms = sortByReleaseDate(films, 'asc');
    // Asegurarse de que las películas estén ordenadas correctamente
    expect(sortedFilms).toEqual([
      { title: 'Film 1', release_date: '1984-01-01' },
      { title: 'Film 2', release_date: '1996-01-01' },
      { title: 'Film 3', release_date: '2004-01-01' },
    ]);
  });

  it('should sort films by release date in descending order', () => {
    const sortedFilms = sortByReleaseDate(data.films, 'desc');
    // Asegurarse de que las películas estén ordenadas correctamente
    expect(sortedFilms).toEqual([
      { title: 'Film 3', release_date: '2004-01-01' },
      { title: 'Film 1', release_date: '1984-01-01' },
      { title: 'Film 2', release_date: '1996-01-01' },
    ]);
  });
});

// Test para el orden según
//  A-Z o Z-A

describe('sortByTitle', () => {
  const films = [
    { title: 'Film C', release_date: '2004-01-01' },
    { title: 'Film A', release_date: '1984-01-01' },
    { title: 'Film B', release_date: '1996-01-01' },
  ];

  it('should sort films by title in ascending order', () => {
    const sortedFilms = sortByTitle(films, 'AZ');
    // Asegurarse de que las películas estén ordenadas correctamente
    expect(sortedFilms).toEqual([
      { title: 'Film A', release_date: '1984-01-01' },
      { title: 'Film B', release_date: '1996-01-01' },
      { title: 'Film C', release_date: '2004-01-01' },
    ]);
  });

  it('should sort films by title in descending order', () => {
    const sortedFilms = sortByTitle(films, 'ZA');
    // Asegurarse de que las películas estén ordenadas correctamente
    expect(sortedFilms).toEqual([
      { title: 'Film C', release_date: '2004-01-01' },
      { title: 'Film B', release_date: '1996-01-01' },
      { title: 'Film A', release_date: '1984-01-01' },
    ]);
  });
});



