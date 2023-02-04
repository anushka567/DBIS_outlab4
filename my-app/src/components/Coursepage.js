import React, { useEffect, useState } from 'react';


import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const valid= sessionStorage.getItem('valid');  
  const  par  = useParams();
    let c_id = par.course_id;
 const [coursedata,setcoursedata] = useState("")
 const [courseVenue,setcoursevenue] = useState("")
 const [courseinstr,setcourseinstr] = useState("")
  useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3000/courseinfo/${c_id}`,{
          method: 'GET',     
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
        const response = await fetch(`http://localhost:3000/coursevenueinfo/${c_id}`,{
          method: 'GET',     
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          console.log(data)
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
        const response = await fetch(`http://localhost:3000/courseinstr/${c_id}`,{
          method: 'GET',     
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          console.log(data)
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
          <h1> Course info for {c_id} </h1>
          <ul>
            <li>{coursedata.title}</li>
            <li>{coursedata.credits}</li>
            <li>{coursedata.dept_name}</li>
            <li>Venue 
                
                <ul>
                    {Object.values(courseVenue).map(item => (<li>{item.building} </li>))}
                </ul>
                
                </li>
            <li>Instructors
                
                <ul>
                    {Object.values(courseinstr).map(item => (<li>{item.name} </li>))}
                </ul>
                
                </li>    


          </ul>

          
         
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );


}


export default CoursePage;