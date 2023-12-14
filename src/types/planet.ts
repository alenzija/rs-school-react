export interface IPlanet {
  name: string;
  climate: string;
  terrain: string;
}

export interface IPlanetDescription extends IPlanet {
  population: string;
  diameter: string;
  orbitalPeriod: string;
  films: string[];
}
