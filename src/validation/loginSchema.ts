import * as yup from 'yup';

// Validation schema for input fields using Yup
const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(
      /^[a-zA-Z0-9]*$/,
      'Username must contain only alphanumeric characters'
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(20, 'Password must be less than 20 characters'),
});

export default loginSchema;
