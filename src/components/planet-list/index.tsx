// import { useMemo } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import { Spinner } from '../spinner';
// import { ErrorMessage } from '../error-message';
// import { PlanetCard } from '../planet-card';

// import { RootState } from '../../store';
import { useRouter } from 'next/router';
import { transformPlanetData } from '../../helper/transform-planet-data';
import { PlanetCard } from '../planet-card';

// import { useGetAllPlanetsQuery } from '../../services/swapi-service-redux';

import styles from './planets-list.module.scss';
import { IPlanet } from '@/types';

export const PlanetsList = ({ planets }: { planets: IPlanet[] }) => {
  // const params = useSearchParams();

  // const location = useLocation();

  // const searchPhrase = useSelector((state: RootState) => state.search.value);

  // const queryParams = useMemo(
  //   () => new URLSearchParams(location.search),
  //   [location.search]
  // );
  //const page = params.has('page') ? +params.get('page')! : 1;

  // const {
  //   data: planetsData,
  //   error,
  //   isFetching,
  // } = useGetAllPlanetsQuery({ page, searchPhrase });

  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = isFetching ? <Spinner /> : null;
  const content = <View results={planets} />;

  return (
    <>
      {content}
      {/* {data.planets.map((item, index) => (
        <div key={index}>${item.name}</div>
      ))} */}
      {/* {errorMessage}
      {spinner}
      {content} */}
    </>
  );
};

const View: React.FC<{ results: Record<string, string>[] }> = ({ results }) => {
  // const params = useParams();
  const { query } = useRouter();
  const planets = Array.isArray(results)
    ? results.map((item) => transformPlanetData(item))
    : [];
  if (planets.length === 0) {
    return <>No planets</>;
  }

  return (
    <div className={styles.planets} role="planets-list">
      {planets.map((planet, index) => (
        <PlanetCard
          planet={planet}
          active={planet.name === query.name}
          key={index}
        />
      ))}
    </div>
  );
};
