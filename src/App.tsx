import React from 'react';
import './App.css';
import { 
  AppBar,
  Button, 
  Container, 
  Toolbar,
  Box, 
  Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import AppRoutes from './routes/Routes';




function App() {

  return (
    <div className="App">
      <AppBar position='static'>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography>
                Test App
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <div >
              <Button 
                color="inherit" 
                component={Link} to="/" 
                sx={{ flexGrow: 1, display: { xs: "flex"} }}
              >
                Home
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <AppRoutes />
    </div>
  );
}

export default App;
