import { useContext, useEffect, useMemo, useState } from 'react';
import { defer, useLocation, useParams } from 'react-router-dom';

import { IPlanet, NavigationState } from '../../types';
import { DeferredData } from '@remix-run/router/dist/utils';

import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';

import { AppContext } from '../../context';

import { SwapiService } from '../../services/swapi-service';

import './planets-list.scss';
import { PlanetCard } from '../planet-card';

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
  }, [queryParams, searchPhrase, changePlanetsData]);

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

  if (planets.length === 0) {
    return <>No planets</>;
  }

  return (
    <div className="planets" role="planets-list">
      {planets.map((planet, index) => (
        <PlanetCard
          planet={planet}
          active={planet.name === params.name}
          key={index}
        />
      ))}
    </div>
  );
};
