import React from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4">Welcome</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
