import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CoursePage from './components/Coursepage';
import InstructorPage from './components/instructorPage';
import Department from './components/CourseOfferingDepartment';
import DeptAllCourses from './components/DepartmentCourses';
import Registration from './components/registration';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = (username) => {
    sessionStorage.setItem('valid',true);
    // setIsLoggedIn(true);  
    setUser({ username });
 
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login"  element={<Login handleLogin={handleLogin}/>} />
      <Route path="/home"  element={<Home username={user} />}/>
      <Route path="/home/registration"  element={<Registration />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course/:course_id" element={<CoursePage />} />
      <Route path="/course/running" element={<Department />} />
      <Route path="/course/running/:dept_name" element={<DeptAllCourses />} />
      <Route path="/instructor/:instructor_id" element={<InstructorPage />} />

      </Routes>
    </BrowserRouter>
  );


};

export default App;