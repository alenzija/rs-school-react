import { transformPlanetData } from '../helper/transform-planet-data';
import { IPlanet } from '../types';

export class SwapiService {
  private static baseURL = 'https://swapi.dev/api';

  public static async getPlanets(
    page: number,
    name: string = ''
  ): Promise<{ planets: IPlanet[]; nextPage: boolean }> {
    const res =
      name === ''
        ? await fetch(`${this.baseURL}/planets/?page=${page}`)
        : await fetch(`${this.baseURL}/planets/?search=${name}&page=${page}`);
    if (!res.ok) {
      throw Error('Something went wrong!');
    }
    const data = await res.json();
    return {
      planets: data.results.map((item: Record<string, string>) =>
        transformPlanetData(item)
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
    if (data.results.length === 0) {
      throw Error("Name isn't exist");
    }
    return transformPlanetData(data.results[0]);
  }
}
