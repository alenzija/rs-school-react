import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().matches(/^[A-Z]/, 'First letter must be UpperCase'),
  age: yup.number().positive('Age must be positive'),
  email: yup.string().email('Please, enter a correct email'),
  password_first: yup
    .string()
    .matches(
      /[!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~]+/,
      'Password must have a special character'
    )
    .matches(/[A-Z]+/, 'Password must have one uppercased letter')
    .matches(/[a-z]+/, 'Password must have one lowered letter')
    .matches(/[0-9]+/, 'Password must have one number'),
  password_second: yup
    .string()
    .matches(
      /[!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~]+/,
      'Password must have a special character'
    )
    .matches(/[A-Z]+/, 'Password must have one uppercased letter')
    .matches(/[a-z]+/, 'Password must have one lowered letter')
    .matches(/[0-9]+/, 'Password must have one number')
    .oneOf([yup.ref('password_first')], 'Passwords must match'),
  gender: yup.string(),
  accept: yup.boolean().required('Accept is required'),
  picture: yup.date(),
});

export const ReactHookForm = () => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register('name')}
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          placeholder="Enter your age"
          {...register('age')}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email')}
        />
      </div>
      <div>
        <label htmlFor="password_first">Password:</label>
        <input
          type="password"
          id="password_first"
          placeholder="Enter your password"
          {...register('password_first')}
        />
      </div>
      <div>
        <label htmlFor="password_second">Repeat your password:</label>
        <input
          type="password"
          id="password_second"
          placeholder="Enter your password again"
          {...register('password_second')}
        />
      </div>
      <div>
        <input type="radio" checked id="male" {...register('gender')} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" {...register('gender')} />
        <label htmlFor="female">Female</label>
      </div>
      <div>
        <input type="checkbox" id="accept" {...register('accept')} />
        <label htmlFor="accept">Accept</label>
      </div>
      <div>
        <label htmlFor="picture">Add your picture</label>
        <input type="file" id="picture" {...register('picture')} />
      </div>
    </form>
  );
};
