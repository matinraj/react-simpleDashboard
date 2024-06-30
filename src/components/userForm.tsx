import React, { useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import userSchema from '../validation/userSchema'; // Import Schema for user form validation

export interface User {
    id?: number;
    name: string;
    username: string;
    email: string;
    company: {
      name: string;
    };
  }

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null; 
}

const UserForm: React.FC<UserFormProps> = ({ open, onClose, onSave, user }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<User>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: user?.name || '', // Set default values based on user prop
      username: user?.username || '',
      email: user?.email || '',
      company: {
        name: user?.company.name || '',
      },
    },
  });

  // Effect to set form values when user prop changes (for editing)
  useEffect(() => {
    if (user) {
      setValue('name', user.name || ''); // Set values using setValue
      setValue('username', user.username || '');
      setValue('email', user.email || '');
      setValue('company.name', user.company.name || '');
    } else {
      reset(); // Reset form fields if user prop is null (for creation)
    }
  }, [user, reset, setValue]);

  // Handle form submission
  const onSubmit = handleSubmit((formData) => {
    onSave(formData);
    onClose(); 
    reset()
  });

  // Reset and Close dialog on cancel
  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
              fullWidth
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              error={!!errors.username}
              helperText={errors.username?.message}
              margin="normal"
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              fullWidth
            />
          )}
        />
        <Controller
          name="company.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company"
              error={!!errors.company?.name}
              helperText={errors.company?.name?.message}
              margin="normal"
              fullWidth
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          {user ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
