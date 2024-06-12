import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

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
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authActions';
import loginSchema from '../../validation/loginSchema';

// Structure of Form Inputs
interface FormInput {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  // Initialize form handling
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: yupResolver(loginSchema),
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // State to handle error messages
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // State to handle password visibility
  const [showPass, setShowPass] = useState(false);
  // Hook to navigate different pages
  const navigate = useNavigate();
  // Add dispatch to use redux action
  const dispatch = useDispatch();

  // Permanent noti for valid username & password
  useEffect(() => {
    enqueueSnackbar('Valid USERNAME: emilys , PASSWORD: emilyspass', {
      variant: 'info',
      persist: true,
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
    });
  });

  // Function to handle toggle of password visibility
  const handleClickShowPass = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  // Function to override default selection behavior when clicking button
  const handleMouseDownPass = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

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
        closeSnackbar(); // close valid login info notification
        dispatch(login()); // Dispatch login action to update authentication state
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
    <Container maxWidth="xs">
      <CssBaseline />
      <Card sx={{ minWidth: 345, padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 5,
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
            <CardContent>
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
                    type={showPass ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="password visibility button"
                            onClick={handleClickShowPass}
                            onMouseDown={handleMouseDownPass}
                          >
                            {showPass ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              {/* Display error message if any */}
              {errorMsg ? (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMsg}
                </Alert>
              ) : null}
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </CardActions>
            <Grid container>
              <Grid item xs>
                <Link href="#" underline="hover" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" underline="hover" variant="body2">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    </Container>
  );
};

export default LoginForm;
