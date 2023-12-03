import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { filterCountries } from '../../../store/countries-slice';

import { IFormData } from '../../../types';

import './autocomplete-input.scss';

type AutocompliteInputProps = {
  name: string;
  id: keyof IFormData;
  label: string;
  values: string[];
  className?: string;
  defaultValue?: string;
};

export const AutocompliteInput: React.FC<AutocompliteInputProps> = ({
  id,
  label,
  name,
  values,
  className,
  defaultValue,
}) => {
  const [visibilityMenu, setVisibilityMenu] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const showMenu = () => {
    setVisibilityMenu(true);
  };

  const hideMenu = () => {
    setVisibilityMenu(false);
  };

  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          ref={ref}
          onFocus={showMenu}
          onChange={() => {
            const value = ref.current?.value;
            if (!value) {
              return;
            }
            dispatch(filterCountries(value));
          }}
          id={id}
          name={name}
          defaultValue={defaultValue}
          type="text"
          placeholder="Choose your country"
        />
        <div
          className="menu"
          style={{
            display: `${visibilityMenu ? 'block' : 'none'}`,
          }}
        >
          {values.map((item, i) => (
            <div
              className="menu__item"
              onClick={() => {
                if (ref.current) {
                  ref.current.value = item;
                }
                hideMenu();
              }}
              key={i}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
