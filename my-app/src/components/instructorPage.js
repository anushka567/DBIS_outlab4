import React, { useEffect, useState } from 'react';


import { useParams ,Link } from 'react-router-dom';

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
        const response = await fetch(`http://localhost:3000/instrinfo/${i_id}`,{
          method: 'GET',     
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
      const response = await fetch(`http://localhost:3000/instrcurrinfo/${i_id}`,{
        method: 'GET',     
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
      const response = await fetch(`http://localhost:3000/instrprevinfo/${i_id}`,{
        method: 'GET',     
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
          <h1> Instructor info for {i_id} </h1>
          <p> NAME : {instrInfo.name}</p>
          <p> DEPT_NAME: {instrInfo.dept_name}</p>
          <div>
            <h3> Current Courses</h3>
          {Object.keys(curr_course).length ? ( 
          <ul>
                    {Object.values(curr_course).map(item => (
                    <li >
                      <Link to={`/course/${item.course_id}`}>{item.course_id}  {item.title}</Link>
                       </li>
                    ))}
                </ul>
                ):(
                  <h6>None</h6>)}
           </div>   

           <div>
           <h3> Previous Courses</h3>

          {Object.keys(prev_course).length ? ( 
          <ul>
                    {Object.values(prev_course).map(item => (
                    <li >
                      {item.course_id}  {item.title}
                       </li>
                    ))}
                </ul>
                ):( <h6>None</h6>)}
           </div> 
         
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );


}


export default InstructorPage;