import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('This field is required')
    .matches(/^[A-Z]/, 'First letter must be UpperCase'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('This field is required')
    .positive('Age must be positive'),
  email: yup
    .string()
    .email('Please, enter a correct email')
    .required('This field is required'),
  firstPassword: yup
    .string()
    .required('This field is required')
    .matches(
      /[!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~]+/,
      'Password must have a special character'
    )
    .matches(/[A-Z]+/, 'Password must have one uppercased letter')
    .matches(/[a-z]+/, 'Password must have one lowered letter')
    .matches(/[0-9]+/, 'Password must have one number'),
  secondPassword: yup
    .string()
    .required('This field is required')
    .matches(
      /[!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~]+/,
      'Password must have a special character'
    )
    .matches(/[A-Z]+/, 'Password must have one uppercased letter')
    .matches(/[a-z]+/, 'Password must have one lowered letter')
    .matches(/[0-9]+/, 'Password must have one number')
    .oneOf([yup.ref('firstPassword')], 'Passwords must match'),
  gender: yup.string().required('This field is required'),
  country: yup.string(),
  accept: yup.boolean().oneOf([true], 'Accept is required'),
  image: yup.string(),
});
