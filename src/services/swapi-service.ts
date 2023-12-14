import { IPlanet } from '../types';

export class SwapiService {
  private static baseURL = 'https://swapi.dev/api';

  public static transfromPlanetsDataToPlanet(
    data: Record<string, string>
  ): IPlanet {
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
      planets: data.results.map((item: Record<string, string>) =>
        this.transfromPlanetsDataToPlanet(item)
      ),
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
      planets: data.results.map((item: Record<string, string>) =>
        this.transfromPlanetsDataToPlanet(item)
      ),
      nextPage: !!data.next,
    };
  }

  public static async getPlanetByName(name: string): Promise<IPlanet> {
    const res = await fetch(`${this.baseURL}/planets/?search=${name}`);
    if (!res.ok) {
      throw Error('Something went wrong!');
    }
    const data = await res.json();
    return this.transfromPlanetsDataToPlanet(data.results[0]);
  }
}
