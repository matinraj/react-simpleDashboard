import { styled } from '@mui/material/styles';
import drawerWidth from './drawerWidth';

// Custom style for the main content area
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
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

export default Main;
