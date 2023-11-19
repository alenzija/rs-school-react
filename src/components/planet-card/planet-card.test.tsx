import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';

import { LeftSidePanel } from '../left-side-panel';
import { App } from '../app';

import { IPlanet } from '../../types';

import { SwapiService } from '../../services/swapi-service';
import { PlanetCard } from '.';
import { transformPlanetData } from '../../helper/transform-planet-data';
import { dataWithPlanets } from '../../tests/mocks';

jest.mock('../../services/swapi-service');

const getPlanetByNameMocked = SwapiService.getPlanetByName as jest.Mock;

describe('Planet card', () => {
  beforeAll(() => {
    fetchMock.mockResponseOnce(JSON.stringify(dataWithPlanets));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  getPlanetByNameMocked.mockImplementation(
    (): Promise<IPlanet> =>
      Promise.resolve(transformPlanetData(dataWithPlanets.results[0]))
  );

  const routes = [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/planets/:name',
          include: ['/', '/planets'],
          element: <LeftSidePanel />,
          loader: async () =>
            Promise.resolve({ res: await getPlanetByNameMocked() }),
        },
      ],
    },
  ];
  const router = createMemoryRouter(routes);

  test('should open a detailed card component after clicking on the card', async () => {
    act(() => {
      render(<RouterProvider router={router} />);
    });
    await waitFor(async () => {
      const cards = screen.getAllByRole('card');
      const leftPanel = screen.queryByRole('detailed-component');
      expect(leftPanel).toBeNull();
      fireEvent.click(cards[0]);
    });
    const newLeftPanel = screen.getByRole('detailed-component');
    expect(newLeftPanel).toBeInTheDocument();
  });

  test('should trigger API call when clicked', async () => {
    act(() => {
      render(<RouterProvider router={router} />);
    });
    await waitFor(() => {
      const cards = screen.getAllByRole('card');
      fireEvent.click(cards[0]);
    });
    expect(getPlanetByNameMocked).toBeCalled();
  });

  test('should render the relevant card data', () => {
    const index = Math.floor(Math.random() * 10);
    render(
      <MemoryRouter>
        <PlanetCard
          planet={transformPlanetData(dataWithPlanets.results[index])}
          active={false}
        />
      </MemoryRouter>
    );
    const namePlanet = screen.getByText(`testName${index}`);
    expect(namePlanet).toBeInTheDocument();
  });
});
