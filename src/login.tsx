import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  CssBaseline,
  Alert,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Login: React.FC = () => {
  // State for username, password & error msg
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Event handlers
  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Fetch the first 10 users with their username and password
      const response = await axios.get('https://dummyjson.com/users', {
        params: {
          limit: 10,
          select: 'username,password',
        },
      });
      const users = response.data.users;

      console.log('ENTERED Username: ', username);
      console.log('ENTERED Password: ', password);
      console.log(users);

      // Check if username and password entered matches a user
      // eg. username: emilys password: emilyspass
      const user = users.find(
        (user: { username: string; password: string }) =>
          user.username === username && user.password === password
      );

      // If a matching user is found, navigate to the dashboard
      if (user) {
        navigate('/dashboard');
      } else {
        // If no matching user is found, display error message and reset input fields
        setError('Invalid username or password. Please try again.');
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('An error occurred. Please try again later.');
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={handleUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
          {error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          ) : null}

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
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
