import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Link,
  CssBaseline,
  Alert,
  TextField,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Validation schema for input fields using Yup
const schema = yup.object().shape({
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
    .min(3, 'Password must be at least 5 characters')
    .max(20, 'Password must be less than 20 characters'),
});

// Structure of Form Inputs
interface FormInput {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  // Initialize form handling
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  // State to handle error messages
  const [error, setErrorMsg] = useState<string | null>(null);

  // Hook to navigate different pages
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      // Fetch the first 10 users with their username and password
      const response = await axios.get('https://dummyjson.com/users', {
        params: {
          limit: 10,
          select: 'username,password',
        },
      });

      const users = response.data.users;

      // Console Log Test
      console.log('Username Entered', data.username);
      console.log('Password Entered', data.password);
      console.log(users);

      // Check if username and password entered matches a user from dummy api
      // eg. username: emilys password: emilyspass
      const user = users.find(
        (user: { username: string; password: string }) =>
          user.username === data.username && user.password === data.password
      );

      // If a matching user is found, navigate to the dashboard
      if (user) {
        navigate('/dashboard');
      } else {
        // If no matching user is found, display error message and reset input fields
        setErrorMsg('Invalid username or password. Please try again.');
        reset();
      }
    } catch (err) {
      // Handle errors that occur during the API request
      console.error('Failed to fetch users:', err);
      setErrorMsg('An error occurred. Please try again later.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'error.main', width: 56, height: 56 }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Controller for username input */}
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
              />
            )}
          />
          {/* Controller for password input */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          {/* Display error message if there is one */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" underline="hover" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" underline="hover" variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
