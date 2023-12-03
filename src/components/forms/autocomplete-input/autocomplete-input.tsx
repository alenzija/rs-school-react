import { useEffect, useRef, useState } from 'react';

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
  const [availableValues, setAvailableValues] = useState(values);

  const ref = useRef<HTMLInputElement>(null);

  const showMenu = () => {
    setVisibilityMenu(true);
  };

  const hideMenu = () => {
    setVisibilityMenu(false);
  };

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
            setAvailableValues(
              values.filter((item) =>
                item.toLowerCase().includes(value.trim().toLowerCase())
              )
            );
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
          {availableValues.map((item, i) => (
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
