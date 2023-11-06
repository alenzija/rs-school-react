import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import './pagination.scss';

type PaginationProps = {
  hasNextPage: boolean;
  loading: boolean;
};

const Pagination = (props: PaginationProps): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasPage = searchParams.get('page');
  const page = hasPage ? +hasPage : 1;

  const { hasNextPage, loading } = props;

  const toPrevPage = () => {
    const newSearchParams = { ...searchParams, page: `${page - 1}` };
    setSearchParams(newSearchParams);
  };

  const toNextPage = () => {
    const newSearchParams = { ...searchParams, page: `${page + 1}` };
    setSearchParams(newSearchParams);
  };

  return (
    <div className="pagination">
      <button disabled={page === 1 || loading} onClick={toPrevPage}>
        {'<'}
      </button>
      <button disabled={true}>{page}</button>
      <button disabled={!hasNextPage || loading} onClick={toNextPage}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
