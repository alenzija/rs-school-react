import { createContext } from 'react';

import { IPlanetsData } from './types/planets-data';
import { IPlanet } from './types/planet';

interface IAppContext {
  // searchPhrase: string;
  planetsData: IPlanetsData;
  // changeSearchPhrase: (value: string) => void;
  changePlanetsData: (value: IPlanetsData) => void;
}

export const AppContext = createContext<IAppContext>({
  // searchPhrase: '',
  planetsData: {
    planets: [] as IPlanet[],
    nextPage: false,
  },
  // changeSearchPhrase: () => {},
  changePlanetsData: () => {},
});
