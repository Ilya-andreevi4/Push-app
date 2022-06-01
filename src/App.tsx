import React from "react";
import "./App.css";
import {
  AppBar,
  Button,
  Typography,
  Grid,
  ButtonGroup,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { useUserAuth } from "./services/provider/AuthProvider";

function App() {
  const { user, logOut } = useUserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const matches = useMediaQuery("(max-width:767px)");


  return (
    <div className="App">
      {matches ? (
        <AppBar position="fixed">
          <Stack
            className="AppBar"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            pl={1}
            pr={1}
          >
            <Grid item xs={12}>
              <Typography
                variant="button"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontWeight: 800,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Push App
              </Typography>
            </Grid>
            {!user ? (
              <Grid item xs={12}>
                <ButtonGroup
                  disableElevation
                  size="small"
                  color="secondary"
                  variant="contained"
                >
                  <Button component={Link} to="/reg">
                    Регистрация
                  </Button>
                  <Button component={Link} to="/log">
                    Войти
                  </Button>
                </ButtonGroup>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Button color="secondary" onClick={handleLogOut}>
                  Выйти из {user.email}
                </Button>
              </Grid>
            )}
          </Stack>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Stack
            className="AppBar"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            pl={3}
            pr={3}
          >
            <Grid item xs={12}>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontWeight: 600,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Push App
              </Typography>
            </Grid>
            {!user ? (
              <Grid item xs={12}>
                <ButtonGroup
                  disableElevation
                  color="secondary"
                  variant="contained"
                >
                  <Button component={Link} to="/reg">
                    Регистрация
                  </Button>
                  <Button component={Link} to="/log">
                    Войти
                  </Button>
                </ButtonGroup>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Button color="secondary" onClick={handleLogOut}>
                  Выйти из {user.email}
                </Button>
              </Grid>
            )}
          </Stack>
        </AppBar>
      )}
      <AppRoutes />
    </div>
  );
}

export default App;
