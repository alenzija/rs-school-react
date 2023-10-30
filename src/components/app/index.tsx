import { ReactNode, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import './app.scss';
import Layout from '../layout';

const App = (): ReactNode => {
  const [searchPhrase, setSearchPhrase] = useState(
    localStorage.getItem('searchPhrase') || ''
  );
  const [loading, setLoading] = useState(true);

  const changeSearchPhrase = (newPhrase: string): void => {
    setSearchPhrase(newPhrase);
    localStorage.setItem('searchPhrase', newPhrase);
  };

  const changeLoading = (value: boolean): void => {
    setLoading(value);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            searchPhrase={searchPhrase}
            loading={loading}
            onChangeSearchPhrase={changeSearchPhrase}
            onChangeLoading={changeLoading}
          />
        }
      ></Route>
    </Routes>
  );
};

export default App;
