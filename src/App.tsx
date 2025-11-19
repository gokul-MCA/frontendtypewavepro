import axios from "axios";
axios.defaults.withCredentials = true;

// -------------------most important

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/home/Home";

import Practice from "./pages/practice/Practice";
import Result from "./pages/practice/Result";
import PracticeLogic from "./pages/practice/PracticeLogic";

import Dashboard from "./pages/dashboard/Dashboard";
import LoginPractice from "./pages/dashboard/LoginPractice";
import LoginResult from "./pages/dashboard/LoginResult";
import PracticeSessionWrapper from "./pages/dashboard/PracticeSessionWrapper";

import { blue, grey, pink } from "@mui/material/colors";
import { ResultProvider } from "./context/ResultContext";
import AccountSettings from "./pages/dashboard/AccountSettings";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import AuthRedirect from "./components/AuthRedirect";
import Contact from "./pages/contact/Contact";

const App = () => {
  function NoFound() {
    return (
      <h2
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        404 - Page Not Found
      </h2>
    );
  }

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff", //white
      },
      secondary: {
        main: "#000", //black
      },
      error: {
        main: "#ff1744", //red
      },
      warning: {
        main: "#c2185b", //pink
      },
      info: {
        main: "#2196f3", // blue
      },
      success: {
        main: "#4caf50", //purple
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AuthProvider>
          <ResultProvider>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<NoFound />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/" element={<HomeLayout />}>
                  <Route
                    index
                    element={
                      <AuthRedirect
                        whenAuthenticated="/dashboard"
                        whenUnauthenticated={<Home />}
                      />
                    }
                  />
                </Route>

                <Route
                  path="/login"
                  element={
                    <AuthRedirect
                      whenAuthenticated="/dashboard"
                      whenUnauthenticated={<Login />}
                    />
                  }
                />

                <Route
                  path="/logout"
                  element={
                    <AuthRedirect
                      whenAuthenticated="/dashboard"
                      whenUnauthenticated={<Logout />}
                    />
                  }
                />

                {/* Practice Routes */}
                <Route path="/practice" element={<PracticeLogic />}>
                  <Route index element={<Practice />} />
                  <Route path="result" element={<Result />} />
                </Route>

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<ProtectedRoute />}>
                  <>
                    <Route index element={<Dashboard />} />

                    <Route
                      path="account-settings"
                      element={<AccountSettings />}
                    />

                    <Route
                      path="static-content-practice/:sessionId"
                      element={<PracticeSessionWrapper />}
                    >
                      <Route index element={<LoginPractice />} />
                      <Route path="result" element={<LoginResult />} />
                    </Route>

                    <Route
                      path="dynamic-content-practice/:sessionId"
                      element={<PracticeSessionWrapper />}
                    >
                      <Route index element={<LoginPractice />} />
                      <Route path="result" element={<LoginResult />} />
                    </Route>
                  </>
                </Route>
              </Routes>
            </BrowserRouter>
          </ResultProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
