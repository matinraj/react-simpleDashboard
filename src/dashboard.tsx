import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Structure of Post object
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  // State for storing the posts fetched from the API
  const [posts, setPosts] = useState<Post[]>([]);
  // State for storing any error messages
  const [error, setError] = useState<string | null>(null);
  // State for progress indicator while data is being fetched
  const [loading, setLoading] = useState<boolean>(true);
  // State for pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

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

  // Function to handle page change
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  // Function to handle RowsPerPage change
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // Update rows per page state
    setPage(0); // Reset page to 0 when rows per page changes
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* ------- Top Nav Bar --------*/}
      <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* ------- Main Body --------*/}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
      </Box>
    </Box>
  );
};

export default Dashboard;
