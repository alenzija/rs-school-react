import { Suspense, memo } from 'react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';

import SearchForm from '../search-form';
import Pagination from '../pagination';
import PlanetsList from '../planets-list';
import Spinner from '../spinner';
import ErrorMessage from '../error-message';

import ResponseType from '../../types/response-type';

import './app.scss';

const App = () => {
  const data = useLoaderData() as { res: ResponseType };
  return (
    <>
      <div className="container">
        <h1>Planets</h1>
        <SearchForm />
        <Suspense fallback={<Spinner />}>
          <Await resolve={data.res}>
            {(response) => {
              return !response ? (
                <ErrorMessage />
              ) : (
                <>
                  <PlanetsList planets={response.planets} />
                  <Pagination hasNextPage={response.nextPage} />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <Outlet />
    </>
  );
};

export default memo(App);
