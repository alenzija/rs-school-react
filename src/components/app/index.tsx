import PlanetsList from '../planets-list';
import SearchForm from '../search-form';

import './app.scss';

function App() {
  return (
    <div className="container">
      <SearchForm />
      <PlanetsList />
    </div>
  );
}

export default App;
