import React from 'react';
import './App.css';
import { 
  AppBar,
  Button,
  Typography,
  Grid,
  ButtonGroup} from '@mui/material';
import { Link} from 'react-router-dom';
import AppRoutes from './routes/Routes';
import { useUserAuth } from './services/provider/AuthProvider';


function App() {

  const { user, logOut } = useUserAuth();
  const handleLogOut = async () => {
    try{
      await logOut();
    } catch (err: any) {
      console.log(err.message);
    }
  }
  
  return (
    <div className="App">
        <AppBar position='static'>
          <Grid container className='AppBar' maxWidth="xl" spacing={1}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={2}>
              <Button 
                size="small"
                color="inherit" 
                component={Link} to="/" 
                sx={{ flexGrow: 1, display: { xs: "flex"} }}
              >
                <Typography variant="h6">My App</Typography> 
              </Button>
            </Grid>
              <Grid item xs={7}/>
                {!user ? (
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
                  <Grid item xs={2}>
                    <Button 
                      color="inherit" 
                      onClick={handleLogOut} 
                      sx={{ flexGrow: 1, display: { xs: "flex"} }}
                    >
                      Log out from {user.email}
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
