import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from "axios";
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";
import MainMenu from "./MainMenu.jsx";

const API_URL = "http://localhost:3001";


function App() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get(`${API_URL}/api/data`).then(response => {
      setData(response.data);
      console.log(response.data);
    })
      .catch(error => {
        console.error('Error fetching data', error);
      });

  }, []);

  return (
    <div>

      <h1>Data from PostgreSQL</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

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
