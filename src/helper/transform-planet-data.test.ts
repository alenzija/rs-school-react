import { transformPlanetData } from './transform-planet-data';

describe('transformPlanetData', () => {
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

  test('should work', () => {
    expect(transformPlanetData(planetData)).toEqual(expected);

    expect(
      transformPlanetData({
        ...planetData,
        name: 'unknown',
      })
    ).toEqual({ ...expected, name: 'no name' });

    expect(
      transformPlanetData({
        ...planetData,
        name: 'unknown',
      })
    ).toEqual({ ...expected, name: 'no name' });

    expect(
      transformPlanetData({
        ...planetData,
        population: 'unknown',
      })
    ).toEqual({ ...expected, population: 'no population' });

    expect(
      transformPlanetData({
        ...planetData,
        climate: 'unknown',
      })
    ).toEqual({ ...expected, climate: 'no climate' });

    expect(
      transformPlanetData({
        ...planetData,
        terrain: 'unknown',
      })
    ).toEqual({ ...expected, terrain: 'no terrain' });

    expect(
      transformPlanetData({
        ...planetData,
        diameter: 'unknown',
      })
    ).toEqual({ ...expected, diameter: 'no diameter' });

    expect(
      transformPlanetData({
        ...planetData,
        orbital_period: 'unknown',
      })
    ).toEqual({ ...expected, orbitalPeriod: 'no orbital period' });
  });
});
