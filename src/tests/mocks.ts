import { IPlanet, IPlanetsAPI } from '../types';

export const dataWithPlanets: {
  planets: IPlanet[];
  nextPage: boolean;
} = {
  nextPage: true,
  planets: Array.from({ length: 10 }, (item, i) => ({
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

export const testPlanet = {
  name: 'testName',
  climate: 'testClimate',
  terrain: 'testTerrain',
  population: 'testPopulation',
  diameter: 'testDiameter',
  orbitalPeriod: 'testOrbitalPeriod',
};
