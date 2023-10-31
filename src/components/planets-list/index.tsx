import { ReactNode, useCallback, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Planet from '../../types/planet';
import PlanetsItem from '../planets-item';
import Spinner from '../spinner';

import SwapiService from '../../services/swapi-service';

import './planets-list.scss';
import ErrorMessage from '../error-message';

type PlanetsListProps = Readonly<{
  onChangeLoading: (value: boolean) => void;
  loading: boolean;
}>;

const PlanetsList = (props: PlanetsListProps): ReactNode => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [error, setError] = useState(false);

  const location = useLocation();

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const { onChangeLoading, loading } = props;

  const updatePlanets = useCallback((): void => {
    console.log('>>>UPDATE LIST');
    const searchPhrase = queryParams.get('search');
    const queryPage = queryParams.get('page');
    const page = queryPage ? +queryPage : 1;
    if (searchPhrase === null) {
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
  }, [queryParams, onChangeLoading]);

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
