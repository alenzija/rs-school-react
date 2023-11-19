import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useSearchParams, useNavigation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { changeSearch } from '../../store/search-slice';

import './seacrh-form.scss';

export const SearchForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();

  const searchPhrase = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();
  const [value, setValue] = useState(searchPhrase);

  const changeSearchPhrase = () => dispatch(changeSearch(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
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
    setValue(newSearchPhrase);
    changeSearchPhrase();
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
