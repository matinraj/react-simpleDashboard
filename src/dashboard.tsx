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
  Paper,
  TableContainer,
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

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _limit: 20, // GET 20 posts from the API
        },
      })
      .then((response) => setPosts(response.data)) // Update posts state
      .catch((error) => setError(error.message));
  }, []);

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
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {posts.map((post) => (
                  <React.Fragment key={post.id}>
                    <TableRow>
                      <TableCell>ID: {post.userId}</TableCell>
                      <TableCell>
                        <h4>Title: {post.title}</h4>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>{post.body}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
