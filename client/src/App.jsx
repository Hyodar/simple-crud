
import React, { useState, useEffect } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./App.global.css";

import { toast, Toaster } from "react-hot-toast";

import { AppBar, ThemeProvider } from "@mui/material";
import { createTheme } from '@material-ui/core';
import { ptBR } from "@material-ui/core/locale";

import ParticipantScreen from "./components/ParticipantScreen";
import OccupationScreen from "./components/OccupationScreen";
import CompanyScreen from "./components/CompanyScreen";
import PresentationScreen from "./components/PresentationScreen";
import LoginScreen from "./components/LoginScreen";

import RequestHandler from "./utils/request_handler";

function AppMain(props) {
  const [mode, setMode] = useState("participantes");
  const [loggedIn, setLoggedIn] = useState(false);
  const theme = createTheme({}, ptBR);

  useEffect(() => {
    console.log(RequestHandler);
    if (RequestHandler.token) {
      setLoggedIn(true);
    }
  }, []);

  function showToast(msg) {
    toast(msg, {
      style: {
        borderRadius: "10px",
        background: "#ffffff33",
        color: "#fff",
        fontSize: "18px",
        backdropFilter: "blur(2px)"
      }
    });
  }

  const screens = {
    "participantes": <ParticipantScreen showToast={showToast} />,
    "ocupações": <OccupationScreen showToast={showToast} />,
    "empresas": <CompanyScreen showToast={showToast} />,
    "apresentações": <PresentationScreen showToast={showToast} />
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        { loggedIn &&
          <div>
            <AppBar color="transparent" elevation={0}>
              <h3 style={{ alignSelf: "center", fontWeight: "normal" }}>SGC - Sistema de Gerenciamento de Conferências</h3>
              <Tabs centered value={mode} onChange={(ev, newVal) => setMode(newVal)}>
                {
                  Object.keys(screens).map((screen, idx) => <Tab value={screen} label={screen} key={idx} />)
                }
              </Tabs>
            </AppBar>
            <div>
              {
                screens[mode]
              }
            </div>
          </div>
        }
        {
          !loggedIn &&
          <div>
            <h3 style={{ alignSelf: "center", fontWeight: "normal", color: "white" }}>SGC - Sistema de Gerenciamento de Conferências</h3>
            <LoginScreen onLogin={() => setLoggedIn(true)} showToast={showToast} />
          </div>
        }
      </div>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<AppMain />} />
        </Routes>
      </Router>
    </div>
  );
}
