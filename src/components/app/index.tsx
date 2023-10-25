import StapiService from '../../services/swapi-service';

import './app.scss';

function App() {
  StapiService.getAllPlanets().then(console.log);
  return <></>;
}

export default App;
