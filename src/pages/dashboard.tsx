import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Toolbar,
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

import { RootState } from '../redux/store';
import { setPosts, fetchPostsFailed } from '../redux/posts/postActions';
import { useDispatch, useSelector } from 'react-redux';

// Structure of Post object
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  // State for storing the posts fetched from the API
  // const [posts, setPosts] = useState<Post[]>([]);
  // // State for storing any error messages
  // const [error, setError] = useState<string | null>(null);
  // State for progress indicator while data is being fetched
  const [loading, setLoading] = useState<boolean>(true);
  // State for pagination
  const [page, setPage] = useState<number>(0);
  // State of rows per page limit
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (posts.length === 0) {
      axios
        .get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: 55,
          },
        })
        .then((response) => {
          dispatch(setPosts(response.data));
          setLoading(false);
        })
        .catch((error) => {
          dispatch(fetchPostsFailed(error.message));
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, posts.length]);

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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Dashboard;
