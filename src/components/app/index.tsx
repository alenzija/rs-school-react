import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SearchForm } from '../search-form';
import { Pagination } from '../pagination';
import { PlanetsList } from '../planets-list';

import { store } from '../../store';

import './app.scss';

export const App = () => {
  return (
    <>
      <div className="container">
        <Provider store={store}>
          <SearchForm />
          <PlanetsList />
          <Pagination />
        </Provider>
      </div>
      <Outlet />
    </>
  );
};
