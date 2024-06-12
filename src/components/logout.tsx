import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface LogoutDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="logout-dialog-title"
    aria-describedby="logout-dialog-description"
  >
    <DialogTitle id="logout-dialog-title">Logout Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText id="logout-dialog-description">
        Are you sure you want to logout?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleConfirm} color="primary">
        Logout
      </Button>
    </DialogActions>
  </Dialog>
);

export default LogoutDialog;
