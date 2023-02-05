import React,{useState,useEffect} from 'react';
import { useParams ,Link } from 'react-router-dom';

const DeptAllCourses = () => {
  const valid=sessionStorage.getItem('valid')
  const [allCoursebydept,setallCoursebyDept] =useState("")
  const  par  = useParams();
  let dept = par.dept_name;


useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3000/dept/${dept}`,{
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
          <h1>List of courses running under {dept} department </h1>
          {Object.keys(allCoursebydept).length ? ( 
          <ul>
                    {Object.values(allCoursebydept).map(item => (
                    <li >
                      <Link to={`/course/${item.course_id}`}>{item.course_id}  {item.title}</Link>
                       </li>
                    ))}
                </ul>
                ):(
                  <h6>None</h6>)}
         
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );
};

export default DeptAllCourses;