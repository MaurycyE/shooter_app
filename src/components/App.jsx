import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";
import MainMenu from "./MainMenu.jsx";
import UserSettings from "./UserSettings.jsx";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idLoggedUser, setIdLoggedUser] = useState("");
  //console.log(isLoggedIn);

  return (
    <div>

      <Router>
        <Routes>

          <Route path="/" element={
            isLoggedIn ? <Navigate to="/mainMenu" /> : <LoginForm setIsLoggedIn={setIsLoggedIn}
              setIdLoggedUser={setIdLoggedUser} />
          } />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mainMenu" element={
            isLoggedIn ? <MainMenu setIsLoggedIn={setIsLoggedIn}
              idLoggedUser={idLoggedUser} /> : <Navigate to="/" />
          } />
          <Route path="/settings" element={
            isLoggedIn ? <UserSettings setIsLoggedIn={setIsLoggedIn} idLoggedUser={idLoggedUser} /> : <Navigate to="/" />
          } />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
