import { ReactNode, useCallback, useEffect, useState, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { IPlanet } from '../../types/planet';
import PlanetsItem from '../planets-item';
import Spinner from '../spinner';
import ErrorMessage from '../error-message';

import SwapiService from '../../services/swapi-service';

import './planets-list.scss';

type PlanetsListProps = Readonly<{
  onChangeLoading: (value: boolean) => void;
  loading: boolean;
  onChangeHasNextPage: (value: boolean) => void;
}>;

const PlanetsList = (props: PlanetsListProps): ReactNode => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [error, setError] = useState(false);

  const location = useLocation();

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const { onChangeLoading, loading, onChangeHasNextPage } = props;

  const updatePlanets = useCallback((): void => {
    console.log('>>>UPDATE LIST');
    setError(false);
    const searchPhrase = queryParams.get('search');
    const queryPage = queryParams.get('page');
    const page = queryPage ? +queryPage : 1;
    if (searchPhrase === null) {
      SwapiService.getAllPlanets(page)
        .then((data) => {
          setPlanets(data.planets);
          onChangeHasNextPage(data.nextPage);
        })
        .catch(() => setError(true))
        .finally(() => onChangeLoading(false));
    } else {
      SwapiService.searchPlanetByName(searchPhrase, page)
        .then((data) => {
          setPlanets(data.planets);
          onChangeHasNextPage(data.nextPage);
        })
        .catch(() => setError(true))
        .finally(() => onChangeLoading(false));
    }
  }, [queryParams, onChangeLoading, onChangeHasNextPage]);

  useEffect(() => {
    updatePlanets();
  }, [updatePlanets]);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(error || loading) ? <View planets={planets} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = (props: { planets: IPlanet[] }): ReactNode => {
  const params = useParams();
  const { planets } = props;
  if (planets.length === 0) {
    return <div>No planets</div>;
  }
  const { name } = params;
  return (
    <div className="planets">
      {planets.map((planet) => (
        <PlanetsItem
          active={!!name && name === planet.name}
          key={planet.name}
          name={planet.name}
          climate={planet.climate}
          terrain={planet.terrain}
        />
      ))}
    </div>
  );
};

export default PlanetsList;
