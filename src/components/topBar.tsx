import React from 'react';
import { Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import AppBarStyled from '../styles/appBarStyle';

interface TopBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ open, handleDrawerOpen }) => {
  const location = useLocation();

  return (
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
  );
};

export default TopBar;
