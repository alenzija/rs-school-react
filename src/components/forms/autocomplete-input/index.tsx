import { useEffect, useState } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form/dist/types';
import { IFormData } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { filterCountries } from '../../../store/countries-slice';

import './autocomplete-input.scss';
import { RootState } from '../../../store/store';

type AutocompliteInputProps = {
  id: keyof IFormData;
  label: string;
  values: string[];
  className?: string;
  register: UseFormRegister<IFormData>;
  setValue: UseFormSetValue<IFormData>;
  watch: UseFormWatch<IFormData>;
};

export const AutocompliteInput: React.FC<AutocompliteInputProps> = ({
  id,
  label,
  values,
  className,
  register,
  setValue,
  watch,
}) => {
  const [visibilityMenu, setVisibilityMenu] = useState(false);

  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries.values);

  const textField = register(id);

  useEffect(() => {
    if (countries.length === 1 && watch(id) === countries[0]) {
      hideMenu();
    }
  }, [id, watch, countries]);

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
          {...textField}
          onFocus={showMenu}
          onChange={(e) => {
            textField.onChange(e);
            dispatch(filterCountries(watch(id) as string));
          }}
          id={id}
          type="text"
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
                setValue(id, item);
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
