import React, { useEffect, useState } from 'react';
import {Card ,Row,Col,Table} from 'react-bootstrap';

import { useParams ,Link} from 'react-router-dom';




const CoursePage = () => {
  const valid= sessionStorage.getItem('valid');  
  const  par  = useParams();
  let c_id = par.course_id;
 const [coursedata,setcoursedata] = useState("")
 const [courseVenue,setcoursevenue] = useState("")
 const [courseinstr,setcourseinstr] = useState("")
 const [courseprereq,setcourseprereq] = useState("")
  useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3001/courseinfo/${c_id}`,{
          method: 'GET', 
          credentials:'include',      
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          console.log(data[0])
          setcoursedata(data[0])
          
  
        } else {
          setcoursedata("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
},[c_id]);


useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3001/coursevenueinfo/${c_id}`,{
          method: 'GET', 
          credentials:'include',      
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          //console.log(data)
          setcoursevenue(data)
          
  
        } else {
            setcoursevenue("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
},[c_id]);
  

useEffect(()=>{ 
 
  (async () =>{
  try {
      const response = await fetch(`http://localhost:3001/courseprereqinfo/${c_id}`,{
        method: 'GET',  
        credentials:'include',     
      });
      //onsole.log("what")
      const data = await response.json();
      if (data) {
        //console.log(data[0])
        //console.log(data)
        setcourseprereq(data)
        

      } else {
          setcourseprereq("Could not retrieve information")
      }
    }catch(error){
      console.log(error.message)
    }
})();
},[c_id]);

useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3001/courseinstr/${c_id}`,{
          method: 'GET', 
          credentials:'include',      
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          //console.log(data)
          setcourseinstr(data)
          
  
        } else {
            setcourseinstr("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
},[c_id]);
  
  return (

    <div>
      {valid ? (
        <div>
{/* <Table striped bordered hover variant="dark">
<thead>
  <tr>
    <th class="text-center"><Link to="/home">Home</Link></th>
    <th class="text-center"><Link to="/course/running">Running Courses</Link></th>
    <th class="text-center"><Link to="/home/registration">Registration</Link></th>
    
  </tr>
</thead>
</Table> */}
          
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Course ID</th>
          <th>{c_id}</th>
          <th>Course Title</th>
          <th>{coursedata.title}</th>
          <th>Credits</th>
          <th>{coursedata.credits}</th>
          <th>Department</th>
          <th>{coursedata.dept_name}</th>
         
          
        </tr>
      </thead>
      
    </Table>
          
          
          

            <div class="mx-auto" id='coursepage-body'> 

            <h4>Venue </h4>
               <div>
               {Object.keys(courseVenue).length ? ( <ul class="list-group list-group-flush">
                    {Object.values(courseVenue).map(item => (<li class="list-group-item">
                      
                      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Section ID </th>
          <th>{item.sec_id}</th>
          <th>Building</th>
          <th>{item.building}</th>
          <th>Classroom</th>
          <th>{item.room_number}</th>
     
          
        </tr>
      </thead>
      </Table>
                      </li>))}
                </ul>
                ):( <p  class="list-group-item">  No venue for this course this semester</p>)}</div> 
                
                
                
            <br></br>
             <h4>Instructors</h4>
                {Object.keys(courseinstr).length ? (
                  
                  
                  
                  
                  
                  
                  <Row>
                    {Object.values(courseinstr).map(item => (
                     <Col xs={6} md={3} key={item.course_id}>
                     <Card>
                       <Card.Body>
                       <div class="card-body d-flex justify-content-between">
                 <h5 class="card-title">
                 <Link to={`/instructor/${item.id}`}>{item.name}  </Link>
                   </h5>
                 <h5 class="card-title"> S :  {item.sec_id}</h5>
                 </div>
                      
                         <Card.Text>{item.title}</Card.Text>
                         <Card.Img variant="top" src={process.env.PUBLIC_URL + '/teacher-logo.jpg'}  />
                       </Card.Body>
                     </Card>
                   </Col> 
                   
                       
                       
                    ))}
                </Row>
                ):( <p class="list-group-item">  No instructor taking this course this semester</p>)}
               
                 
              <br></br>
              
              <h4> Prerequisites</h4> 

                {Object.keys(courseprereq).length ? (
                    <Row>
                    {Object.values(courseprereq).map(item => (
                       <Col xs={6} md={3} key={item.prereq_id}>
                    <Card >
                      <Card.Body>
                       
                        <Card.Title>
                        <Link to={`/course/${item.prereq_id}`}>{item.prereq_id}</Link>
                        </Card.Title>
                        
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/prereq-logo.jpg'} />
                        
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
                  
                  
                  // <ul>
                  //   {Object.values(courseprereq).map(item => (
                  //   <li >
                  //     <Link to={`/course/${item.prereq_id}`}>{item.prereq_id}</Link>
                  //      </li>
                  //   ))}
                
                ):( <p class="list-group-item">  None </p>)}
                </div>
               
                   


          

          
         
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );


}


export default CoursePage;