import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationError } from 'yup';

import { addData, updateData } from '../../store/data-form-slice';
import { RootState } from '../../store/store';

import { AutocompliteInput } from './autocomplete-input';

import { convertBase64 } from '../../utils';

import { IFormData } from '../../types';

import { schema } from './schema';

import './form.scss';

type ErrorsType = {
  name: string;
  age: string;
  email: string;
  firstPassword: string;
  secondPassword: string;
  country: string;
  gender: string;
  accept: string;
};

export const FormWithUncontolledComponents = () => {
  const formData = useSelector(
    (state: RootState) => state.dataForm.currentData
  );

  const countries = useSelector((state: RootState) => state.countries.values);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<ErrorsType>({
    name: '',
    age: '',
    email: '',
    firstPassword: '',
    secondPassword: '',
    country: '',
    gender: '',
    accept: '',
  });

  const clearErrors = () => {
    setErrors({
      name: '',
      age: '',
      email: '',
      firstPassword: '',
      secondPassword: '',
      country: '',
      gender: '',
      accept: '',
    });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: number };
      email: { value: string };
      firstPassword: { value: string };
      secondPassword: { value: string };
      country: { value: string };
      gender: { value: string };
      image: { files: FileList };
      accept: { checked: boolean };
    };

    const data: IFormData = {
      name: target.name.value,
      age: target.age.value,
      email: target.email.value,
      firstPassword: target.firstPassword.value,
      secondPassword: target.secondPassword.value,
      country: target.country.value,
      gender: target.gender.value,
      image: target.image.files,
      accept: target.accept.checked,
    };
    try {
      clearErrors();
      schema.validateSync(data, { abortEarly: false });
      data.imageBase64 =
        data.image && data.image.length > 0
          ? await convertBase64(data.image[0])
          : formData?.imageBase64;
      data.imageName =
        data.image && data.image.length > 0
          ? data.image[0].name
          : formData?.imageName;
      data.image = undefined;
      dispatch(addData(data));
      navigate('/');
    } catch (e) {
      if (!(e instanceof ValidationError)) {
        return;
      }
      e.inner.reverse().forEach((error: ValidationError) => {
        const key = error.path as string;
        const message = error.message;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: message }));
      });
    }
  };

  useEffect(() => {
    dispatch(updateData());
  }, [dispatch]);

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="text-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={formData?.name}
          placeholder="Enter your name"
        />
      </div>
      {errors.name && <div className="error">{errors.name}</div>}
      <div className="text-field">
        <label htmlFor="age">Age:</label>
        <input
          name="age"
          type="number"
          id="age"
          placeholder="Enter your age"
          defaultValue={formData?.age}
        />
      </div>
      {errors.age && <div className="error">{errors.age}</div>}
      <div className="text-field">
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          id="email"
          placeholder="Enter your email"
          defaultValue={formData?.email}
        />
      </div>
      {errors.email && <div className="error">{errors.email}</div>}
      <div className="text-field">
        <label htmlFor="password_first">Password:</label>
        <input
          name="firstPassword"
          type="password"
          id="password_first"
          placeholder="Enter your password"
          defaultValue={formData?.firstPassword}
        />
      </div>
      {errors.firstPassword && (
        <div className="error">{errors.firstPassword}</div>
      )}
      <div className="text-field">
        <label htmlFor="password_second">Repeat your password:</label>
        <input
          name="secondPassword"
          type="password"
          id="password_second"
          placeholder="Enter your password again"
          defaultValue={formData?.secondPassword}
        />
      </div>
      {errors.secondPassword && (
        <div className="error">{errors.secondPassword}</div>
      )}
      <AutocompliteInput
        name="country"
        id="country"
        label="Country:"
        values={countries}
        className="text-field"
        defaultValue={formData?.country}
      />
      {errors.country && <div className="error">{errors.country}</div>}
      <div className="radio-group">
        <div className="radio-group__title">Gender:</div>
        <div>
          <div>
            <input
              name="gender"
              type="radio"
              value="male"
              id="male"
              defaultChecked={formData?.gender === 'male'}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              name="gender"
              type="radio"
              id="female"
              value="female"
              defaultChecked={formData?.gender === 'female'}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      </div>
      {errors.gender && <div className="error">{errors.gender}</div>}
      <div className="text-field">
        <label htmlFor="image">Add your picture:</label>
        <input name="image" type="file" id="image" accept=".jpg, .jpeg, .png" />
      </div>
      {formData?.imageName && (
        <div className="text-field">Your picture: {formData?.imageName}</div>
      )}
      <div className="checkbox">
        <input
          name="accept"
          type="checkbox"
          id="accept"
          defaultChecked={formData?.accept}
        />
        <label htmlFor="accept">Accept</label>
      </div>
      {errors.accept && <div className="error accept">{errors.accept}</div>}
      <button type="submit">Next</button>
    </form>
  );
};
