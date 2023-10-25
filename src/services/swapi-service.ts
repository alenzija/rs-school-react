export default class SwapiService {
  public static async getAllPlanets(page: number = 1) {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    if (!res.ok) {
      throw Error('Something went wrong!');
    }
    const data = await res.json();
    return data.results;
  }
}
