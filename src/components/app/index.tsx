import { ReactNode, Suspense, memo } from 'react';
import { Await, Outlet, useLoaderData, useNavigation } from 'react-router-dom';

import SearchForm from '../search-form';
import Pagination from '../pagination';
import PlanetsList from '../planets-list';
import Spinner from '../spinner';
import ErrorMessage from '../error-message';

import ResponseType from '../../types/response-type';

import './app.scss';

const App = (): ReactNode => {
  const data = useLoaderData() as { res: ResponseType };
  const { state } = useNavigation();

  return (
    <>
      <div className="container">
        <SearchForm loading={state === 'loading'} />
        <Suspense fallback={<Spinner />}>
          <Await resolve={data?.res}>
            {(response) =>
              !response ? (
                <ErrorMessage />
              ) : (
                <>
                  <PlanetsList
                    planets={response.planets}
                    loading={state === 'loading'}
                  />
                  <Pagination
                    loading={state === 'loading'}
                    hasNextPage={response.nextPage}
                  />
                </>
              )
            }
          </Await>
        </Suspense>
      </div>
      <Outlet />
    </>
  );
};

export default memo(App);
