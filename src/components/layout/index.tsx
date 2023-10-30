import { ReactNode, useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PlanetsList from '../planets-list';
import SearchForm from '../search-form';

type LayoutProps = {
  searchPhrase: string;
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
  onChangeSearchPhrase: (value: string) => void;
};

const Layout = (props: LayoutProps): ReactNode => {
  const { searchPhrase, loading, onChangeLoading, onChangeSearchPhrase } =
    props;
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const page = queryParams.get('page') || 1;

  useEffect(() => {
    queryParams.set('page', page.toString());
    navigate({ search: queryParams.toString() });
  }, [navigate, queryParams, page]);

  return (
    <>
      <div className="container">
        <SearchForm
          searchPhrase={searchPhrase}
          loading={loading}
          onChangeSearchPhrase={onChangeSearchPhrase}
          onChangeLoading={onChangeLoading}
        />
        <PlanetsList
          loading={loading}
          searchPhrase={searchPhrase}
          onChangeLoading={onChangeLoading}
          page={+page}
        />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
