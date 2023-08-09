import { filterMoviesByTitle } from '../src/data.js';
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


// describe('anotherExample', () => {
//   it('is a function', () => {
//     expect(typeof anotherExample).toBe('function');
//   });

//   it('returns `anotherExample`', () => {
//     expect(anotherExample()).toBe('OMG');
//   });
// });


// 1. unidad que esta siendo testeada
// describe('Products Service', function() {
//     describe('Add new product', function() {
//       2. escenario y 3. quá se espera
//       it('When no price is specified, then the product status is pending approval', ()=> {
//         const newProduct = new ProductService().add(...);
//         expect(newProduct.status).to.equal('pendingApproval');
//       });
//     });
//   });

