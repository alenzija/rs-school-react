import { useRef, useState, ChangeEvent, FormEvent } from 'react';

import styles from './seacrh-form.module.scss';
import { useRouter } from 'next/router';

export const SearchForm = () => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newSearchPhrase: string = inputRef.current?.value.trim() || '';
    if (newSearchPhrase === router.query.search) {
      return;
    }
    router.push({
      pathname: '/',
      query: {
        page: '1',
        search: newSearchPhrase,
      },
    });
    // localStorage.setItem('searchPhrase', newSearchPhrase);
    setValue(newSearchPhrase);
  };

  return (
    <form className={styles['search-form']} onSubmit={handleSubmit}>
      <input
        className={styles['search-form__input']}
        id="search-input"
        role="search-input"
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder="Enter a planet name"
      />
      <button type="submit">Search</button>
    </form>
  );
};
