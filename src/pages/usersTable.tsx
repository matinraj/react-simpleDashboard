import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Button,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import UserForm, { User } from '../components/userForm';

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch users from the API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users', {
        params: {
          _limit: 3, // limit for demo
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Open the edit dialog
  const handleOpenEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setOpen(true); // setOpen is true when editing
  }, []);

  // Close the edit dialog
  const handleCloseEdit = useCallback(() => {
    setOpen(false);
    setSelectedUser(null); // Reset selectedUser
  }, []);

  // Save the edited user data
  const handleSaveEdit = useCallback(
    (updatedUser: User) => {
      if (selectedUser) {
        axios
          .put(
            `https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, 
            updatedUser
          )
          .then((response) => {
            setUsers((prevUsers) =>
              prevUsers.map((user) => 
                user.id === selectedUser.id ? response.data : user
              )
            );
            enqueueSnackbar('User updated successfully', { 
              variant: 'success'
             }); // Show success alert
            handleCloseEdit();
          })
          .catch((error) => {
            setError(error.message);
            enqueueSnackbar('Error updating user', { variant: 'error' }); // Show error alert
          });
      }
    },
    [selectedUser, enqueueSnackbar, handleCloseEdit]
  );

  // Open the create dialog
  const handleOpenCreate = useCallback(() => {
    setOpen(true); // Ensure setOpen is true when creating
  }, []);

  // Close the create dialog
  const handleCloseCreate = useCallback(() => {
    setOpen(false);
    setSelectedUser(null); // Reset selectedUse
  }, []);

  // Save the new user data
  const handleSaveCreate = useCallback(
    (newUser: User) => {
      axios
        .post('https://jsonplaceholder.typicode.com/users', newUser)
        .then((response) => {
          setUsers((prevUsers) => {
            const newUserWithUniqueId = {
              ...response.data,
              id: prevUsers.length ? Math.max(...prevUsers.map(user => user.id!)) + 1 : 1, // Check if prev user exists and +1 to highest ID
            };
            return [...prevUsers, newUserWithUniqueId];
          });
          enqueueSnackbar('User created successfully', { variant: 'success' });
          handleCloseCreate();
        })
        .catch((error) => {
          setError(error.message);
          enqueueSnackbar('Error creating user', { variant: 'error' });
        });
    },
    [enqueueSnackbar, handleCloseCreate]
  );

  // Delete a user
  const handleDelete = useCallback(
    (id: number) => {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          enqueueSnackbar('User deleted', { variant: 'error' }); // Show success alert
        })
        .catch((error) => {
          setError(error.message);
          enqueueSnackbar('Error deleting user', { variant: 'error' }); // Show error alert
        });
    },
    [enqueueSnackbar]
  );

  // Handle page change
  const handleChangePage = useCallback((_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  }, []);

  // useMemo to calculate pagination
  const paginatedUsers = useMemo(
    () =>
      users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [users, page, rowsPerPage]
  );

  // Handle rows per page change
  const handleChangeRowsPerPage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  return (
    <React.Fragment>
      <Toolbar/>
      <Typography variant="h4" textAlign={'center'} gutterBottom>
        Users
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <React.Fragment>
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: '20px' }}
            onClick={handleOpenCreate}
          >
            Create User
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell> {/* Ensure consecutive numbering */}
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company.name}</TableCell>
                    <TableCell>
                      <IconButton
                        style={{ color: 'blue' }}
                        onClick={() => handleOpenEdit(user)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        style={{ color: 'red' }}
                        onClick={() => handleDelete(user.id!)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </React.Fragment>
      )}

      <UserForm
        open={open}
        onClose={() => setOpen(false)} // Close dialog handler
        onSave={selectedUser ? handleSaveEdit : handleSaveCreate} // Determine onSave handler based on selectedUser
        user={selectedUser} // Pass selectedUser for editing
      />
    </React.Fragment>
  );
};

export default UsersTable;
