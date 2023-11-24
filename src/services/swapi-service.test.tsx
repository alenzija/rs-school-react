import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import { FetchMock } from 'jest-fetch-mock';

import { SwapiService } from './swapi-service';

describe('Swapi Service', () => {
  const planetData = {
    name: 'planet data',
    population: 'population data',
    climate: 'climate data',
    terrain: 'terrain data',
    diameter: 'diameter data',
    orbital_period: 'orbitalPeriod data',
  };

  const expected = {
    name: 'planet data',
    population: 'population data',
    climate: 'climate data',
    terrain: 'terrain data',
    diameter: 'diameter data',
    orbitalPeriod: 'orbitalPeriod data',
  };

  test('getAllPlanets', async () => {
    (fetch as FetchMock).mockResponseOnce(
      JSON.stringify({
        results: [planetData],
        next: true,
      })
    );
    expect(await SwapiService.getPlanets(1)).toEqual({
      planets: [expected],
      nextPage: true,
    });
  });

  test('should searchPlanetByName works', async () => {
    (fetch as FetchMock).mockResponseOnce(
      JSON.stringify({
        results: [planetData],
        next: true,
      })
    );
    expect(await SwapiService.getPlanets(1, 'name')).toEqual({
      planets: [expected],
      nextPage: true,
    });
  });

  test('should getPlanetByName works', async () => {
    (fetch as FetchMock).mockResponseOnce(
      JSON.stringify({
        results: [planetData],
      })
    );
    expect(await SwapiService.getPlanetByName('name')).toEqual(expected);
  });
});
