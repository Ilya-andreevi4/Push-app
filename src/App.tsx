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
import { useAppDispatch, useAuth } from './app/hooks/hooks';
import AppRoutes from './routes/Routes';
import { removeUser } from './app/store/reducers/UserSlice';


function App() {
  
  const {isAuth, email} = useAuth();

  const dispatch = useAppDispatch();

  return isAuth ? (
    <div className="App">
      <AppBar position='static'>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography>
                My Test App
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Grid container spacing={1} >
              <Grid item xs={1}>
                <Button 
                  color="inherit" 
                  component={Link} to="/" 
                  sx={{ flexGrow: 1, display: { xs: "flex"} }}
                >
                  Home
                </Button>
                <Button 
                  color="inherit" 
                  onClick={()=> dispatch(removeUser())} 
                  sx={{ flexGrow: 1, display: { xs: "flex"} }}
                >
                  Log out from {email}
                </Button>
              </Grid>
              <Grid item xs={9}>

              </Grid>
              
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <AppRoutes />
    </div>
  ):(
    <div className="App">
      <AppBar position='static'>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography>
                My Test App
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <Button 
                  color="inherit" 
                  component={Link} to="/" 
                  sx={{ flexGrow: 1, display: { xs: "flex"} }}
                >
                  Home
                </Button>
              </Grid>
              <Grid item xs={9}>

              </Grid>
              
              <Grid item xs={1}>
                <Button 
                  color="inherit" 
                  component={Link} to="/reg" 
                  sx={{ flexGrow: 1, display: { xs: "flex"} }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={1}>
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
      <AppRoutes/>
    </div>
  )
}

export default App;
