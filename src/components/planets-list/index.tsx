import { useMemo } from 'react';
import { defer, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DeferredData } from '@remix-run/router/dist/utils';

import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { PlanetCard } from '../planet-card';

import { SwapiService } from '../../services/swapi-service';

import './planets-list.scss';

import { RootState } from '../../store';
import { useGetAllPlanetsQuery } from '../../services/swapi-service-redux';
import { transfromPlanetData } from '../../helper/transform-planets-data';

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
  const res = SwapiService.getPlanets(page, search);
  return defer({ res });
};

export const PlanetsList = () => {
  // const [navigationState, setNavigationState] =
  //   useState<NavigationState>('loading');
  const location = useLocation();

  // const { planetsData, changePlanetsData } = useContext(AppContext);

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
    ...others
  } = useGetAllPlanetsQuery({ page, searchPhrase });

  console.log('>>>loading', { others });
  // useEffect(() => {
  //   setNavigationState('loading');
  //   const page = queryParams.has('page') ? +queryParams.get('page')! : 1;
  //   if (searchPhrase === '') {
  //     SwapiService.getAllPlanets(page)
  //       .then(changePlanetsData)
  //       .catch(() => setNavigationState('error'))
  //       .finally(() => setNavigationState('idle'));
  //   } else {
  //     SwapiService.searchPlanetByName(searchPhrase, page)
  //       .then(changePlanetsData)
  //       .catch(() => setNavigationState('error'))
  //       .finally(() => setNavigationState('idle'));
  //   }
  // }, [queryParams, searchPhrase, changePlanetsData]);

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
