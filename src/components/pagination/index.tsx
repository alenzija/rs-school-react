import { useRouter } from 'next/router';
import styles from './pagination.module.scss';

export const Pagination: React.FC<{ nextPage: boolean }> = ({ nextPage }) => {
  const { query, push } = useRouter();

  const page = query && 'page' in query ? +query.page! : 1;

  const toPrevPage = () => {
    push({
      query: { ...query, page: page - 1 },
    });
  };

  const toNextPage = () => {
    push({
      query: { ...query, page: page + 1 },
    });
  };
  return (
    <div className={styles.pagination}>
      <button role="to-prev-page" disabled={page === 1} onClick={toPrevPage}>
        {'<'}
      </button>
      <button disabled={true}>{page}</button>
      <button role="to-next-page" disabled={!nextPage} onClick={toNextPage}>
        {'>'}
      </button>
    </div>
  );
};
