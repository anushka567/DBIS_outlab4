import React, { useState} from 'react';
import { BrowserRouter, Routes, Route,Link  } from "react-router-dom";
import Login from './Components/Login';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import CoursePage from './Components/Coursepage';
import InstructorPage from './Components/instructorPage';
import Department from './Components/CourseOfferingDepartment';
import DeptAllCourses from './Components/DepartmentCourses';
import Registration from './Components/registration';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const valid=sessionStorage.getItem('valid')


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
          window.location.href = '/login';
          
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
            window.location.href='/login' 
            
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
    {valid? (<div>
      {/* <Table striped bordered hover variant="dark">
<thead>
  <tr>
    <th class="text-center"></th>
    <th class="text-center"></th>
    <th class="text-center"></th>
    
  </tr>
</thead>
</Table> */}
<div class="d-flex justify-content-center bg-dark">
<div class="text-light"> <h5>IITASC</h5></div>
<hr></hr>
  <div> <h5><Link to="/home">Home</Link></h5></div>
  <hr></hr>
  <div> <h5><Link to="/course/running">Running Courses</Link></h5></div>
  <hr></hr>
  <div> <h5><Link to="/home/registration">Registration</Link></h5></div>
  <hr></hr>
  <div > <h5><button  class="btn btn-danger" onClick={LogoutButton}>Logout</button></h5></div>
  <hr></hr>
</div>
     
    
  </div>):(<h1 class="bg-dark text-light">IITASC</h1>)}
 
    
    <Routes>
      <Route path="/" element ={<Dashboard /> }/>
      <Route exact path="/login"  element={<Login handleLogin={handleLogin}/>} />
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