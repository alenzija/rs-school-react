import { Component } from 'react';
import PlanetsList from '../planets-list';
import SearchForm from '../search-form';

import './app.scss';
import ThrowErrorButton from '../throw-error-button';

class App extends Component {
  state = {
    searchPhrase: localStorage.getItem('searchPhrase') || '',
    loading: true,
  };

  changeSearchPhrase = (newPhrase: string): void => {
    this.setState({
      searchPhrase: newPhrase,
    });
    localStorage.setItem('searchPhrase', newPhrase);
  };

  changeLoading = (value: boolean): void => {
    this.setState({
      loading: value,
    });
  };

  render() {
    const { searchPhrase, loading } = this.state;
    return (
      <div className="container">
        <SearchForm
          searchPhrase={searchPhrase}
          loading={loading}
          onChangeSearchPhrase={this.changeSearchPhrase}
          onChangeLoading={this.changeLoading}
        />
        <ThrowErrorButton />
        <PlanetsList
          loading={loading}
          searchPhrase={searchPhrase}
          onChangeLoading={this.changeLoading}
        />
      </div>
    );
  }
}

export default App;
