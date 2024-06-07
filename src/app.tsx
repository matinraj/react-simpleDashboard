import React, { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  Box,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  CssBaseline,
  ListItemAvatar,
  ListItemButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { styled, useTheme } from '@mui/material/styles';

import Login from './login';
import Signup from './signup';
import Dashboard from './pages/dashboard';
import UserPage from './pages/userPage';
import SettingsPage from './pages/settingsPage';
import InfoPage from './pages/infoPage';

// Define drawer width
const drawerWidth = 240;

// Custom style for the main content area
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  mainpage?: string; // main pages (login/signup) should not have top & side bars
}>(({ theme, open, mainpage }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: Boolean(mainpage) ? 0 : `-${drawerWidth}px`, // if it is not mainpage, cater for sidebar margin
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// Custom style for the AppBar
const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const App: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // State for opening and closing side bar
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // State for opening logout dialog box
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

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

  const isSelected = (path: string) => location.pathname === path;

  // Check if the current location is the login or signup
  const isLoginPage = location.pathname === '/';
  const isSignUpPage = location.pathname === '/signup';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* ------- Top Nav Bar --------*/}
      {!isLoginPage && !isSignUpPage && (
        <AppBarStyled position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerOpen}
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/user' && 'User'}
              {location.pathname === '/settings' && 'Settings'}
              {location.pathname === '/info' && 'Info'}
            </Typography>
          </Toolbar>
        </AppBarStyled>
      )}

      {/* ------- Side Drawer --------*/}
      {!isLoginPage && !isSignUpPage && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Toolbar>
            <IconButton onClick={handleDrawerClose}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  color: theme.palette.primary.main,
                }}
              >
                RELDYN
              </Typography>
            </ListItem>
            <Divider />
            <ListItemButton
              component={Link}
              to="/user"
              selected={isSelected('/user')}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="User" />
            </ListItemButton>
            <Divider />
            <ListItemButton
              component={Link}
              to="/dashboard"
              selected={isSelected('/dashboard')}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/settings"
              selected={isSelected('/settings')}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/info"
              selected={isSelected('/info')}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Info" />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>
      )}
      {/* ------- Main Content --------*/}
      <Main
        open={open}
        mainpage={isLoginPage ? 'true' : '' || isSignUpPage ? 'true' : ''} // Check if page is login/signup
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </Main>
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default App;
