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

  test('should transfromPlanetsDataToPlanet works', () => {
    expect(SwapiService.transfromPlanetsDataToPlanet(planetData)).toEqual(
      expected
    );

    expect(
      SwapiService.transfromPlanetsDataToPlanet({
        ...planetData,
        name: 'unknown',
      })
    ).toEqual({ ...expected, name: 'no name' });

    expect(
      SwapiService.transfromPlanetsDataToPlanet({
        ...planetData,
        name: 'unknown',
      })
    ).toEqual({ ...expected, name: 'no name' });

    expect(
      SwapiService.transfromPlanetsDataToPlanet({
        ...planetData,
        population: 'unknown',
      })
    ).toEqual({ ...expected, population: 'no population' });

    expect(
      SwapiService.transfromPlanetsDataToPlanet({
        ...planetData,
        climate: 'unknown',
      })
    ).toEqual({ ...expected, climate: 'no climate' });

    expect(
      SwapiService.transfromPlanetsDataToPlanet({
        ...planetData,
        terrain: 'unknown',
      })
    ).toEqual({ ...expected, terrain: 'no terrain' });

    expect(
      SwapiService.transfromPlanetsDataToPlanet({
        ...planetData,
        diameter: 'unknown',
      })
    ).toEqual({ ...expected, diameter: 'no diameter' });

    expect(
      SwapiService.transfromPlanetsDataToPlanet({
        ...planetData,
        orbital_period: 'unknown',
      })
    ).toEqual({ ...expected, orbitalPeriod: 'no orbital period' });
  });

  test('getAllPlanets', async () => {
    (fetch as FetchMock).mockResponseOnce(
      JSON.stringify({
        results: [planetData],
        next: true,
      })
    );
    expect(await SwapiService.getAllPlanets(1)).toEqual({
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
    expect(await SwapiService.searchPlanetByName('name', 1)).toEqual({
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
