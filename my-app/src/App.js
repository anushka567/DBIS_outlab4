import React, { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route,Link  } from "react-router-dom";
import {Table} from "react-bootstrap";
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

  function LogoutButton() {
    
      // Make a request to the logout endpoint
      console.log("clickes")
        fetch(`http://localhost:3001/logout`,{
            method: 'GET',
            credentials:'include',       
          })
        .then(() => {
          // Redirect the user to the login page
          sessionStorage.clear()
          window.location.href = '/home';
          
        })
        .catch((err) => {
          // Handle the error
          console.log(err)
        });
    };
  
    // return (
    //   <button onClick={logout}>Logout</button>
    // );
  

  async function handleLogout  () {
    
     
        try{ 
         const response=await fetch(`http://localhost:3001/logout`,{
            method: 'GET',
            credentials:'include',       
          });
          console.log("HI")

          if(response.message==="Logout Successful"){
            sessionStorage.clear()
   
            console.log(sessionStorage.getItem('valid'))
            window.location.href='/' 
            
          }else{
            console.log("Could not Logout")
          }
          
         
        }catch(error){
          console.log("herererer")
          console.log(error.message)
        }
  
  
  } 
 
 


  return (
    <BrowserRouter>
    <div>
    {/* <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th class="text-center"><Link to="/home">Home</Link></th>
          <th class="text-center"><Link to="/course/running">Running Courses</Link></th>
          <th class="text-center"><Link to="/home/registration">Registration</Link></th>
          <button class='btn btn-danger' onClick={handleLogout}>Logout</button>
        </tr>
      </thead>
      </Table> */}
      <button  onClick={LogoutButton}>Logout</button>
    </div>
    <Routes>
      <Route path="/" element ={<Dashboard /> }/>
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