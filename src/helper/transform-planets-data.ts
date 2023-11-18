import { IPlanet } from '../types';

export const transfromPlanetData = (data: Record<string, string>): IPlanet => {
  return {
    name: data.name && data.name !== 'unknown' ? data.name : 'no name',
    population:
      data.population && data.population !== 'unknown'
        ? data.population
        : 'no population',
    climate:
      data.climate && data.climate !== 'unknown' ? data.climate : 'no climate',
    terrain:
      data.terrain && data.terrain !== 'unknown' ? data.terrain : 'no terrain',
    diameter:
      data.diameter && data.diameter !== 'unknown'
        ? data.diameter
        : 'no diameter',
    orbitalPeriod:
      data['orbital_period'] && data['orbital_period'] !== 'unknown'
        ? data['orbital_period']
        : 'no orbital period',
  };
};
