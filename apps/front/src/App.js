import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Switch from "react-switch";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import { Button, Pane, Text, majorScale, toaster } from 'evergreen-ui'
import Registration from './pages/Registration';
import LogIn from './pages/LogIn';
import Hi from './pages/Hi';

const handleFieldChange = (fieldName, value, setUserInfo, userInfo) => {
  setUserInfo({...userInfo, [fieldName]: value}) // ...userInfo -> copie de userInfo
}

function App() {
  return (
    <Router>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/logIn">LogIn</Link>
      </div>
      
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/Hi" element={<Hi />} />
      </Routes>
    </Router>
  );
}

export default App;