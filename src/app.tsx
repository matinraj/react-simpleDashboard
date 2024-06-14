import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import { useSnackbar } from 'notistack';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { login, logout } from './redux/auth/authActions';

import Main from './styles/mainAreaStyle';
import TopBar from './components/topBar';
import SideDrawer from './components/sideBar';
import AppRoutes from './routes/appRoutes';
import LogoutDialog from './components/logout';

const App: React.FC = () => {
  const navigate = useNavigate();

  // State for opening and closing side bar
  const [open, setOpen] = useState(false);
  // State for opening logout dialog box
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const justAuthenticated = useSelector(
    (state: RootState) => state.auth.justAuthenticated
  );

  // Function to open dialog box
  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };
  // Function to close dialog box
  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };
  // Function to confirm logout
  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    dispatch(logout()); // isAuthenticated = false

    enqueueSnackbar('You have logged out', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      style: {
        backgroundColor: '#ff9800',
      },
    });
    navigate('/');
  };
  // Function to handle logout
  const handleLogout = () => {
    handleLogoutDialogOpen();
  };

  // Function to handle drawer open
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // Function to handle drawer close
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // console.log('isAuthenticated:', isAuthenticated);

  // Check if the current location is the login or signup
  const isLoginPage = location.pathname === '/';
  const isSignUpPage = location.pathname === '/signup';

  useEffect(() => {
    // if user has authenticated and tries to access login/signup page
    if (
      isAuthenticated &&
      (isLoginPage || isSignUpPage) &&
      !justAuthenticated
    ) {
      enqueueSnackbar('You have already logged in', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

      navigate('/dashboard');
    }
    // if user just signed in and reached dashboard, change status to login
    else if (justAuthenticated) {
      dispatch(login());
    }
    // if user is not authenticated and tries to access pages other than login/signup
    else if (!isAuthenticated && !isLoginPage && !isSignUpPage) {
      enqueueSnackbar('Please log in', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      navigate('/');
    }
  }, [
    isAuthenticated,
    isLoginPage,
    isSignUpPage,
    enqueueSnackbar,
    navigate,
    dispatch,
  ]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* ------- Top Nav Bar --------*/}
      {!isLoginPage && !isSignUpPage && (
        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      )}

      {/* ------- Side Drawer --------*/}
      {!isLoginPage && !isSignUpPage && (
        <SideDrawer
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleLogout={handleLogout}
        />
      )}
      {/* ------- Main Content --------*/}
      <Main
        open={open}
        mainpage={isLoginPage ? 'true' : '' || isSignUpPage ? 'true' : ''} // Check if page is login/signup
      >
        <Toolbar />
        <AppRoutes />
      </Main>
      {/* Logout Confirmation Dialog */}

      <LogoutDialog
        open={logoutDialogOpen}
        handleClose={handleLogoutDialogClose}
        handleConfirm={handleLogoutConfirm}
      />
    </Box>
  );
};

export default App;
