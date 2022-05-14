import React from 'react';
import './App.css';
import { 
  AppBar,
  Button,
  Typography,
  Grid,
  ButtonGroup} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAuth } from './app/hooks/hooks';
import AppRoutes from './routes/Routes';
import { removeUser } from './app/store/reducers/UserSlice';


function App() {
  
  const {isAuth, email} = useAuth();

  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <AppBar position='static'>
        <Grid container className='AppBar' maxWidth="xl" spacing={1}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={1}>
            <Typography variant='h5' gutterBottom>
                My App
            </Typography>
          </Grid>
          <Grid item xs={1}>
              <Button 
                color="inherit" 
                component={Link} to="/" 
                sx={{ flexGrow: 1, display: { xs: "flex"} }}
              >
                Main
              </Button>
            </Grid>
            <Grid item xs={7}/>
            { !isAuth ? (
                <Grid item xs={2}>
                  <ButtonGroup disableElevation variant="contained">
                    <Button 
                      component={Link} to="/reg" 
                    >
                      Sign Up
                    </Button>
                    <Button 
                      component={Link} to="/log" 
                    >
                      Log In
                    </Button>
                  </ButtonGroup>
                </Grid>
              ):(
                <Grid item xs={1}>
                  <Button 
                    color="inherit" 
                    onClick={()=> dispatch(removeUser())} 
                    sx={{ flexGrow: 1, display: { xs: "flex"} }}
                  >
                    Log out from {email}
                  </Button>
                </Grid>
              )}
        </Grid>
      </AppBar>
      <AppRoutes/>
    </div>  
  )
}

export default App;
