import React from "react";
import "./App.css";
import { AppBar, Button, Typography, Grid, ButtonGroup, Stack } from "@mui/material";
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

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          // Успешная регистрация
          console.log("ServiceWorker registration successful");
        },
        function (err) {
          // При регистрации произошла ошибка
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }

  return (
    <div className="App">
      <AppBar position="fixed">
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
            <Button
              size="small"
              color="inherit"
              component={Link}
              to="/"
            >
              <Typography variant="h6">Push-Notification App</Typography>
            </Button>
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
              <Button
                color="secondary"
                onClick={handleLogOut}
              >
                Выйти из {user.email}
              </Button>
            </Grid>
          )}
        </Stack>
        {/* <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          
        </Grid> */}
      </AppBar>
      <AppRoutes />
    </div>
  );
}

export default App;
