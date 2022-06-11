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

const App: React.FC = () => {
  const { user, logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const mobIfc = useMediaQuery("(max-width:745px)");

  return (
    <div className="App">
      {mobIfc ? (
        <AppBar position="fixed" className="AppBar">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            pl={1}
            pr={1}
          >
            <Grid>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Push App
              </Typography>
            </Grid>
            {!user ? (
              <Grid>
                <ButtonGroup size="small" color="primary" variant="contained">
                  <Button component={Link} to="/reg">
                    Регистрация
                  </Button>
                  <Button component={Link} to="/log">
                    Войти
                  </Button>
                </ButtonGroup>
              </Grid>
            ) : (
              <Grid>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleLogOut}
                >
                  Выйти из {user.email}
                </Button>
              </Grid>
            )}
          </Stack>
        </AppBar>
      ) : (
        <AppBar position="static" className="AppBar">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            pl={3}
            pr={3}
          >
            <Grid>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Push App
              </Typography>
            </Grid>
            {!user ? (
              <Grid>
                <ButtonGroup color="primary" variant="contained">
                  <Button component={Link} to="/reg">
                    Регистрация
                  </Button>
                  <Button component={Link} to="/log">
                    Войти
                  </Button>
                </ButtonGroup>
              </Grid>
            ) : (
              <Grid>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleLogOut}
                >
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
