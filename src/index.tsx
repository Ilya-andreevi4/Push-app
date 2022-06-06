import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./firebase";
import { UserAuthContextProvider } from "./services/provider/AuthProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: {
      main: "#6884bd",
      contrastText: "#fff",
    },
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
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
