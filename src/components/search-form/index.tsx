import { ReactNode, useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import './seacrh-form.scss';

const SearchForm = (props: { loading: boolean }): ReactNode => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');

  const searchPhrase = localStorage.getItem('searchPhrase');
  if (searchPhrase) {
    searchParams.set('search', searchPhrase);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    if (!target || !(target instanceof HTMLInputElement)) {
      return;
    }
    setValue(target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let newSearchPhrase: string | null = inputRef.current?.value.trim() || '';
    if (newSearchPhrase === '') {
      newSearchPhrase = null;
      localStorage.removeItem('searchPhrase');
      searchParams.delete('search');
      return;
    }
    if (newSearchPhrase === searchPhrase) {
      return;
    }
    localStorage.setItem('searchPhrase', newSearchPhrase);
    setSearchParams({ ...searchParams, search: newSearchPhrase });
  };

  const { loading } = props;

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder="Enter a planet name"
      />
      <button type="submit" disabled={loading}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
