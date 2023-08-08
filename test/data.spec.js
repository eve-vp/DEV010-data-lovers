import { showMatchingFilms, anotherExample } from '../src/data.js';


describe(`movie search container`, () => {
  it('is a function', () => {
    expect(typeof example).toBe('function');
  });

  it('returns `example`', () => {
    expect(example()).toBe('example');
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


//1. unidad que esta siendo testeada
describe('Products Service', function() {
    describe('Add new product', function() {
      //2. escenario y 3. quá se espera
      it('When no price is specified, then the product status is pending approval', ()=> {
        const newProduct = new ProductService().add(...);
        expect(newProduct.status).to.equal('pendingApproval');
      });
    });
  });