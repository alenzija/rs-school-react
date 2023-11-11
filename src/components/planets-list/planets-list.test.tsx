import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { PlanetsList } from '.';
import { AppContext } from '../../context';
import { SwapiService } from '../../services/swapi-service';
import { act } from 'react-dom/test-utils';
import { IPlanet } from '../../types';

jest.mock('../../services/swapi-service');

const getAllPlanetsMocked = SwapiService.getAllPlanets as jest.Mock;

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

    let container: HTMLElement;
    await act(async () => {
      const response = render(
        <MemoryRouter>
          <AppContext.Provider value={contextValue}>
            <PlanetsList />
          </AppContext.Provider>
        </MemoryRouter>
      );
      container = response.container;
    });
    await waitFor(() => {
      expect(container.querySelectorAll('.planets__card').length).toBe(10);
    });
    //screen.debug();
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
