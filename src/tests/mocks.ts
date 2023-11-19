import { IPlanetsAPI } from '../types';

export const dataWithPlanets: IPlanetsAPI = {
  count: 10,
  next: 'next',
  previous: null,
  results: Array.from({ length: 10 }, (item, i) => ({
    name: `testName${i}`,
    climate: 'testClimate',
    terrain: 'testTerrain',
    population: 'testPopulation',
    diameter: 'testDiameter',
    orbitalPeriod: 'testOrbitalPeriod',
  })),
};

export const dataWithoutPlanets: IPlanetsAPI = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};
