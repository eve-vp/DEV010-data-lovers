import { filterMoviesByTitle } from '../src/data.js';

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
    const searchTerm = 'away';
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


});


describe('anotherExample', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});

