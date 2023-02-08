import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, vi } from 'vitest';

import App from '../../../App';

describe('Login', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to login', async () => {
    const user = userEvent.setup();
    render(<App />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'Amazing' },
    });

    user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/products/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/my orders/i)).toBeInTheDocument();
    });
  });

  it('should be able to logout', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'Amazing' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/products/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/products/i)[1]).toBeInTheDocument();
      expect(screen.getByText(/my orders/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/username/i)[0]).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /continue/i })
      ).toBeInTheDocument();
    });
  });
});
