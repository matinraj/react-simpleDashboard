import * as yup from 'yup';

const userSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(
      /^[a-zA-Z0-9]*$/,
      'Username must contain only alphanumeric characters'
    ),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  company: yup.object({
    name: yup
      .string()
      .required('Company name is required')
      .min(3, 'Company name must be at least 3 characters'),
  }),
});

export default userSchema;