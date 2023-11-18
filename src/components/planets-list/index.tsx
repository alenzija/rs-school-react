import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { PlanetCard } from '../planet-card';

import { RootState } from '../../store';
import { transfromPlanetData } from '../../helper/transform-planets-data';

import { useGetAllPlanetsQuery } from '../../services/swapi-service-redux';

import './planets-list.scss';

export const PlanetsList = () => {
  const location = useLocation();

  const searchPhrase = useSelector((state: RootState) => state.search.value);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const page = queryParams.has('page') ? +queryParams.get('page')! : 1;

  const {
    data: planetsData,
    error,
    isFetching,
  } = useGetAllPlanetsQuery({ page, searchPhrase });

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = isFetching ? <Spinner /> : null;
  const content =
    !(error || isFetching) && planetsData ? (
      <View results={planetsData.results} />
    ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View: React.FC<{ results: Record<string, string>[] }> = ({ results }) => {
  const params = useParams();

  const planets = results.map((item) => transfromPlanetData(item));

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
