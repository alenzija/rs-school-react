import { ReactNode, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type PaginationProps = {
  hasNextPage: boolean;
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
  page: number;
  onChangePage: (value: number) => void;
};

const Pagination = (props: PaginationProps): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const { hasNextPage, loading, onChangeLoading, page, onChangePage } = props;

  useEffect(() => {
    queryParams.set('page', page.toString());
    navigate({ search: queryParams.toString() });
  }, [navigate, queryParams, page]);

  const toPrevPage = () => {
    onChangePage(page - 1);
    onChangeLoading(true);
  };

  const toNextPage = () => {
    onChangePage(page + 1);
    onChangeLoading(true);
  };

  return (
    <div style={{ display: loading ? 'none' : 'block' }}>
      <button disabled={page === 1 || loading} onClick={toPrevPage}>
        Prev
      </button>
      <button disabled={true}>{page}</button>
      <button disabled={!hasNextPage || loading} onClick={toNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
