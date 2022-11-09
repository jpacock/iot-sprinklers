import { 
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React from 'react';

export interface AddScheduleItemOverlayProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const AddScheduleItemOverlay = (props: AddScheduleItemOverlayProps) => {
  const { onClose, open, selectedValue } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>Schedule Type</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => handleListItemClick("Scheduled")} key="key-1">
          <ListItemText primary="Scheduled" />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick("Manual")} key="key-2">
          <ListItemText primary="Manual" />
        </ListItem>
      </List>
    </Dialog>
  )
}
