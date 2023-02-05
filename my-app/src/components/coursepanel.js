import React, { useState, useEffect } from 'react';

// course panel
const CoursePanel =({course_id})=> {
    const valid=sessionStorage.getItem('valid')
    const id=sessionStorage.getItem('user')
    const [c_details,setc_details]=useState("")
  
     
    async function  register_course(course_id,sec_id){
        //console.log(course_id)
        try {          
           
            const response = await fetch(`http://localhost:3001/registercourse/${id}/${course_id}/${sec_id}`,{
              method: 'PUT',     
            });
            
            const data = await response.json();
           
            if (data.message) {         
              console.log(data.message)
 
            } else {
                console.log(data)
    
            }
          }catch(error){
            console.log(error.message)
          }
    
    
    }



    useEffect(()=>{ 
   
      (async () =>{
      try {
          
   
          const response = await fetch(`http://localhost:3001/courseExtraInfo/${course_id}`,{
            method: 'GET',     
          });
          
          const data = await response.json();
          if (data) {
            console.log(data)
            setc_details(data)
            
    
          } else {
            setc_details("Could not retrieve information")
          }
        }catch(error){
          console.log(error.message)
        }
    })();
  },[course_id]);
  
  
    return (
  
  
  
  
      <div>
         {valid ? (
         <div>
          
          
          {Object.keys(c_details).length ?  (
                 <ul>
                 {Object.values(c_details).map(item => (<li>{item.course_id} {item.title} SECTION:{item.sec_id}    <button onClick={()=> register_course(item.course_id,item.sec_id)}>Register</button></li>))}
             </ul>
                    ) : (
                      <p> No course detail available</p>
                    )}
           
         
          </div>
         ) : (
           window.location.href='/'
         )}
    </div>
  );
  };


  export default CoursePanel;