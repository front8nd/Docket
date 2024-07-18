import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageNotes from "./pages/ManageNotes";
import store from "./redux/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./Routes/protected";
import PublicRoute from "./Routes/public";
import Password from "./pages/Password";
import Email from "./pages/Email";
import { SnackbarProvider } from "./Hooks/useSnackbar";
function App() {
  return (
    <div className="scroll-smooth	">
      <SnackbarProvider>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<ProtectedRoute component={ManageNotes} />}
              ></Route>
              <Route
                path="/Login"
                element={<PublicRoute component={Login} />}
              ></Route>
              <Route
                path="/SignUp"
                element={<PublicRoute component={SignUp} />}
              ></Route>
              <Route
                path="/UpdatePassword"
                element={<ProtectedRoute component={Password} />}
              ></Route>
              <Route
                path="/UpdateEmail"
                element={<ProtectedRoute component={Email} />}
              ></Route>
            </Routes>
          </Router>
        </Provider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
