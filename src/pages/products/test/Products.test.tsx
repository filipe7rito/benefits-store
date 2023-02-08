import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';
import { products } from '../../../../test/fixtures/products';
import { Product } from '../../../api/products';
import App from '../../../App';

const purchasedProducts = [] as Product['id'][];

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
        purchasedProducts: purchasedProducts,
      },
    }),
  };
});

describe('Products', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the Products', async () => {
    render(<App />);

    expect(screen.getAllByText(/products/i)[0]).toBeInTheDocument();

    await waitFor(() => {
      products.products.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  it('should add a product to the shopping cart', async () => {
    render(<App />);

    await waitFor(() => {
      const cartButton = screen.getByTestId('cart-button');
      expect(cartButton).toHaveTextContent('0');
    });

    await waitFor(() => {
      const product = products.products[0];
      const productCard = screen.getByText(product.name)
        .parentElement as HTMLElement;

      const addToCartButton = within(productCard).getByRole('button', {
        name: /add to cart/i,
      });

      fireEvent.click(addToCartButton);

      const cartButton = screen.getByTestId('cart-button');

      expect(cartButton).toHaveTextContent('1');
    });
  });

  it('should remove a product from the shopping cart', async () => {
    render(<App />);

    await waitFor(() => {
      const cartButton = screen.getByTestId('cart-button');
      expect(cartButton).toHaveTextContent('0');
    });

    await waitFor(() => {
      const product = products.products[0];
      const productCard = screen.getByText(product.name)
        .parentElement as HTMLElement;

      const addToCartButton = within(productCard).getByRole('button', {
        name: /add to cart/i,
      });

      fireEvent.click(addToCartButton);

      const cartButton = screen.getByTestId('cart-button');

      expect(cartButton).toHaveTextContent('1');
    });

    await waitFor(() => {
      const product = products.products[0];
      const productCard = screen.getByText(product.name)
        .parentElement as HTMLElement;

      const removeFromCartButton = within(productCard).getByRole('button', {
        name: /remove from cart/i,
      });

      fireEvent.click(removeFromCartButton);

      const cartButton = screen.getByTestId('cart-button');

      expect(cartButton).toHaveTextContent('0');
    });
  });

  it('should not be able to add product to cart if was already purchased', async () => {
    render(<App />);

    purchasedProducts.push(products.products[0].id);

    await waitFor(() => {
      const cartButton = screen.getByTestId('cart-button');
      expect(cartButton).toHaveTextContent('0');
    });

    await waitFor(() => {
      const product = products.products[0];
      const productCard = screen.getByText(product.name)
        .parentElement as HTMLElement;

      const addToCartButton = within(productCard).getByRole('button', {
        name: /add to cart/i,
      });

      expect(addToCartButton).toBeDisabled();
    });

    await waitFor(() => {
      const product = products.products[1];
      const productCard = screen.getByText(product.name)
        .parentElement as HTMLElement;

      const addToCartButton = within(productCard).getByRole('button', {
        name: /add to cart/i,
      });

      expect(addToCartButton).not.toBeDisabled();
    });
  });
});
