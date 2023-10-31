import { ReactNode, useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PlanetsList from '../planets-list';
import SearchForm from '../search-form';

type LayoutProps = {
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
};

const Layout = (props: LayoutProps): ReactNode => {
  const { loading, onChangeLoading } = props;
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
        <SearchForm loading={loading} onChangeLoading={onChangeLoading} />
        <PlanetsList loading={loading} onChangeLoading={onChangeLoading} />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
