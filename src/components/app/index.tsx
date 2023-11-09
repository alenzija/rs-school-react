import { memo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import SearchForm from '../search-form';
import Pagination from '../pagination';
import PlanetsList from '../planets-list';
// import Spinner from '../spinner';
// import ErrorMessage from '../error-message';

// import ResponseType from '../../types/response-type';

import SearchContext from '../../context';

import './app.scss';

const App = () => {
  // const data = useLoaderData() as { res: ResponseType };
  const [searchPhrase, setSearchPhrase] = useState(
    localStorage.getItem('searchPhrase') || ''
  );

  return (
    <>
      <div className="container">
        <SearchContext.Provider value={{ searchPhrase, setSearchPhrase }}>
          <SearchForm />
          {/* <Suspense fallback={<Spinner />}>
            <Await resolve={data.res}>
              {(response) => {
                return !response ? (
                  <ErrorMessage />
                ) : (
                  <> */}
          <PlanetsList />
          <Pagination hasNextPage={true} />
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
