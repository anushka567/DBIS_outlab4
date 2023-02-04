import React, { useState } from 'react';
import { BrowserRouter, Routes, Route,Switch } from "react-router-dom";
import Login from './Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CoursePage from './components/Coursepage';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = (username) => {
    sessionStorage.setItem('valid',true);
    setIsLoggedIn(true);  
    setUser({ username });
 
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Login handleLogin={handleLogin}/>} />
      <Route path="/home"  element={<Home username={user} />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course/:course_id" element={<CoursePage />} />
      </Routes>
    </BrowserRouter>
  );


};

export default App;