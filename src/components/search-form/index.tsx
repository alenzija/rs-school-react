import { useRef, useState, ChangeEvent, FormEvent } from 'react';

import styles from './seacrh-form.module.scss';
import { useRouter } from 'next/router';

type SearchFormProps = {
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
};

export const SearchForm: React.FC<SearchFormProps> = ({
  loading,
  onChangeLoading,
}) => {
  const { push, query } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newSearchPhrase: string = inputRef.current?.value.trim() || '';
    if (newSearchPhrase === query.search) {
      return;
    }
    onChangeLoading(true);
    push({
      query:
        newSearchPhrase !== ''
          ? { ...query, page: '1', search: newSearchPhrase }
          : { ...query, page: '1' },
    }).then(() => {
      onChangeLoading(false);
    });
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
      <button type="submit" disabled={loading}>
        Search
      </button>
    </form>
  );
};
