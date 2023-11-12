import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';

import { Page404 } from './index';
import { act } from 'react-dom/test-utils';
import { routes } from '../../routes';

import { SwapiService } from '../../services/swapi-service';

jest.mock('../../services/swapi-service');

const getAllPlanetsMocked = SwapiService.getAllPlanets as jest.Mock;

describe('Page 404', () => {
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
    getAllPlanetsMocked.mockImplementation(
      (): Promise<{
        planets: [];
        nextPage: boolean;
      }> => Promise.resolve({ planets: [], nextPage: false })
    );
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
