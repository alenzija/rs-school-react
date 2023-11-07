import { ReactNode } from 'react';
import { defer, useParams } from 'react-router-dom';

import { IPlanet } from '../../types/planet';
import { DeferredData } from '@remix-run/router/dist/utils';

import Spinner from '../spinner';
import PlanetsItem from '../planets-item';

import SwapiService from '../../services/swapi-service';

import './planets-list.scss';

export const planetListLoader = async ({
  request,
}: {
  request: Request;
}): Promise<DeferredData | null> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const page = url.searchParams.has('page')
    ? +url.searchParams.get('page')!
    : 1;
  try {
    const res =
      search === ''
        ? SwapiService.getAllPlanets(page)
        : SwapiService.searchPlanetByName(search, page);
    return defer({ res });
  } catch {
    return Promise.resolve(null);
  }
};

const PlanetsList = (props: {
  planets: IPlanet[];
  loading: boolean;
}): ReactNode => {
  const { planets, loading } = props;

  const spinner = loading ? <Spinner /> : null;
  const content = !loading ? <View planets={planets} /> : null;

  return (
    <>
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
