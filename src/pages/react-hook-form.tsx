import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addData } from '../store/data-form-slice';
import { useNavigate } from 'react-router-dom';
import { IFormData } from '../types';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be UpperCase')
    .required('This field is required'),
  age: yup
    .number()
    .positive('Age must be positive')
    .required('This field is required'),
  email: yup
    .string()
    .email('Please, enter a correct email')
    .required('This field is required'),
  firstPassword: yup
    .string()
    .matches(
      /[!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~]+/,
      'Password must have a special character'
    )
    .matches(/[A-Z]+/, 'Password must have one uppercased letter')
    .matches(/[a-z]+/, 'Password must have one lowered letter')
    .matches(/[0-9]+/, 'Password must have one number')
    .required('This field is required'),
  secondPassword: yup
    .string()
    .matches(
      /[!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~]+/,
      'Password must have a special character'
    )
    .matches(/[A-Z]+/, 'Password must have one uppercased letter')
    .matches(/[a-z]+/, 'Password must have one lowered letter')
    .matches(/[0-9]+/, 'Password must have one number')
    .oneOf([yup.ref('firstPassword')], 'Passwords must match')
    .required('This field is required'),
  gender: yup.string().required('This field is required'),
  accept: yup.boolean().required('This field is required'),
  image: yup.string().required('This field is required'),
});

export const ReactHookForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(addData(data));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register('name')}
        />
        {errors.name && <div>{errors.name.message}</div>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          placeholder="Enter your age"
          {...register('age')}
        />
        {errors.age && <div>{errors.age.message}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && <div>{errors.email.message}</div>}
      </div>
      <div>
        <label htmlFor="password_first">Password:</label>
        <input
          type="password"
          id="password_first"
          placeholder="Enter your password"
          {...register('firstPassword')}
        />
        {errors.firstPassword && <div>{errors.firstPassword.message}</div>}
      </div>
      <div>
        <label htmlFor="password_second">Repeat your password:</label>
        <input
          type="password"
          id="password_second"
          placeholder="Enter your password again"
          {...register('secondPassword')}
        />
        {errors.secondPassword && <div>{errors.secondPassword.message}</div>}
      </div>
      <div>
        <input
          type="radio"
          checked
          value="male"
          id="male"
          {...register('gender')}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="female"
          value="female"
          {...register('gender')}
        />
        <label htmlFor="female">Female</label>
      </div>
      <div>
        <input type="checkbox" id="accept" {...register('accept')} />
        <label htmlFor="accept">Accept</label>
      </div>
      <div>
        <label htmlFor="image">Add your picture</label>
        <input type="file" id="image" {...register('image')} />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};
