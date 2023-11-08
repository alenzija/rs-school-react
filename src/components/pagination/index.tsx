import { ReactNode } from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';

import './pagination.scss';

type PaginationProps = {
  hasNextPage: boolean;
};

const Pagination = ({ hasNextPage }: PaginationProps): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();

  const hasPage = searchParams.get('page');
  const page = hasPage ? +hasPage : 1;

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
      <button disabled={page === 1 || state === 'loading'} onClick={toPrevPage}>
        {'<'}
      </button>
      <button disabled={true}>{page}</button>
      <button
        disabled={!hasNextPage || state === 'loading'}
        onClick={toNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
