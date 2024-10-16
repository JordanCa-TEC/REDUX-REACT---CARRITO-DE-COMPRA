import { createStore } from 'redux';
import rootReducer from './path_to_your_store_file'; 
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions'; 

describe('Redux Store', () => {
  let store;

  beforeEach(() => {
    // Cree una nueva instancia de tienda antes de cada prueba
    store = createStore(rootReducer);
  });

  test('should initialize with the correct state', () => {
    const state = store.getState();
    expect(state.products).toHaveLength(3); 
    expect(state.cart).toHaveLength(0); 

    
    expect(state.products).toEqual([
      { id: 1, name: 'Producto 1', price: 100 },
      { id: 2, name: 'Producto 2', price: 150 },
      { id: 3, name: 'Producto 3', price: 200 },
    ]);
  });

  test('should handle adding an item to the cart', () => {
    const productToAdd = { id: 1, name: 'Producto 1', price: 100 };

    store.dispatch({
      type: ADD_TO_CART,
      payload: productToAdd,
    });

    const state = store.getState();
    expect(state.cart).toHaveLength(1);
    expect(state.cart[0]).toEqual(productToAdd);
  });

  test('should handle removing an item from the cart', () => {
    const productToAdd = { id: 1, name: 'Producto 1', price: 100 };

    
    store.dispatch({
      type: ADD_TO_CART,
      payload: productToAdd,
    });

    
    store.dispatch({
      type: REMOVE_FROM_CART,
      payload: productToAdd,
    });

    const state = store.getState();
    expect(state.cart).toHaveLength(0); 
  });
});
