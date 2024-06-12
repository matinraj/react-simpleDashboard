import React, { useState } from 'react';
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

import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authActions';
import signupSchema from '../../validation/signupSchema';

// Structure of Form Inputs
interface FormInput {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  // Initialize form handling using react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(signupSchema),
  });

  // State to handle error messages
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // State to handle password visibility toggle
  const [showPass, setShowPass] = useState(false);

  // Hook to navigate different pages
  const navigate = useNavigate();

  const dispatch = useDispatch(); // Add dispatch to use redux action

  // Function to handle toggle of password visibility
  const handleClickShowPass = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  // Function to override default selection behavior when clicking the button
  const handleMouseDownPass = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      // Post new user to dummy API
      const response = await axios.post('https://dummyjson.com/users/add', {
        username: data.username,
        password: data.password,
      });

      console.log('Signup response:', response);
      dispatch(login()); // Dispatch login action to update authentication state

      // If signup is successful, navigate to login page
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to sign up:', err);
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
            mt: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'error.main', width: 56, height: 56 }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {/* Form for sign-up */}
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
              {/* Controller for confirm password input */}
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    type={showPass ? 'text' : 'password'}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ''
                    }
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
            {/* Sign Up button */}
            <CardActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </CardActions>
            <Grid container>
              <Grid item>
                <Link href="/" underline="hover" variant="body2">
                  {'Already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    </Container>
  );
};

export default SignupForm;
