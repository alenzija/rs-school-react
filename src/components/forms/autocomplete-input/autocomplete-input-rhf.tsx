import { useEffect, useState } from 'react';

import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form/dist/types';
import { IFormData } from '../../../types';

import './autocomplete-input.scss';

type AutocompliteInputProps = {
  id: keyof IFormData;
  label: string;
  values: string[];
  className?: string;
  register: UseFormRegister<IFormData>;
  setValue: UseFormSetValue<IFormData>;
  watch: UseFormWatch<IFormData>;
};

export const AutocompliteInputRHF: React.FC<AutocompliteInputProps> = ({
  id,
  label,
  values,
  className,
  register,
  setValue,
  watch,
}) => {
  const [visibilityMenu, setVisibilityMenu] = useState(false);
  const [availableValues, setAvailableValues] = useState(values);

  const textField = register(id);

  useEffect(() => {
    const keyupHandler = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        hideMenu();
      }
    };
    document.addEventListener('keyup', keyupHandler);
    return () => {
      document.removeEventListener('keyup', keyupHandler);
    };
  }, []);

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
            setAvailableValues(
              values.filter((item) =>
                item
                  .toLocaleLowerCase()
                  .includes((watch(id) as string).trim().toLowerCase())
              )
            );
          }}
          id={id}
          type="text"
          placeholder="Choose your country"
        />
        <div
          className="menu"
          style={{
            display: `${visibilityMenu ? 'block' : 'none'}`,
          }}
        >
          {availableValues.map((item, i) => (
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
