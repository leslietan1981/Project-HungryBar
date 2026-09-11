import "./index.css";
import App from "./App.tsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./theme/muiTheme.ts";

import { DeviceModeProvider } from "./context/DeviceModeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <DeviceModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DeviceModeProvider>
    </ThemeProvider>
  </StrictMode>,
);
