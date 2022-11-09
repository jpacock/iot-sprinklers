import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { CalendarMonth, History, Menu, PlayCircleOutline, ToggleOffOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton size="large" edge="start" color="inherit" aria-label="logo" onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} variant="temporary">
        <Box m={2} width="250px" textAlign="center" role="presentation">
          <FontAwesomeIcon icon={faDroplet} color="lightBlue"/>
        </Box>
        <List>
          <ListItemButton component={Link} to="/schedule" onClick={() => setOpen(false)}>
            <IconButton>
              <CalendarMonth />
            </IconButton>
            Schedule
          </ListItemButton>
          <ListItemButton component={Link} to="/run-once" onClick={() => setOpen(false)}>
            <IconButton>
              <PlayCircleOutline />
            </IconButton>
            Run Once
          </ListItemButton>
          <ListItemButton component={Link} to="/manual" onClick={() => setOpen(false)}>
            <IconButton>
              <ToggleOffOutlined />
            </IconButton>
            Manual
          </ListItemButton>
          <ListItemButton component={Link} to="/history" onClick={() => setOpen(false)}>
            <IconButton>
              <History />
            </IconButton>
            History
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}