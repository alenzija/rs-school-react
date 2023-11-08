import { test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from './index';

test('Test 404 NotFound Page', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  const notFoundLink = screen.getByRole('link', { name: 'Go home' });

  expect(notFoundLink).toBeTruthy();
});
