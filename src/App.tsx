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
import { getMessaging, getToken } from "firebase/messaging";

function App() {
  const { user, logOut } = useUserAuth();
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
      var url = "https://fcm.googleapis.com/v1/projects/test-e97df"; // адрес скрипта на сервере который сохраняет ID устройства
      jQuery(function ($) {
        $.post(url, {
          token: currentToken,
        });
      });
      setTokenSentToServer(currentToken);
    } else {
      console.log("Токен уже отправлен на сервер.");
    }
  }
  getToken(messaging, {
    vapidKey:
      "BMe3lq08yT-UDNxnrAQfnL1nroniS30iZ_uxjf8oSnmvSVbgWW7HacH7Gp3c43AVTGOKxCXnRsN6kY1dX58RiQE",
  })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log("token: ", currentToken);
        sendTokenToServer(currentToken);
        // ...
      } else {
        requestPermission();
        // ...
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

  window.addEventListener('load', async ()=> {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(reg) {
        // регистрация сработала
      }).catch(function(error) {
        // регистрация прошла неудачно
        console.log('Registration failed with ' + error);
      });
    };
  })
  
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
