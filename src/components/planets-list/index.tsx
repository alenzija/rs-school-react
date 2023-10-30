import { ReactNode, useCallback, useEffect, useState } from 'react';

import Planet from '../../types/planet';
import PlanetsItem from '../planets-item';
import Spinner from '../spinner';

import SwapiService from '../../services/swapi-service';

import './planets-list.scss';
import ErrorMessage from '../error-message';

type PlanetsListProps = Readonly<{
  onChangeLoading: (value: boolean) => void;
  loading: boolean;
  searchPhrase: string;
  page: number;
}>;

const PlanetsList = (props: PlanetsListProps): ReactNode => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [error, setError] = useState(false);

  const { onChangeLoading, searchPhrase, loading, page } = props;

  const updatePlanets = useCallback((): void => {
    if (searchPhrase === '') {
      SwapiService.getAllPlanets(page)
        .then((data) => {
          setPlanets(data);
        })
        .catch(() => setError(true))
        .finally(() => onChangeLoading(false));
    } else {
      SwapiService.searchPlanetByName(searchPhrase, page)
        .then((data) => {
          setPlanets(data);
        })
        .catch(() => setError(true))
        .finally(() => onChangeLoading(false));
    }
  }, [onChangeLoading, searchPhrase, page]);

  useEffect(() => {
    updatePlanets();
  }, [updatePlanets]);

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
};

const View = (props: { planets: Planet[] }): ReactNode => {
  const { planets } = props;
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
};

export default PlanetsList;
