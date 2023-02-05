import React,{useState,useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams ,Link } from 'react-router-dom';


const DeptAllCourses = () => {
  const valid=sessionStorage.getItem('valid')
  const [allCoursebydept,setallCoursebyDept] =useState("")
  const  par  = useParams();
  let dept = par.dept_name;


useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3001/dept/${dept}`,{
          method: 'GET',     
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          console.log(data)
          setallCoursebyDept(data)
          
  
        } else {
          setallCoursebyDept("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
  },[dept]);
  

  return (

    <div>
      {valid ? (
        <div>
           <div class="justify-content-center align-items-sm-right text-light bg-dark">
        <h2 class="font-monospace "> List of courses running under {dept} department </h2></div>

        <div id="cud-inner">
          {Object.keys(allCoursebydept).length ? ( 
          <ListGroup>
                    {Object.values(allCoursebydept).map(item => (
                    <ListGroupItem >
                      <Link to={`/course/${item.course_id}`}>{item.course_id}  {item.title}</Link>
                       </ListGroupItem>
                    ))}
                </ListGroup>
                ):(
                  <h6>None</h6>)}
         </div>
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );
};

export default DeptAllCourses;