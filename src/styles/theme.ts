import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA510', // Orange
    },
    secondary: {
      main: '#FFD700', // Yellow
    },
    background: {
      default: '#FFFCED',
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right, #FFD700, #FFA500)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#FACCB9',
          },
        },
      },
    },
  },
});

export default theme;
