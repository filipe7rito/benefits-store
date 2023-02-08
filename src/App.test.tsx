import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the App', () => {
    render(<App />);

    expect(screen.getAllByText(/username/i)[0]).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });
});
