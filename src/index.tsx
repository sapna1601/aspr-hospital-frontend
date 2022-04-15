import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./config/firebase";
import HospitalManagement from "./routes/index";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider, UtilityProvider } from "src/providers";
import { ThemeProvider as MUIThemeProvider } from "@material-ui/core";
import MuiTheme from "src/config/MUITheme";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <MUIThemeProvider theme={MuiTheme}>
    <ThemeProvider theme={{}}>
      <RecoilRoot>
        <Router>
          <UtilityProvider>
            <AuthProvider>
              <React.StrictMode>
                <HospitalManagement />
              </React.StrictMode>
            </AuthProvider>
          </UtilityProvider>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  </MUIThemeProvider>,
  document.getElementById("root")
);
