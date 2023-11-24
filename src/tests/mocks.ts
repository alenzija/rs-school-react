import { IPlanet } from '../types';

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

export const dataWithoutPlanets: { planets: IPlanet[]; nextPage: boolean } = {
  nextPage: false,
  planets: [],
};

export const testPlanet = {
  name: 'testName',
  climate: 'testClimate',
  terrain: 'testTerrain',
  population: 'testPopulation',
  diameter: 'testDiameter',
  orbitalPeriod: 'testOrbitalPeriod',
};
