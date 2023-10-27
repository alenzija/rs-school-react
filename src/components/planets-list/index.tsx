import { Component } from 'react';

import Planet from '../../types/planet';
import PlanetsItem from '../planets-item';
import Spinner from '../spinner';

import SwapiService from '../../services/swapi-service';
import ErrorMessage from '../error-message';

import './planets-list.scss';

type PlanetsListState = Readonly<{
  planets: Planet[];
  loading: boolean;
  error: boolean;
}>;

class PlanetsList extends Component<Readonly<object>, PlanetsListState> {
  state: PlanetsListState = {
    planets: [],
    loading: true,
    error: false,
  };

  componentDidMount(): void {
    SwapiService.getAllPlanets()
      .then((data) => {
        this.setState({ planets: data });
      })
      .catch(() => {
        this.setState({ error: true });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { planets, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(error || loading) ? <View planets={planets} /> : null;

    return (
      <div className="planets">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

class View extends Component<{ planets: Planet[] }> {
  constructor(readonly props: { planets: Planet[] }) {
    super(props);
  }

  render() {
    const { planets } = this.props;
    return (
      <>
        {planets.map((planet) => (
          <PlanetsItem
            key={planet.name}
            name={planet.name}
            population={planet.population}
            climate={planet.climate}
            terrain={planet.terrain}
          />
        ))}
      </>
    );
  }
}

export default PlanetsList;
