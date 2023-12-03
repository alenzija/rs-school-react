import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import { addData, updateData } from '../../store/data-form-slice';
import { RootState } from '../../store/store';

import { AutocompliteInputRHF } from './autocomplete-input/';

import { convertBase64 } from '../../utils';

import { IFormData } from '../../types';

import { schema } from './schema';

import './form.scss';

export const ReactHookForm = () => {
  const formData = useSelector(
    (state: RootState) => state.dataForm.currentData
  );
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { ...formData },
  });
  const countries = useSelector((state: RootState) => state.countries.values);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const images = data.image;
    data.imageBase64 =
      images && images.length > 0
        ? await convertBase64(images[0])
        : data.imageBase64;
    data.imageName =
      images && images.length > 0 ? images[0].name : data.imageName;
    data.image = undefined;
    dispatch(addData(data));
    navigate('/');
  };

  useEffect(() => {
    dispatch(updateData());
  }, [dispatch]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register('name')}
        />
      </div>
      {errors.name && <div className="error">{errors.name.message}</div>}
      <div className="text-field">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          placeholder="Enter your age"
          {...register('age')}
        />
      </div>
      {errors.age && <div className="error">{errors.age.message}</div>}
      <div className="text-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email')}
        />
      </div>
      {errors.email && <div className="error">{errors.email.message}</div>}
      <div className="text-field">
        <label htmlFor="password_first">Password:</label>
        <input
          type="password"
          id="password_first"
          placeholder="Enter your password"
          {...register('firstPassword')}
        />
      </div>
      {errors.firstPassword && (
        <div className="error">{errors.firstPassword.message}</div>
      )}
      <div className="text-field">
        <label htmlFor="password_second">Repeat your password:</label>
        <input
          type="password"
          id="password_second"
          placeholder="Enter your password again"
          {...register('secondPassword')}
        />
      </div>
      {errors.secondPassword && (
        <div className="error">{errors.secondPassword.message}</div>
      )}
      <AutocompliteInputRHF
        id="country"
        label="Country:"
        values={countries}
        className="text-field"
        register={register}
        setValue={setValue}
        watch={watch}
      />
      {errors.country && <div className="error">{errors.country.message}</div>}
      <div className="radio-group">
        <div className="radio-group__title">Gender:</div>
        <div>
          <div>
            <input
              type="radio"
              value="male"
              id="male"
              {...register('gender')}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender')}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      </div>
      {errors.gender && <div className="error">{errors.gender.message}</div>}
      <div className="text-field">
        <label htmlFor="image">Add your picture:</label>
        <input
          type="file"
          id="image"
          accept=".jpg, .jpeg, .png"
          {...register('image')}
        />
      </div>
      {formData?.imageName && (
        <div className="text-field">Your picture: {formData?.imageName}</div>
      )}
      <div className="checkbox">
        <input type="checkbox" id="accept" {...register('accept')} />
        <label htmlFor="accept">Accept</label>
      </div>
      {errors.accept && (
        <div className="error accept">{errors.accept.message}</div>
      )}
      <button type="submit">Next</button>
    </form>
  );
};
