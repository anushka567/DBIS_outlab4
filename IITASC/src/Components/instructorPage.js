import React, { useEffect, useState } from 'react';
import {Card ,Row,Col,Table} from 'react-bootstrap';

import { useParams ,Link } from 'react-router-dom';
const book_logo=require('../Assets/book-logo.png')
const faded_book_logo=require('../Assets/faded-book-logo.png')
const InstructorPage = () => {
  const valid= sessionStorage.getItem('valid');  
  const  par  = useParams();
  let i_id = par.instructor_id;
  const [curr_course,setCurr_course]=useState("")
  const [prev_course,setPrev_course]=useState("")
  const [instrInfo,setInstrInfo]=useState("")

  useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3001/instrinfo/${i_id}`,{
          method: 'GET', 
          credentials:'include',      
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          console.log(data[0])
          setInstrInfo(data[0])
          
  
        } else {
            setInstrInfo("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
},[i_id]);

useEffect(()=>{ 
 
  (async () =>{
  try {
      const response = await fetch(`http://localhost:3001/instrcurrinfo/${i_id}`,{
        method: 'GET', 
        credentials:'include',      
      });
      //onsole.log("what")
      const data = await response.json();
      if (data) {
        //console.log(data[0])
        console.log(data)
        setCurr_course(data)
        

      } else {
        setCurr_course("Could not retrieve information")
      }
    }catch(error){
      console.log(error.message)
    }
})();
},[i_id]);

useEffect(()=>{ 
 
  (async () =>{
  try {
      const response = await fetch(`http://localhost:3001/instrprevinfo/${i_id}`,{
        method: 'GET', 
        credentials:'include',      
      });
      //onsole.log("what")
      const data = await response.json();
      if (data) {
        //console.log(data[0])
        console.log(data)
        setPrev_course(data)
        

      } else {
        setPrev_course("Could not retrieve information")
      }
    }catch(error){
      console.log(error.message)
    }
})();
},[i_id]);

  
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
          <th>Instructor ID</th>
          <th>{i_id}</th>
          <th>Name</th>
          <th>{instrInfo.name}</th>
          <th>Department</th>
          <th>{instrInfo.dept_name}</th>
         
          
        </tr>
      </thead>
      
    </Table>
         <div id="instr-body">
          <div>
            <h3> Current Courses</h3>

            {Object.keys(curr_course).length ? (
                    <Row>
                    {Object.values(curr_course).map(item => (
                       <Col xs={6} md={3} key={item.course_id}>
                    <Card >
                      <Card.Body>
                       
                        <Card.Title>
                        <Link to={`/course/${item.course_id}`}>{item.course_id}  </Link>
                        </Card.Title>
                        <Card.Text>{item.title}</Card.Text>
                        
                        <Card.Img variant="top" src={book_logo} />
                        
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
                  
                  
               
                
                ):( <p class="list-group-item">  None </p>)}
          </div>



                      <br></br>
           <div>


           <h3> Previous Courses</h3>

           {Object.keys(prev_course).length ? (
                    <Row>
                    {Object.values(prev_course).map(item => (
                       <Col xs={6} md={3} key={item.course_id}>
                    <Card >
                      <Card.Body>
                       
                        <Card.Title>
                        <Link to={`/course/${item.course_id}`}>{item.course_id}  </Link>
                        </Card.Title>
                        <Card.Text>{item.title}</Card.Text>
                        
                        <Card.Img variant="top" src={faded_book_logo} />
                        
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
                  
                  
               
                
                ):( <p class="list-group-item">  None </p>)}
           </div> 
           </div>
         
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );


}


export default InstructorPage;