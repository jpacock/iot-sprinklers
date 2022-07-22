
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Typography
 } from '@mui/material';
 import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import ControlPanel from './components/ControlPanel';
import Schedule from './pages/Schedule/Schedule'

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#546e7a',
    },
  },
});

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <Box p={2} role="presentation" >
            Schedule
          </Box>
        </Drawer>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsDrawerOpen(true)}
            > 
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sprinkler UI
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Router>
          <Switch>
            <Route path="/" exact component={Schedule} />
            <Route path="/manual" exact component={ControlPanel} />
            <Route path="/schedule" exact component={Schedule} />
          </Switch>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
