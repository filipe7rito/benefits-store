import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { vi } from 'vitest';
import { products } from '../../../../test/fixtures/products';
import { Product } from '../../../api/products';
import App from '../../../App';
import { formatCurrency } from '../../../helpers/formatters';

vi.mock('../../../hooks/useAuth', async () => {
  const actual = (await vi.importActual('../../../hooks/useAuth')) as any;
  return {
    ...actual,
    useAuth: () => ({
      isAuthenticated: true,
      loading: false,
      user: {
        username: 'Amazing',
        balance: 500,
        purchasedProducts: [],
      },
      fetchUser: () => {},
    }),
  };
});

const cartItems = [] as Product[];

vi.mock('../../../hooks/useShoppingCart', async () => {
  const actual = (await vi.importActual(
    '../../../hooks/useShoppingCart'
  )) as any;
  return {
    ...actual,
    useShoppingCart: () => ({
      ...actual.useShoppingCart(),
      cartItems: cartItems,
    }),
  };
});

describe('ShoppingCart', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    cartItems.length = 0;
  });

  it('should be able to open the shopping cart', async () => {
    render(<App />);

    await waitFor(() => {
      const cartButton = screen.getByTestId('cart-button');

      fireEvent.click(cartButton.children[0]);

      expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
    });
  });

  it('should be able to see items in cart', async () => {
    cartItems.push(products.products[0]);
    cartItems.push(products.products[1]);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText(/products/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/products/i)[1]).toBeInTheDocument();
      expect(screen.getByText(/my orders/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      const cartButton = screen.getByTestId('cart-button');

      fireEvent.click(cartButton.children[0]);

      const shoppingCart = screen.getByTestId('shopping-cart');

      within(shoppingCart).getByText(products.products[0].name);
      within(shoppingCart).getByText(products.products[1].name);
      expect(
        screen.getByText(
          `Total: ${formatCurrency(
            cartItems.reduce((acc, item) => acc + item.price, 0)
          )}`
        )
      ).toBeInTheDocument();
    });
  });

  it('should be able to remove an item from the shopping cart', async () => {
    cartItems.push(products.products[0]);
    cartItems.push(products.products[1]);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));

    render(<App />);

    await waitFor(() => {
      const cartButton = screen.getByTestId('cart-button');

      fireEvent.click(cartButton.children[0]);

      const shoppingCart = screen.getByTestId('shopping-cart');

      const removeButton =
        within(shoppingCart).getAllByTestId('remove-from-cart')[0];

      fireEvent.click(removeButton);

      expect(
        screen.queryByText(products.products[0].name)
      ).not.toBeInTheDocument();

      expect(screen.getByText(products.products[1].name)).toBeInTheDocument();
    });
  });

  it('should be able to clear the shopping cart', async () => {
    cartItems.push(products.products[0]);
    cartItems.push(products.products[1]);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));

    render(<App />);

    await waitFor(() => {
      const cartButton = screen.getByTestId('cart-button');

      fireEvent.click(cartButton.children[0]);

      const shoppingCart = screen.getByTestId('shopping-cart');

      const clearButton = within(shoppingCart).getByText(/clear cart/i);

      fireEvent.click(clearButton);

      expect(
        screen.queryByText(products.products[0].name)
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText(products.products[1].name)
      ).not.toBeInTheDocument();
    });
  });

  it('should be able to checkout', async () => {
    cartItems.push(products.products[0]);
    cartItems.push(products.products[1]);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));

    render(<App />);

    const cartButton = screen.getByTestId('cart-button');

    fireEvent.click(cartButton.children[0]);

    const shoppingCart = screen.getByTestId('shopping-cart');

    await waitFor(() => {
      const checkoutButton = within(shoppingCart).getByText(/checkout/i);

      fireEvent.click(checkoutButton);
    });

    await waitFor(() => {
      expect(shoppingCart).not.toBeInTheDocument();
    });
  });
});
