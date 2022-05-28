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
        <Grid 
          className='AppBar'
          container
          direction="row"
          justifyContent="space-around"
          alignItems="baseline"
        >
          <Grid item>
            <Button 
              size="small"
              color="inherit" 
              component={Link} to="/" 
              sx={{ flexGrow: 1, display: { xs: "flex"} }}
            >
              <Typography variant="h6">Push-Notification App</Typography> 
            </Button>
          </Grid>
            <Grid item />
              {!user ? (
                <Grid item>
                  <ButtonGroup 
                    disableElevation 
                    color="secondary" 
                    variant="contained"
                  >
                    <Button 
                      component={Link} to="/reg" 
                    >
                      Регистрация
                    </Button>
                    <Button 
                      component={Link} to="/log" 
                    >
                      Войти
                    </Button>
                  </ButtonGroup>
                </Grid>
              ):(
                <Grid item>
                  <Button 
                    color="secondary" 
                    onClick={handleLogOut} 
                    sx={{ flexGrow: 1, display: { xs: "flex"} }}
                  >
                    Выйти из аккаунта {user.email}
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
