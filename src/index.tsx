import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store/store';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import './firebase';
import { UserAuthContextProvider } from './services/provider/AuthProvider';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore();
const theme = createTheme({
  palette:{
    primary: {
      main: '#e6e6e6'
    },
    secondary: {
      main: '#5ea9ff'
    }
  }
});

root.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>            
          <Router>                 
            <App /> 
          </Router>
        </ThemeProvider>
      </Provider>
    </UserAuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
