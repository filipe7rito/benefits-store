import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { products } from '../../../../test/fixtures/products';
import { Product } from '../../../api/products';
import App from '../../../App';

const purchasedProducts = [
  products.products[0].id,
  products.products[1].id,
  products.products[2].id,
] as Product['id'][];

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

describe('Orders', () => {
  it('should render the my orders', async () => {
    render(<App />);

    const myOrdersButton = await screen.findByText(/my orders/i);
    fireEvent.click(myOrdersButton);

    expect(screen.getAllByText(/my orders/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/my orders/i)[1]).toBeInTheDocument();

    await waitFor(() => {
      purchasedProducts.forEach((productId) => {
        const product = products.products.find((p) => p.id === productId);
        expect(screen.getByText(product!.name)).toBeInTheDocument();
      });
    });
  });
});
