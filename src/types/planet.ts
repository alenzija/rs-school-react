export interface IPlanet {
  name: string;
  population: string;
  climate: string;
  terrain: string;
}

export interface IPlanetDescription extends IPlanet {
  diameter: string;
  orbitalPeriod: string;
  films: string[];
}
