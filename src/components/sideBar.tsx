import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import drawerWidth from '../styles/drawerWidth';
import { useTheme } from '@mui/material/styles';

interface SideDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleLogout: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  handleDrawerClose,
  handleLogout,
}) => {
  const location = useLocation();
  const theme = useTheme();

  const isSelected = (path: string) => location.pathname === path;

  return (
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
          to="/account"
          selected={isSelected('/account')}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Account" />
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
          to="/users"
          selected={isSelected('/users')}
        >
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Users CRUD" />
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
  );
};

export default SideDrawer;
