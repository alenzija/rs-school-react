import { Suspense } from 'react';
import {
  useLocation,
  Params,
  defer,
  useLoaderData,
  Await,
  useNavigate,
} from 'react-router-dom';

import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { Planet } from '../planet';

import { SwapiService } from '../../services/swapi-service';

import { IPlanet } from '../../types';
import { DeferredData } from '@remix-run/router/dist/utils';

import closeImg from '../../assets/image/close.png';

import { FULL_PLANETS_FIELDS } from '../../consts';

import './left-side-panel.scss';

export const getPlanetLoader = async ({
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

export const LeftSidePanel = () => {
  const data = useLoaderData() as { res: IPlanet };

  return (
    <div className="left-panel" style={{ display: data ? 'block' : 'none' }}>
      <Suspense fallback={<Spinner />}>
        <Await resolve={data.res}>
          {(response) => {
            return !response ? <ErrorMessage /> : <View data={response} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
};

const View: React.FC<{ data: IPlanet }> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

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
      <Planet usedFields={FULL_PLANETS_FIELDS} planet={data} />
    </>
  );
};
