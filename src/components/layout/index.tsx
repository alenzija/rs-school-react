import { ReactNode, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import PlanetsList from '../planets-list';
import SearchForm from '../search-form';
import Pagination from '../pagination';

type LayoutProps = {
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
};

const Layout = (props: LayoutProps): ReactNode => {
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const changeHasNextPage = useCallback((value: boolean): void => {
    setHasNextPage(value);
  }, []);

  const changePage = useCallback((value: number): void => {
    setPage(value);
  }, []);

  const { loading, onChangeLoading } = props;

  return (
    <>
      <div className="container">
        <SearchForm
          loading={loading}
          onChangeLoading={onChangeLoading}
          onChangePage={changePage}
        />
        <PlanetsList
          loading={loading}
          onChangeLoading={onChangeLoading}
          onChangeHasNextPage={changeHasNextPage}
        />
        <Pagination
          loading={loading}
          onChangeLoading={onChangeLoading}
          hasNextPage={hasNextPage}
          page={page}
          onChangePage={changePage}
        />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
