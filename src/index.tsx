import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './firebase';
import { UserAuthContextProvider } from './services/provider/AuthProvider';
import { getMessaging, getToken } from 'firebase/messaging';


const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme({
  palette:{
    primary: {
      main: '#e6e6e6'
    },
    secondary: {
      main: '#006ddb'
    }
  }
});

const messaging = getMessaging();

function isTokenSentToServer(currentToken:any) {
  return window.localStorage.getItem('sentFirebaseMessagingToken') === currentToken;
}

function setTokenSentToServer(currentToken:any) {
  window.localStorage.setItem(
      'sentFirebaseMessagingToken',
      currentToken ? currentToken : ''
  );
}

function sendTokenToServer(currentToken:any) {
  if (!isTokenSentToServer(currentToken)) {
      console.log('Отправка токена на сервер...');

      var url = 'https://fcm.googleapis.com/v1/projects/test-e97df/messages:send'; // адрес скрипта на сервере который сохраняет ID устройства
      $.post(url, {
          token: currentToken
      });
      setTokenSentToServer(currentToken);
  } else {
      console.log('Токен уже отправлен на сервер.');
  }
}
getToken(messaging, { vapidKey: 'BMe3lq08yT-UDNxnrAQfnL1nroniS30iZ_uxjf8oSnmvSVbgWW7HacH7Gp3c43AVTGOKxCXnRsN6kY1dX58RiQE' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log('token: ', currentToken);
    sendTokenToServer(currentToken);
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

root.render(
    <UserAuthContextProvider>
      <ThemeProvider theme={theme}>
          <Router>                 
            <App /> 
          </Router>
      </ThemeProvider>
    </UserAuthContextProvider>
);

