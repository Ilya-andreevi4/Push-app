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
    secondary: {main: "#C2F235"},
    primary: {main: "#FFF638"},
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
