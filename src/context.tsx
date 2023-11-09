import { createContext } from 'react';
import ResponseType from './types/response-type';
import { IPlanet } from './types/planet';

const AppContext = createContext({
  searchPhrase: '',
  planetsData: {
    planets: [] as IPlanet[],
    nextPage: false,
  },
  changeSearchPhrase: (value: string): void => {
    console.log(value);
  },
  changePlanetsData: (value: ResponseType): void => {
    console.log(value);
  },
});

export default AppContext;
