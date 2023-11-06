import { ReactNode, Suspense } from 'react';
import {
  Await,
  Outlet,
  useLoaderData,
  useNavigation,
  useRouteError,
} from 'react-router-dom';

import SearchForm from '../search-form';
import Pagination from '../pagination';
import PlanetsList from '../planets-list';
import Spinner from '../spinner';
import ErrorMessage from '../error-message';

import ResponseType from '../../types/response-type';

const Layout = (): ReactNode => {
  const data = useLoaderData() as { res: ResponseType };
  const { state } = useNavigation();
  const error = useRouteError();
  console.log(error);

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

export default Layout;
