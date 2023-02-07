import React, {   useEffect, useState } from 'react';
import {Card ,Row,Col,Button,Table} from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Home = () => {


  const user=sessionStorage.getItem('user');
  const valid= sessionStorage.getItem('valid');
  let reg_trigger = 0
  sessionStorage.setItem('reg-trigger',reg_trigger)  
  const [trigger,setTrigger]=useState(0)
  const [studentInfo,setStudentInfo]=useState("")
  const [courses,setCourses]=useState("")
  const [prevcourses,setPrevCourses]=useState("")
  
   let id=user; 
    
  useEffect(()=>{ 
 
    (async () =>{
    try {
        
        
       
       
        const response = await fetch(`http://localhost:3001/studentinfo/${id}`,{
          method: 'GET', 
          credentials:'include',  
        });
        console.log("what")
        const data = await response.json();
        if (data) {
          if (!data.message){
          setStudentInfo(data[0])
          }
  
        } else {
          setStudentInfo("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
},[id]);



useEffect(()=>{ 
 
    (async () =>{
    try {
        
        
       
       
        const response = await fetch(`http://localhost:3001/studentcourseinfo/${id}`,{
          method: 'GET',
          credentials:'include',       
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          setCourses(data)
          
  
        } else {
          setCourses("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
},[id,trigger,reg_trigger]);
  
useEffect(()=>{ 
 
    (async () =>{
    try {
        
        
       
       
        const response = await fetch(`http://localhost:3001/studentprevcourseinfo/${id}`,{
          method: 'GET', 
          credentials:'include',      
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          setPrevCourses(data)
          
  
        } else {
          setPrevCourses("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
},[id]);


async function  delete_course(course_id){
    //console.log(course_id)
    try {
        
        
       
       
        const response = await fetch(`http://localhost:3001/deletecourse/${id}/${course_id}`,{
          method: 'DELETE',
          credentials:'include',       
        });
        console.log("hahahah")
        const data = await response.json();
        console.log(data.message)
        if (data) {
          //console.log(data[0])

                setTrigger(!trigger)
          console.log(data.message)

          
  
        } else {
            console.log(data)

        }
      }catch(error){
        console.log("herererer")
        console.log(error.message)
      }


}

  return (
    

    <div class="justify-content-center" id="home-body">

      { valid ? (
       


        
        


        <div >
 
  
        

      
     <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th class="text-center"><Link to="/home">Home</Link></th>
          <th class="text-center"><Link to="/course/running">Running Courses</Link></th>
          <th class="text-center"><Link to="/home/registration">Registration</Link></th>
          
        </tr>
      </thead>
      </Table>

      

      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th >Student ID</th>
          <th>{user}</th>
          <th>Name</th>
          <th>{studentInfo.name}</th>
          <th>Department</th>
          <th>{studentInfo.dept_name}</th>
          <th>Total Credits</th>
          <th>{studentInfo.tot_cred}</th>
          
        </tr>
      </thead>
      
    </Table>
            
           
            

          <h5>Current Courses Undertaken</h5> 
        <div class="mx-md-n5" id="home-course">
          {Object.keys(courses).length ? (
              <Row>
            {Object.values(courses).map(item => (
               <Col xs={6} md={3} key={item.course_id}>
            <Card>
            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/book-logo.png'} />
              <Card.Body>
              <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255, 255, 0, 0.8)',
                    padding: '5px',
                    borderRadius: '2px',
                  }}
                >
                  <Card.Text>Credits:{item.credits} </Card.Text>
                </div>
                <div class="card-body d-flex justify-content-between">
                 <h5 class="card-title">
                 <Link to={`/course/${item.course_id}`}>{item.course_id}  </Link>
                   </h5>
                 <h5 class="card-title"> S : {item.sec_id}</h5>
                 </div>
               
                <Card.Text> {item.title} </Card.Text>
                <Button variant="danger float-right"  onClick={()=> delete_course(item.course_id)}>Drop</Button>
               
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
             ):(<p class="list-group-item"> Not enrolled in any ongoing course </p>)}

        </div>  

              <br></br>
             <h5>Previous Course details</h5>
                <br></br>  
            
            
            {Object.keys(prevcourses).length ? (
              <Row>
            {Object.values(prevcourses).map(item => (
               <Col xs={6} md={3} key={item.course_id}>
            <Card>
              <Card.Body>
               
                <Card.Title>
                <Link to={`/course/${item.course_id}`}>{item.course_id}  </Link> </Card.Title>
                <Card.Text>{item.title}</Card.Text>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + '/faded-book-logo.png'} />
                {/* <Card.Text>{item.credits} hahh</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
             ):(<p class="list-group-item">  No previous courses undertaken </p>)}
            
             

{/* 
            {Object.keys(prevcourses).length ? (
             <ul>
             {Object.values(prevcourses).map(item => (<li>
              
              {item.course_id} {item.title} {item.credits} {item.grade}
              </li>))}
         </ul>
              ) : (
                ( <p> No course detail available</p>))
               }  */}
            
            
            
           
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
    
  );
};

export default Home;