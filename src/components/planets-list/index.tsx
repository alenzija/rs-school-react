import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { defer, useLocation, useParams } from 'react-router-dom';

import { IPlanet } from '../../types/planet';
import { DeferredData } from '@remix-run/router/dist/utils';

import Spinner from '../spinner';
import PlanetsItem from '../planets-item';

import SwapiService from '../../services/swapi-service';

import './planets-list.scss';
import SearchContext from '../../context';
import ErrorMessage from '../error-message';
import NavigationState from '../../types/navigation-state';

export const planetListLoader = async ({
  request,
}: {
  request: Request;
}): Promise<DeferredData> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const page = url.searchParams.has('page')
    ? +url.searchParams.get('page')!
    : 1;
  const res =
    search === ''
      ? SwapiService.getAllPlanets(page)
      : SwapiService.searchPlanetByName(search, page);
  return defer({ res });
};

const PlanetsList = () // { planets }: { planets: IPlanet[] }
: ReactNode => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [error, setError] = useState(false);
  const [state, setState] = useState<NavigationState>('loading');
  const location = useLocation();
  const searchContext = useContext(SearchContext);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    setError(false);
    setState('loading');
    const page = queryParams.has('page') ? +queryParams.get('page')! : 1;
    if (searchContext.searchPhrase === '') {
      SwapiService.getAllPlanets(page)
        .then((res) => setPlanets(res.planets))
        .catch(() => setError(true))
        .finally(() => setState('idle'));
    } else {
      SwapiService.searchPlanetByName(searchContext.searchPhrase, page)
        .then((res) => setPlanets(res.planets))
        .catch(() => setError(true))
        .finally(() => setState('idle'));
    }
  }, [queryParams, searchContext]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = state === 'loading' ? <Spinner /> : null;
  const content =
    state === 'idle' && !error ? <View planets={planets} /> : null;

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
