import Planet from '../types/planet';

export default class SwapiService {
  private static baseURL = 'https://swapi.dev/api';
  private static transfromPlanetsData(
    data: Record<string, string>[]
  ): Planet[] {
    return data.map((result) => ({
      name: result.name || 'no name',
      population: result.population || 'no population',
      climate: result.climate || 'no climate',
      terrain: result.terrain || 'no terrain',
    }));
  }

  public static async getAllPlanets(
    page: number
  ): Promise<{ planets: Planet[]; nextPage: boolean }> {
    const res = await fetch(`${this.baseURL}/planets/?page=${page}`);
    if (!res.ok) {
      throw Error('Something went wrong!');
    }
    const data = await res.json();
    return {
      planets: this.transfromPlanetsData(data.results),
      nextPage: !!data.next,
    };
  }

  public static async searchPlanetByName(
    name: string,
    page: number
  ): Promise<{ planets: Planet[]; nextPage: boolean }> {
    const res = await fetch(
      `${this.baseURL}/planets/?search=${name}&page=${page}`
    );
    if (!res.ok) {
      throw Error('Something went wrong!');
    }
    const data = await res.json();
    return {
      planets: this.transfromPlanetsData(data.results),
      nextPage: !!data.next,
    };
  }
}
