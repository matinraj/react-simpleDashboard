import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
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
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';

// import { RootState } from '../redux/store';
// import { setPosts, fetchPostsFailed } from '../redux/posts/postActions';
// import { useDispatch, useSelector } from 'react-redux';

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
  // // State for storing any error messages
  const [error, setError] = useState<string | null>(null);
  // State for progress indicator while data is being fetched
  const [loading, setLoading] = useState<boolean>(true);
  // State for pagination
  const [page, setPage] = useState<number>(0);
  // State of rows per page limit
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  // State for search string
  const [search, setSearch] = useState<string>('');
  // State for search history
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  // // State for fitered posts
  // const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Ref to store the previous search query
  const prevSearchRef = useRef<string>('');

  // const dispatch = useDispatch();
  // const posts = useSelector((state: RootState) => state.posts.posts);
  // const error = useSelector((state: RootState) => state.posts.error);

  // Fetch posts data from API or local storage
  const fetchPosts = useCallback(async () => {
    const cachedPosts = localStorage.getItem('posts');
    if (cachedPosts) {
      setPosts(JSON.parse(cachedPosts));
      setLoading(false);
    } else {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _limit: 55,
            },
          }
        );
        setPosts(response.data);
        localStorage.setItem('posts', JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Add search phrase as dropdown history when search button is clicked
  const handleSearchClick = useCallback(() => {
    // Only add to history if the search term has changed
    if (
      search &&
      search !== prevSearchRef.current &&
      !searchHistory.includes(search)
    ) {
      setSearchHistory((prev) => [...prev, search]);
      prevSearchRef.current = search; // Update the previous search ref
    }
  }, [search, searchHistory]);

  // Filter posts according to search
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      ),
    [posts, search]
  );

  // useMemo to avoid recalculation on every render
  // recomputes value when one of its dependencies has changed
  const paginatedPosts = useMemo(
    () =>
      filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredPosts, page, rowsPerPage]
  );

  // Function to handle page change
  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  // Function to handle RowsPerPage change
  const handleChangeRowsPerPage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(e.target.value, 10)); // Update rows per page state
      setPage(0); // Reset page to 0 when rows per page changes
    },
    []
  );

  return (
    <React.Fragment>
      <Toolbar />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" textAlign={'center'} gutterBottom>
          User Posts
        </Typography>
        {/* Search textfield */}
        <Box display="flex" alignItems="center">
          <Autocomplete
            freeSolo
            options={searchHistory}
            renderInput={(params) => (
              <TextField
                {...params}
                id="filled-basic"
                label="Search Posts"
                variant="filled"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ marginRight: 25, paddingRight: 1 }}
              />
            )}
            onInputChange={(_, value) => setSearch(value)}
          />
          <Button variant="contained" size="small" onClick={handleSearchClick}>
            Search
          </Button>
        </Box>
      </Box>

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
                {paginatedPosts.map((post, index) => (
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
