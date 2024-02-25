import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";
import MainMenu from "./MainMenu.jsx";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  return (
    <div>

      <Router>
        <Routes>

          {/* <Route path="/" exact element={<LoginForm />} /> */}
          <Route path="/" element={
            isLoggedIn ? <Navigate to="/mainMenu" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />
          } />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mainMenu" element={
            isLoggedIn ? <MainMenu setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />
          } />
          {/* <Route path="/mainMenu" element={<MainMenu />} /> */}

        </Routes>
      </Router>

    </div>
  );
}

export default App;
