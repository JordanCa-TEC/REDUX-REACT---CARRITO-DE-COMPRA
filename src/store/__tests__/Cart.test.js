import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from '../Cart';
import { removeFromCart } from '../actions';

// Creador de tienda simulada
const mockStore = configureStore([]);

describe('Cart Component', () => {
  let store;

  beforeEach(() => {
    // Cree una nueva instancia de tienda antes de cada prueba
    store = mockStore({
      cart: [
        { name: 'Product A', price: 10 },
        { name: 'Product B', price: 20 },
      ],
    });

    store.dispatch = jest.fn();
  });

  test('renders cart items and total price', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Check if the cart items are rendered
    expect(screen.getByText(/Carrito de Compras/i)).toBeInTheDocument();
    expect(screen.getByText(/Product A - \$10/i)).toBeInTheDocument();
    expect(screen.getByText(/Product B - \$20/i)).toBeInTheDocument();

    // Check if total price is calculated correctly
    expect(screen.getByText(/Total: \$30/i)).toBeInTheDocument();
  });

  test('removing an item from the cart', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Find the remove button for Product A and click it
    const removeButton = screen.getByText(/Quitar del carrito/i);
    fireEvent.click(removeButton);

    // Check if the removeFromCart action is dispatched
    expect(store.dispatch).toHaveBeenCalledWith(removeFromCart({ name: 'Product A', price: 10 }));
  });

  test('displays empty cart message when cart is empty', () => {
    store = mockStore({
      cart: [],
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Check for the empty cart message
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });
});
