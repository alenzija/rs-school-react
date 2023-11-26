import { useRouter } from 'next/router';

import styles from './pagination.module.scss';

type PaginationProps = {
  nextPage: boolean;
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  nextPage,
  loading,
  onChangeLoading,
}) => {
  const { query, push } = useRouter();

  const page = query && 'page' in query ? +query.page! : 1;

  const toPrevPage = () => {
    onChangeLoading(true);
    push({
      query: { ...query, page: page - 1 },
    }).then(() => {
      onChangeLoading(false);
    });
  };

  const toNextPage = () => {
    onChangeLoading(true);
    push({
      query: { ...query, page: page + 1 },
    }).then(() => {
      onChangeLoading(false);
    });
  };
  return (
    <div className={styles.pagination}>
      <button
        role="to-prev-page"
        disabled={page === 1 || loading}
        onClick={toPrevPage}
      >
        {'<'}
      </button>
      <button disabled={true}>{page}</button>
      <button
        role="to-next-page"
        disabled={!nextPage || loading}
        onClick={toNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};
