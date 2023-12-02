import { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form/dist/types';
import { IFormData } from '../../../types';

type AutocompliteInputProps = {
  id: keyof IFormData;
  label: string;
  values: string[];
  className?: string;
  register: UseFormRegister<IFormData>;
  setValue: UseFormSetValue<IFormData>;
};

export const AutocompliteInput: React.FC<AutocompliteInputProps> = ({
  id,
  label,
  values,
  className,
  register,
  setValue,
}) => {
  const [visibilityMenu, setVisibilityMenu] = useState(true);

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
        <input onFocus={showMenu} id={id} type="text" {...register(id)} />
        <div
          style={{
            display: `${visibilityMenu ? 'block' : 'none'}`,
            height: '200px',
            position: 'absolute',
            zIndex: 2,
            top: '30px',
            backgroundColor: '#efe8e8',
            overflowY: 'scroll',
          }}
        >
          {values.map((item, i) => (
            <div
              onClick={() => {
                console.log('click>>>');
                setValue(id, item);
                hideMenu();
              }}
              key={i}
              style={{ margin: '5px', cursor: 'pointer' }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
