import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./firebase";
import { UserAuthContextProvider } from "./services/provider/AuthProvider";
import { blue, green} from "@mui/material/colors";

const container = document.getElementById("root")!;
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: {main:green[600]},
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
