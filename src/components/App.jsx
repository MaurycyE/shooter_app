import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" exact element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

      </Routes>
    </Router>

  );
}

export default App;
