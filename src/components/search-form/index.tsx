import { ReactNode, useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './seacrh-form.scss';

type SearchFormProps = Readonly<{
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
}>;

const SearchForm = (props: Readonly<SearchFormProps>): ReactNode => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchPhrase, setSearchPhrase] = useState<string | null>(
    localStorage.getItem('searchPhrase')
  );

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    if (searchPhrase) {
      localStorage.setItem('searchPhrase', searchPhrase);
      queryParams.set('search', searchPhrase);
      navigate({ search: queryParams.toString() });
    } else {
      localStorage.removeItem('searchPhrase');
      queryParams.delete('search');
      navigate({});
    }
  }, [navigate, queryParams, searchPhrase]);

  const { onChangeLoading, loading } = props;

  const updateSearchPhrase = (): void => {
    let newSearchPhrase: string | null = inputRef.current?.value.trim() || '';
    if (newSearchPhrase === '') {
      newSearchPhrase = null;
    }
    if (newSearchPhrase === searchPhrase) {
      return;
    }
    setSearchPhrase(newSearchPhrase);
    onChangeLoading(true);
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-form__input"
        ref={inputRef}
        defaultValue={searchPhrase ? searchPhrase : undefined}
        placeholder="Enter a planet name"
      />
      <button disabled={loading} onClick={updateSearchPhrase}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
