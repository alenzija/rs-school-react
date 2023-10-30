import { ReactNode } from 'react';
import { Outlet, useParams } from 'react-router-dom';
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
  const { page } = useParams();
  console.log('layout', page);
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
          page={page ? +page : 1}
        />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
