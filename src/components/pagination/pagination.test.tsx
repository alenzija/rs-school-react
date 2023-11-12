import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { SwapiService } from '../../services/swapi-service';
import { App } from '../app';
import { IPlanet } from '../../types';

jest.mock('../../services/swapi-service');

const locationMock = {
  value: {
    href: '/',
    search: '?page=1',
  },
  writable: true,
};

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useSearchParams: () => {
    return [
      new URLSearchParams(locationMock.value.search),
      (newParams: Record<string, string>) => {
        locationMock.value.search = locationMock.value.search.replace(
          /[0-9]+/,
          newParams.page
        );
      },
    ];
  },
}));

const getAllPlanetsMocked = SwapiService.getAllPlanets as jest.Mock;

describe('Pagination ', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', locationMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const contextValue = {
    searchPhrase: '',
    changeSearchPhrase: jest.fn(),
    changePlanetsData: jest.fn(),
    planetsData: {
      planets: Array.from({ length: 10 }, (item, i) => ({
        name: `testName${i}`,
        climate: 'testClimate',
        terrain: 'testTerrain',
        population: 'testPopulation',
        diameter: 'testDiameter',
        orbitalPeriod: 'testOrbitalPeriod',
      })),
      nextPage: true,
    },
  };

  getAllPlanetsMocked.mockImplementation(
    (): Promise<{
      planets: IPlanet[];
      nextPage: boolean;
    }> => Promise.resolve(contextValue.planetsData)
  );

  const routes = [
    {
      path: '/',
      element: <App />,
    },
  ];
  const router = createMemoryRouter(routes);

  test('should update URL query parameter when page changes', async () => {
    act(() => {
      render(<RouterProvider router={router} />);
    });

    let btnNext: HTMLButtonElement;
    await waitFor(() => {
      btnNext = screen.getByRole('to-next-page');
    });

    act(() => {
      fireEvent.click(btnNext);
    });

    await waitFor(() => {
      expect(window.location.search).toBe('?page=2');
    });
  });
});
