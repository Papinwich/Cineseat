import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(6, 'Username must be at leat 6 characters')
    .max(20, 'Username must be not exceed 20 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const cinemaSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at leat 3 characters')
    .max(20, 'Name must be not exceed 20 characters'),
  location: yup
    .string()
    .required('Location is required')
    .min(3, 'Location must be at leat 3 characters')
    .max(20, 'Location must be not exceed 20 characters'),
});

export const screenSchema = yup.object().shape({
  cinemaId: yup.string().required('Please select cinema'),
  name: yup
    .string()
    .required('Screen name is required')
    .min(3, 'Screen name must be at leat 3 characters')
    .max(20, 'Screen name must be not exceed 20 characters'),
});

export const movieSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  release_date: yup.string().required('Release date is required'),
  language: yup.string().required('Language is required'),
  rate: yup.string().required('Rate is required'),
  duration: yup
    .number()
    .typeError('Duration must be a number')
    .required('Duration is required')
    .positive('Duration must be positive'),
});

export const showtimeSchema = yup.object().shape({
  cinemaId: yup.string().required('Please select cinema'),
  screenId: yup.string().required('Please select screen'),
  movieId: yup.string().required('Please select movie'),
  time: yup.string().required('Please select time'),
  date: yup.string().required('Please select date'),
});
