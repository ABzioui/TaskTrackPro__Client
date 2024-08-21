import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { themeSettings } from "theme";
import Layout from "scenes/layout";
import SignIn from "scenes/signin";
import Dashboard from "scenes/dashboard";
import MainLayout from "scenes/mainlayout";
import Admin from "scenes/admin";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Monthly from "scenes/monthly";
import Daily from "scenes/daily";
import Breakdown from "scenes/breakdown";
import Performance from "scenes/performance";
import Projects from "scenes/projects";
import Tasks from "scenes/tasks";
import TaskAssignment from "scenes/taskassignment";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuthenticated = useSelector((state) => state.global.token);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/*Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/signin" />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route
                path="/dashboard"
                element={<Navigate to="/page" replace />}
              />
              <Route path="/page" element={<Dashboard />} />
            </Route>*/}
            <Route path="/" element={<SignIn />} />
            <Route
              element={
                <AuthenticatedRoute isAuthenticated={isAuthenticated}>
                  <MainLayout />
                </AuthenticatedRoute>
              }
            >
              <Route
                path="/dashboard"
                element={<Navigate to="/page" replace />}
              />
              <Route path="/page" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/taskassignment" element={<TaskAssignment />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
