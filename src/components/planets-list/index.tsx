import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { IPlanet } from '../../types/planet';
import ResponseType from '../../types/response-type';

import Spinner from '../spinner';
import PlanetsItem from '../planets-item';

import SwapiService from '../../services/swapi-service';

import './planets-list.scss';

export const getPlanetList = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}): Promise<ResponseType> => {
  return search === ''
    ? await SwapiService.getAllPlanets(page)
    : await SwapiService.searchPlanetByName(search, page);
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
