import React from 'react';
import './App.css';
import { 
  AppBar,
  Button, 
  Container, 
  Toolbar,
  Box, 
  Typography,
  Grid} from '@mui/material';
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
            <Grid container spacing={3} >
              <Grid item xs={3}>
                <Button 
                  color="inherit" 
                  component={Link} to="/" 
                  sx={{ flexGrow: 1, display: { xs: "flex"} }}
                >
                  Home
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button 
                  color="inherit" 
                  component={Link} to="/reg" 
                  sx={{ flexGrow: 1, display: { xs: "flex"} }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button 
                  color="inherit" 
                  component={Link} to="/log" 
                  sx={{ flexGrow: 1, display: { xs: "flex"} }}
                >
                  Log In
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <AppRoutes />
    </div>
  );
}

export default App;
