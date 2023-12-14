import { useContext, useEffect, useMemo, useState } from 'react';
import { defer, useLocation, useParams } from 'react-router-dom';

import { IPlanet, NavigationState } from '../../types';
import { DeferredData } from '@remix-run/router/dist/utils';

import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { PlanetCard } from '../planet-card';

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
  const [navigationState, setNavigationState] =
    useState<NavigationState>('loading');
  const location = useLocation();

  const { searchPhrase, planetsData, changePlanetsData } =
    useContext(AppContext);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    setNavigationState('loading');
    const page = queryParams.has('page') ? +queryParams.get('page')! : 1;
    if (searchPhrase === '') {
      SwapiService.getAllPlanets(page)
        .then(changePlanetsData)
        .catch(() => setNavigationState('error'))
        .finally(() => setNavigationState('idle'));
    } else {
      SwapiService.searchPlanetByName(searchPhrase, page)
        .then(changePlanetsData)
        .catch(() => setNavigationState('error'))
        .finally(() => setNavigationState('idle'));
    }
  }, [queryParams, searchPhrase, changePlanetsData]);

  const errorMessage = navigationState === 'error' ? <ErrorMessage /> : null;
  const spinner = navigationState === 'loading' ? <Spinner /> : null;
  const content =
    navigationState === 'idle' ? <View planets={planetsData.planets} /> : null;

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
