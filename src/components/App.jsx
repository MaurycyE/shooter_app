import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";
import MainMenu from "./MainMenu.jsx";

function App() {

  return (
    <div>

      <Router>
        <Routes>

          <Route path="/" exact element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mainMenu" element={<MainMenu />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
