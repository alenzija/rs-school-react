import { memo, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import SearchForm from '../search-form';
import Pagination from '../pagination';
import PlanetsList from '../planets-list';
// import Spinner from '../spinner';
// import ErrorMessage from '../error-message';

import ResponseType from '../../types/response-type';

import SearchContext from '../../context';

import './app.scss';

const App = () => {
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
        <SearchContext.Provider
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
        </SearchContext.Provider>
      </div>
      <Outlet />
    </>
  );
};

export default memo(App);
