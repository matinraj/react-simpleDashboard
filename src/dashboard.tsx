import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  TableContainer,
  TablePagination,
  CircularProgress,
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { styled, useTheme } from '@mui/material/styles';

// Structure of Post object
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Define drawer width
const drawerWidth = 240;

// Custom style for the main content area
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
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

const Dashboard: React.FC = () => {
  const theme = useTheme();
  // State for opening and closing side bar
  const [open, setOpen] = useState(false);
  // State for storing the posts fetched from the API
  const [posts, setPosts] = useState<Post[]>([]);
  // State for storing any error messages
  const [error, setError] = useState<string | null>(null);
  // State for progress indicator while data is being fetched
  const [loading, setLoading] = useState<boolean>(true);
  // State for pagination
  const [page, setPage] = useState<number>(0);
  // State of rows per page limit
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _limit: 55, // GET 55 posts from the API
        },
      })
      .then((response) => {
        setPosts(response.data); // Update posts state
        setLoading(false); // Update loading to false when data is fetched
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Set loading to false if error
      });
  }, []);

  // Function to handle drawer open
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Function to handle drawer close
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Function to handle page change
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Function to handle RowsPerPage change
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // Update rows per page state
    setPage(0); // Reset page to 0 when rows per page changes
  };

  // Function to handle logout
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* ------- Top Nav Bar --------*/}
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
            Dashboard
          </Typography>
        </Toolbar>
      </AppBarStyled>

      {/* ------- Side Drawer --------*/}
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
            {theme.direction === 'ltr' ? <MenuIcon /> : <MenuIcon />}
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
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="User" />
          </ListItem>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton>
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

      {/* ------- Main Content --------*/}
      <Main open={open}>
        <Toolbar />
        <Typography variant="h4" textAlign={'center'} gutterBottom>
          User Posts
        </Typography>

        {loading ? ( // CircularProgress while loading
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Body</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((post, index) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          {' '}
                          {
                            <b>{page * rowsPerPage + index + 1}</b> // Calculate overall index for the post numbering
                          }
                        </TableCell>
                        <TableCell>{post.userId}</TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.body}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* ------- Table Pagination --------*/}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={posts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </React.Fragment>
        )}
      </Main>
    </Box>
  );
};

export default Dashboard;
