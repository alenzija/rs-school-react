import { useContext, useEffect, useMemo, useState } from 'react';
import { defer, useLocation, useNavigate, useParams } from 'react-router-dom';

import { IPlanet, NavigationState } from '../../types';
import { DeferredData } from '@remix-run/router/dist/utils';

import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { Planet } from '../planet';

import { AppContext } from '../../context';

import { SwapiService } from '../../services/swapi-service';

import './planets-list.scss';

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

export const PlanetsList = () => {
  const [error, setError] = useState(false);
  const [state, setState] = useState<NavigationState>('loading');
  const location = useLocation();
  const { searchPhrase, planetsData, changePlanetsData } =
    useContext(AppContext);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    setError(false);
    setState('loading');
    const page = queryParams.has('page') ? +queryParams.get('page')! : 1;
    if (searchPhrase === '') {
      SwapiService.getAllPlanets(page)
        .then((res) => changePlanetsData(res))
        .catch(() => setError(true))
        .finally(() => setState('idle'));
    } else {
      SwapiService.searchPlanetByName(searchPhrase, page)
        .then((res) => changePlanetsData(res))
        .catch(() => setError(true))
        .finally(() => setState('idle'));
    }
  }, [queryParams, searchPhrase]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = state === 'loading' ? <Spinner /> : null;
  const content =
    state === 'idle' && !error ? <View planets={planetsData.planets} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View: React.FC<{ planets: IPlanet[] }> = ({ planets }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  if (planets.length === 0) {
    return <div>No planets</div>;
  }

  return (
    <div className="planets">
      {planets.map((planet) => (
        <div
          key={planet.name}
          className={
            planet.name === params.name
              ? 'planets__card active'
              : 'planets__card'
          }
          onClick={() => {
            navigate(`/planets/${planet.name}/?${queryParams.toString()}`);
          }}
        >
          <Planet
            planet={planet}
            useFields={['name', 'climate', 'terrain']}
            // name={planet.name}
            // climate={planet.climate}
            // terrain={planet.terrain}
          />
        </div>
      ))}
    </div>
  );
};
