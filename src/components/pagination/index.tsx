import { ReactNode, useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type PaginationProps = {
  hasNextPage: boolean;
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
};

const Pagination = (props: PaginationProps): ReactNode => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    queryParams.set('page', page.toString());
    navigate({ search: queryParams.toString() });
  }, [navigate, queryParams, page]);

  const { hasNextPage, loading, onChangeLoading } = props;

  const toPrevPage = () => {
    setPage(page - 1);
    onChangeLoading(true);
  };

  const toNextPage = () => {
    setPage(page + 1);
    onChangeLoading(true);
  };

  return (
    <>
      <button disabled={page === 1 || loading} onClick={toPrevPage}>
        Prev
      </button>
      <button disabled={true}>{page}</button>
      <button disabled={!hasNextPage || loading} onClick={toNextPage}>
        Next
      </button>
    </>
  );
};

export default Pagination;
