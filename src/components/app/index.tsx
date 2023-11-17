import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SearchForm } from '../search-form';
import { Pagination } from '../pagination';
import { PlanetsList } from '../planets-list';

import { ResponseType } from '../../types';

import { AppContext } from '../../context';

import { store } from '../../store';

import './app.scss';

export const App = () => {
  // const [searchPhrase, setSearchPhrase] = useState(
  //   localStorage.getItem('searchPhrase') || ''
  // );
  const [planetsData, setPlanetsData] = useState<ResponseType>({
    planets: [],
    nextPage: false,
  });

  // const changeSearchPhrase = useCallback((value: string): void => {
  //   setSearchPhrase(value);
  // }, []);

  const changePlanetsData = useCallback((value: ResponseType): void => {
    setPlanetsData(value);
  }, []);

  return (
    <>
      <div className="container">
        <Provider store={store}>
          <AppContext.Provider
            value={{
              // searchPhrase,
              // changeSearchPhrase,
              planetsData,
              changePlanetsData,
            }}
          >
            <SearchForm />
            <PlanetsList />
            <Pagination />
          </AppContext.Provider>
        </Provider>
      </div>
      <Outlet />
    </>
  );
};
