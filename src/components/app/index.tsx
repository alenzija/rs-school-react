import { ReactNode, useState } from 'react';
import PlanetsList from '../planets-list';
import SearchForm from '../search-form';

import './app.scss';
import ThrowErrorButton from '../throw-error-button';

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
    <div className="container">
      <SearchForm
        searchPhrase={searchPhrase}
        loading={loading}
        onChangeSearchPhrase={changeSearchPhrase}
        onChangeLoading={changeLoading}
      />
      <ThrowErrorButton />
      <PlanetsList
        loading={loading}
        searchPhrase={searchPhrase}
        onChangeLoading={changeLoading}
      />
    </div>
  );
};

export default App;
