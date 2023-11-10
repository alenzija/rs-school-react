import { createContext } from 'react';

import { ResponseType } from './types/response-type';
import { IPlanet } from './types/planet';

interface IAppContext {
  searchPhrase: string;
  planetsData: ResponseType;
  changeSearchPhrase: (value: string) => void;
  changePlanetsData: (value: ResponseType) => void;
}

export const AppContext = createContext<IAppContext>({
  searchPhrase: '',
  planetsData: {
    planets: [] as IPlanet[],
    nextPage: false,
  },
  changeSearchPhrase: () => {},
  changePlanetsData: () => {},
});
