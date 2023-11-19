import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { Page404 } from './index';
import { routes } from '../../routes';

describe('Page 404', () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify({}));
  });
  test('should have a link to home page', () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    );
    const notFoundLink = screen.getByRole('link', { name: 'Go home' });
    expect(notFoundLink).toBeTruthy();
  });

  test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/pageThatNotFound'],
    });
    await act(async () => {
      await render(
        <>
          <RouterProvider router={router} />
        </>
      );
    });

    await waitFor(() => {
      expect(screen.getByRole('page404')).toBeInTheDocument();
    });
  });
});
