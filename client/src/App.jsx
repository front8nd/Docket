import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageNotes from "./pages/ManageNotes";
import store from "./redux/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <div className="scroll-smooth	">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ManageNotes />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
