import { Component } from 'react';

import Planet from '../../types/planet';
import PlanetsItem from '../planets-item';
import Spinner from '../spinner';

import SwapiService from '../../services/swapi-service';

import './planets-list.scss';
import ErrorMessage from '../error-message';

type PlanetsListState = Readonly<{
  planets: Planet[];
  error: boolean;
}>;

type PlanetsListProps = Readonly<{
  onChangeLoading: (value: boolean) => void;
  loading: boolean;
  searchPhrase: string;
}>;

class PlanetsList extends Component<PlanetsListProps, PlanetsListState> {
  constructor(props: PlanetsListProps) {
    super(props);
    this.state = {
      planets: [],
      error: false,
    };
  }

  updatePlanets(): void {
    const { onChangeLoading, searchPhrase } = this.props;
    if (searchPhrase === '') {
      SwapiService.getAllPlanets()
        .then((data) => {
          this.setState({ planets: data });
        })
        .catch(() => this.setState({ error: true }))
        .finally(() => onChangeLoading(false));
    } else {
      SwapiService.searchPlanetByName(searchPhrase)
        .then((data) => {
          this.setState({ planets: data });
        })
        .catch(() => this.setState({ error: true }))
        .finally(() => onChangeLoading(false));
    }
  }

  componentDidMount(): void {
    this.updatePlanets();
  }

  componentDidUpdate(prevProps: PlanetsListProps): void {
    if (prevProps.searchPhrase !== this.props.searchPhrase) {
      this.updatePlanets();
    }
  }

  render() {
    const { planets, error } = this.state;
    const { loading } = this.props;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(error || loading) ? <View planets={planets} /> : null;

    return (
      <div className="planets">
        {errorMessage}
        {spinner}
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
    if (planets.length === 0) {
      return <div>No planets</div>;
    }
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
