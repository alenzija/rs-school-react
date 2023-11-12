import '@testing-library/jest-dom';
import { test, jest, expect, describe } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { LeftSidePanel } from '.';
import { SwapiService } from '../../services/swapi-service';
import { IPlanet } from '../../types';

jest.mock('../../services/swapi-service');

const getPlanetByNameMocked = SwapiService.getPlanetByName as jest.Mock;

describe('Detailed card', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const testPlanet = {
    name: 'testName',
    climate: 'testClimate',
    terrain: 'testTerrain',
    population: 'testPopulation',
    diameter: 'testDiameter',
    orbitalPeriod: 'testOrbitalPeriod',
  };
  getPlanetByNameMocked.mockImplementation(
    (): Promise<IPlanet> => Promise.resolve(testPlanet)
  );

  const routesPending = [
    {
      path: '/',
      element: <LeftSidePanel />,
      loader: async () => ({
        res: new Promise(() => {}),
      }),
    },
  ];
  const routerPending = createMemoryRouter(routesPending);

  const routesFulfilled = [
    {
      path: '/',
      element: <LeftSidePanel />,
      loader: async () =>
        Promise.resolve({
          res: await getPlanetByNameMocked(),
        }),
    },
  ];
  const routerFullfilled = createMemoryRouter(routesFulfilled);

  test('display a loading indicator while fetching data', async () => {
    act(() => {
      render(<RouterProvider router={routerPending} />);
    });
    expect(screen.getByRole('spinner')).toBeInTheDocument();
  });

  test('should hide the component after clicking the close button ', async () => {
    act(() => {
      render(<RouterProvider router={routerFullfilled} />);
    });
    await waitFor(() => {
      const closeBtn = screen.getByRole('close-panel');
      expect(closeBtn).toBeInTheDocument();
      fireEvent.click(closeBtn);
    });
    const leftPanel = screen.queryByRole('detailed-panel');
    expect(leftPanel).toBeNull();
  });

  test('should correctly display the detailed card data', () => {
    act(() => {
      render(<RouterProvider router={routerFullfilled} />);
    });
    const name = screen.getByText(testPlanet.name);
    const climate = screen.getByText(testPlanet.climate);
    const terrain = screen.getByText(testPlanet.terrain);
    const population = screen.getByText(testPlanet.population);
    const diameter = screen.getByText(testPlanet.diameter);
    const orbitalPeriod = screen.getByText(testPlanet.orbitalPeriod);
    expect(name).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(orbitalPeriod).toBeInTheDocument();
  });
});
