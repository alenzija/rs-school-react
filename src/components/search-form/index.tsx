import { useRef, useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useSearchParams, useNavigation } from 'react-router-dom';

import { AppContext } from '../../context';

import './seacrh-form.scss';

export const SearchForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();
  const { searchPhrase, changeSearchPhrase } = useContext(AppContext);
  const [value, setValue] = useState(searchPhrase);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    if (!target || !(target instanceof HTMLInputElement)) {
      return;
    }
    setValue(target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newSearchPhrase: string = inputRef.current?.value.trim() || '';
    if (newSearchPhrase === searchPhrase) {
      return;
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    localStorage.setItem('searchPhrase', newSearchPhrase);
    changeSearchPhrase(newSearchPhrase);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        id="search-input"
        role="search-input"
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder="Enter a planet name"
      />
      <button type="submit" disabled={state === 'loading'}>
        Search
      </button>
    </form>
  );
};
