import Image from 'next/image';
import { useRouter } from 'next/router';

import { Planet } from '../planet';
import { Spinner } from '../spinner';

import { IPlanet } from '../../types';

import { FULL_PLANETS_FIELDS } from '../../consts';

import styles from './left-side-panel.module.scss';

type LeftSidePanelProps = {
  planet: IPlanet;
  loading: boolean;
};

export const LeftSidePanel: React.FC<LeftSidePanelProps> = ({
  planet,
  loading,
}) => {
  return (
    <div
      role="detailed-component"
      className={styles['left-panel']}
      style={{ display: planet ? 'block' : 'none' }}
    >
      {loading ? <Spinner /> : <View data={planet} />}
    </div>
  );
};

const View: React.FC<{ data: IPlanet }> = ({ data }) => {
  const { query, push } = useRouter();
  return (
    <>
      <div
        className={styles['close-button']}
        role="close-panel"
        onClick={() => {
          const newQuery = { ...query };
          delete newQuery['name'];
          push({
            query: { ...newQuery },
          });
        }}
      >
        <Image
          className={styles['close-button__img']}
          src="/close.png"
          width={20}
          height={20}
          alt="close image"
        />
      </div>
      <Planet usedFields={FULL_PLANETS_FIELDS} planet={data} />
    </>
  );
};
