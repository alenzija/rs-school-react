import { IPlanet, IPlanetDescription } from '../types/planet';

export default class SwapiService {
  private static baseURL = 'https://swapi.dev/api';
  private static transfromPlanetsDataToPlanets(
    data: Record<string, string>[]
  ): IPlanet[] {
    return data.map((result) => ({
      name: result.name && result.name !== 'unknown' ? result.name : 'no name',
      climate:
        result.climate && result.climate !== 'unknown'
          ? result.climate
          : 'no climate',
      terrain:
        result.terrain && result.terrain !== 'unknown'
          ? result.terrain
          : 'no terrain',
    }));
  }

  private static transfromPlanetsDataToPlanetDescription(
    data: Record<string, string>
  ): IPlanetDescription {
    return {
      name: data.name && data.name !== 'unknown' ? data.name : 'no name',
      population:
        data.population && data.population !== 'unknown'
          ? data.population
          : 'no population',
      climate:
        data.climate && data.climate !== 'unknown'
          ? data.climate
          : 'no climate',
      terrain:
        data.terrain && data.terrain !== 'unknown'
          ? data.terrain
          : 'no terrain',
      diameter:
        data.diameter && data.diameter !== 'unknown'
          ? data.diameter
          : 'no diameter',
      orbitalPeriod:
        data['orbital_period'] && data['orbital_period'] !== 'unknown'
          ? data['orbital_period']
          : 'no orbital period',
      films: data.films && typeof data.films !== 'string' ? data.films : [],
    };
  }

  public static async getAllPlanets(
    page: number
  ): Promise<{ planets: IPlanet[]; nextPage: boolean }> {
    const res = await fetch(`${this.baseURL}/planets/?page=${page}`);
    if (!res.ok) {
      throw Error('Something went wrong!');
    }
    const data = await res.json();
    return {
      planets: this.transfromPlanetsDataToPlanets(data.results),
      nextPage: !!data.next,
    };
  }

  public static async searchPlanetByName(
    name: string,
    page: number
  ): Promise<{ planets: IPlanet[]; nextPage: boolean }> {
    const res = await fetch(
      `${this.baseURL}/planets/?search=${name}&page=${page}`
    );
    if (!res.ok) {
      throw Error('Something went wrong!');
    }
    const data = await res.json();
    return {
      planets: this.transfromPlanetsDataToPlanets(data.results),
      nextPage: !!data.next,
    };
  }

  public static async getPlanetByName(
    name: string
  ): Promise<IPlanetDescription> {
    const res = await fetch(`${this.baseURL}/planets/?search=${name}`);
    if (!res.ok) {
      throw Error('Something went wrong!');
    }
    const data = await res.json();
    return this.transfromPlanetsDataToPlanetDescription(data.results[0]);
  }

  public static async getFilm(url: string): Promise<string | null> {
    const res = await fetch(url);
    const data = await res.json();
    return data.title;
  }
}
