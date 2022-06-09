import React, { useState } from "react";
import "./App.css";
import {
  AppBar,
  Button,
  Typography,
  Grid,
  ButtonGroup,
  Stack,
  useMediaQuery,
  Dialog,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { useUserAuth } from "./services/provider/AuthProvider";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";

function App() {
  const { user, logOut } = useUserAuth();
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const messaging = getMessaging();

  function isTokenSentToServer(currentToken: any) {
    return (
      window.localStorage.getItem("sentFirebaseMessagingToken") === currentToken
    );
  }

  function setTokenSentToServer(currentToken: any) {
    window.localStorage.setItem(
      "sentFirebaseMessagingToken",
      currentToken ? currentToken : ""
    );
  }

  function sendTokenToServer(currentToken: any) {
    if (!isTokenSentToServer(currentToken)) {
      axios.post(
        `https://firestore.googleapis.com/v1/projects/test-e97df/databases/userTokens`,
        { Authorization: `Bearer ${currentToken}` }
      ); // адрес скрипта на сервере который сохраняет ID устройства
      setTokenSentToServer(currentToken);
    } else {
      console.log("Токен уже отправлен на сервер.");
    }
  }
  getToken(messaging, {
    vapidKey:
      "BMe3lq08yT-UDNxnrAQfnL1nroniS30iZ_uxjf8oSnmvSVbgWW7HacH7Gp3c43AVTGOKxCXnRsN6kY1dX58RiQE",
  })
    .then(async (currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        try {
          setToken(currentToken);
          sendTokenToServer(currentToken);
        } catch (e) {
          console.log("An error occurred while retrieving token. ", e);
        }
      } else {
        requestPermission();
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });

  function requestPermission() {
    return new Promise(function (resolve, reject) {
      const permissionResult = Notification.requestPermission(function (
        result
      ) {
        // Поддержка устаревшей версии с функцией обратного вызова.
        resolve(result);
      });
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(function (permissionResult) {
      if (permissionResult !== "granted") {
        throw new Error("Permission not granted.");
      }
    });
  }

  window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (reg) {
          // регистрация сработала
        })
        .catch(function (error) {
          // регистрация прошла неудачно
          console.log("SW registration failed with: " + error);
        });
    }
  });

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
      {token && user && (
        <Box m={1}>
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            color="secondary"
          >
            Токен твоего девайса
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <Typography variant="subtitle1">
              Токен твоего девайса: {token}
            </Typography>
          </Dialog>
        </Box>
      )}
    </div>
  );
}

export default App;
