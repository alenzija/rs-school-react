import { ReactNode, Suspense } from 'react';
import {
  useLocation,
  useNavigate,
  Params,
  defer,
  useLoaderData,
  Await,
} from 'react-router-dom';

import Spinner from '../spinner';
import ErrorMessage from '../error-message';

import SwapiService from '../../services/swapi-service';

import { IPlanetDescription } from '../../types/planet';
import { DeferredData } from '@remix-run/router/dist/utils';

import closeImg from '../../assets/image/close.png';

import './planet-description.scss';

export const planetDescriptionLoader = async ({
  params,
}: {
  params: Params;
}): Promise<DeferredData | undefined> => {
  const { name } = params;
  if (!name) {
    return;
  }
  const res = SwapiService.getPlanetByName(name);
  return defer({ res });
};

const PlanetDescription = (): ReactNode => {
  const data = useLoaderData() as { res: IPlanetDescription };

  return (
    <div
      className="planet-description"
      style={{ display: data ? 'block' : 'none' }}
    >
      <Suspense fallback={<Spinner />}>
        <Await resolve={data.res}>
          {(response) => {
            return !response ? (
              <ErrorMessage />
            ) : (
              <View data={response} key={response.name} />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

const View = (props: { data: IPlanetDescription }): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const { name, climate, diameter, orbitalPeriod, population, terrain } =
    props.data;

  return (
    <>
      <div
        className="close-button"
        onClick={() => {
          navigate(`/?${queryParams.toString()}`);
        }}
      >
        <img className="close-button__img" src={closeImg} alt="close image" />
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Name: </span>
        {name}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Climate: </span>
        {climate}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Diametr: </span>
        {diameter}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Orbital period: </span>
        {orbitalPeriod}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Population: </span>
        {population}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Terrain: </span>
        {terrain}
      </div>
    </>
  );
};

export default PlanetDescription;
