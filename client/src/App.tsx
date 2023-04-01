
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  Routes
} from 'react-router-dom';

import './App.css';

import { Sidebar } from './components/Sidebar/Sidebar';
import { 
  History,
  Manual,
  RunOnce,
  Schedule,
} from './pages';

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
        <Router>
          <Box sx={{ flexGrow: 1 }}>
            <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
              <Box p={2} role="presentation" >
                Schedule
              </Box>
            </Drawer>
            <AppBar position="static">
              <Toolbar>
                <Sidebar />
                <Box sx={{margin: "10px"}}>
                  <FontAwesomeIcon icon={faDroplet}/>
                </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sprinkler UI
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
        
          <Routes>
            <Route path="/" element={<Schedule />} />
            <Route path="/history" element={<History />} />
            <Route path="/manual" element={<Manual />} />
            <Route path="/run-once" element={<RunOnce />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
