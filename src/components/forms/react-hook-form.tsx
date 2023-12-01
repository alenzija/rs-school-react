import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { addData } from '../../store/data-form-slice';

import { IFormData } from '../../types';
import { RootState } from '../../store/store';

import './form.scss';

export const ReactHookForm = () => {
  const formData = useSelector(
    (state: RootState) => state.dataForm.currentData
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { ...formData },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(addData(data));
    navigate('/');
  };

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
      <div className="radio-group">
        <div className="radio-group__title">Gender:</div>
        <div>
          <div>
            <input
              type="radio"
              checked
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
      <div className="text-field">
        <label htmlFor="image">Add your picture:</label>
        <input type="file" id="image" {...register('image')} />
      </div>
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
