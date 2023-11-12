import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { PlanetsList, planetListLoader } from '.';
import { AppContext } from '../../context';
import { SwapiService } from '../../services/swapi-service';
import { IPlanet } from '../../types';

jest.mock('../../services/swapi-service');

const getAllPlanetsMocked = SwapiService.getAllPlanets as jest.Mock;
const searchPlanetByNameMocked = SwapiService.searchPlanetByName as jest.Mock;

describe('Planets List', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should renders the specified number of cards:', async () => {
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
        nextPage: false,
      },
    };

    getAllPlanetsMocked.mockImplementation(
      (): Promise<{
        planets: IPlanet[];
        nextPage: boolean;
      }> => Promise.resolve(contextValue.planetsData)
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <AppContext.Provider value={contextValue}>
            <PlanetsList />
          </AppContext.Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const planetList = screen.getByRole('planets-list');
      const cards = screen.getAllByRole('card');
      expect(planetList).toBeInTheDocument();
      expect(cards.length).toBe(10);
    });
  });

  test('should display an appropriate message if no cards are present:', async () => {
    const contextValue = {
      searchPhrase: '',
      changeSearchPhrase: jest.fn(),
      changePlanetsData: jest.fn(),
      planetsData: {
        planets: [],
        nextPage: false,
      },
    };

    getAllPlanetsMocked.mockImplementation(
      (): Promise<{
        planets: IPlanet[];
        nextPage: boolean;
      }> => Promise.resolve(contextValue.planetsData)
    );
    await act(async () => {
      render(
        <MemoryRouter>
          <AppContext.Provider value={contextValue}>
            <PlanetsList />
          </AppContext.Provider>
        </MemoryRouter>
      );
    });
    await waitFor(() => {
      const element = screen.getByText(/no planets/i);
      const cards = screen.queryByText(/name/i);
      expect(element).toBeInTheDocument();
      expect(cards).toBeNull();
    });
  });
});

test('should planetListLoader works when no search params', async () => {
  getAllPlanetsMocked.mockImplementation(
    (): Promise<{
      planets: IPlanet[];
      nextPage: boolean;
    }> => Promise.resolve({ planets: [], nextPage: false })
  );

  expect(
    planetListLoader({ request: new Request('http://exemple.com') })
  ).toBeTruthy();
});

test('should planetListLoader works when there are search params', async () => {
  searchPlanetByNameMocked.mockImplementation(
    (): Promise<{
      planets: IPlanet[];
      nextPage: boolean;
    }> => Promise.resolve({ planets: [], nextPage: false })
  );

  expect(
    planetListLoader({
      request: new Request('http://exemple.com/?search=name&page=1'),
    })
  ).toBeTruthy();
});
