import { ReactNode, Suspense } from 'react';
import { Await, Outlet, useLoaderData, useNavigation } from 'react-router-dom';

import SearchForm from '../search-form';
import Pagination from '../pagination';
import PlanetsList from '../planets-list';
import Spinner from '../spinner';

import ResponseType from '../../types/response-type';

const Layout = (): ReactNode => {
  const { res } = useLoaderData() as { res: ResponseType };
  const { state } = useNavigation();
  // const [page, setPage] = useState(1);

  // const changePage = useCallback((value: number): void => {
  //   setPage(value);
  // }, []);

  // const changeHasNextPage = useCallback((value: boolean): void => {
  //   setHasNextPage(value);
  // }, []);

  return (
    <>
      <div className="container">
        <SearchForm
          loading={state === 'loading'}
          // onChangeLoading={onChangeLoading}
          // onChangePage={changePage}
        />
        <Suspense fallback={<Spinner />}>
          <Await resolve={res}>
            {(response) => (
              <>
                <PlanetsList
                  planets={response.planets}
                  loading={state === 'loading'}
                  // onChangeLoading={onChangeLoading}
                  // onChangeHasNextPage={changeHasNextPage}
                />
                <Pagination
                  loading={state === 'loading'}
                  // onChangeLoading={onChangeLoading}
                  hasNextPage={response.nextPage}
                  // page={page}
                  // onChangePage={changePage}
                />
              </>
            )}
          </Await>
        </Suspense>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
