import { useRouter } from 'next/router';

import { Spinner } from '../spinner';
import { PlanetCard } from '../planet-card';

import { transformPlanetData } from '../../helper/transform-planet-data';

import { IPlanet } from '../../types';

import styles from './planets-list.module.scss';

type PlanetsListProps = {
  planets: IPlanet[];
  listLoading: boolean;
  onChangePanelLoading: (value: boolean) => void;
};

export const PlanetsList: React.FC<PlanetsListProps> = ({
  planets,
  listLoading,
  onChangePanelLoading,
}) => {
  const spinner = listLoading ? <Spinner /> : null;
  const content = !listLoading ? (
    <View results={planets} onChangePanelLoading={onChangePanelLoading} />
  ) : null;

  return (
    <>
      {spinner}
      {content}
    </>
  );
};

type ViewProps = {
  results: Record<string, string>[];
  onChangePanelLoading: (value: boolean) => void;
};

const View: React.FC<ViewProps> = ({ results, onChangePanelLoading }) => {
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
          onChangePanelLoading={onChangePanelLoading}
        />
      ))}
    </div>
  );
};
