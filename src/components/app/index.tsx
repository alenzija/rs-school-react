import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { SearchForm } from '../search-form';
import { Pagination } from '../pagination';
import { PlanetsList } from '../planets-list';
// import Spinner from '../spinner';
// import ErrorMessage from '../error-message';

import { ResponseType } from '../../types';

import { AppContext } from '../../context';

import './app.scss';

export const App = () => {
  // const data = useLoaderData() as { res: ResponseType };
  const [searchPhrase, setSearchPhrase] = useState(
    localStorage.getItem('searchPhrase') || ''
  );
  const [planetsData, setPlanetsData] = useState<ResponseType>({
    planets: [],
    nextPage: false,
  });

  const changeSearchPhrase = useCallback((value: string): void => {
    setSearchPhrase(value);
  }, []);

  const changePlanetsData = useCallback((value: ResponseType): void => {
    setPlanetsData(value);
  }, []);

  return (
    <>
      <div className="container">
        <AppContext.Provider
          value={{
            searchPhrase,
            changeSearchPhrase,
            planetsData,
            changePlanetsData,
          }}
        >
          <SearchForm />
          {/* <Suspense fallback={<Spinner />}>
            <Await resolve={data.res}>
              {(response) => {
                return !response ? (
                  <ErrorMessage />
                ) : (
                  <> */}
          <PlanetsList />
          <Pagination />
          {/* </>
                );
              }}
            </Await>
          </Suspense> */}
        </AppContext.Provider>
      </div>
      <Outlet />
    </>
  );
};
