import React, { useEffect, useState } from 'react';

const Home = () => {


  const user=sessionStorage.getItem('user');
  const valid= sessionStorage.getItem('valid');  
  const [trigger,setTrigger]=useState(0)
  const [studentInfo,setStudentInfo]=useState("")
  const [courses,setCourses]=useState("")
  const [prevcourses,setPrevCourses]=useState("")
  
   let id=user; 
    
  useEffect(()=>{ 
 
    (async () =>{
    try {
        
        
       
       
        const response = await fetch(`http://localhost:3000/studentinfo/${id}`,{
          method: 'GET',     
        });
        console.log("what")
        const data = await response.json();
        if (data) {
    
          setStudentInfo(data[0])
          
  
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
        
        
       
       
        const response = await fetch(`http://localhost:3000/studentcourseinfo/${id}`,{
          method: 'GET',     
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
},[id,trigger]);
  
useEffect(()=>{ 
 
    (async () =>{
    try {
        
        
       
       
        const response = await fetch(`http://localhost:3000/studentprevcourseinfo/${id}`,{
          method: 'GET',     
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
        
        
       
       
        const response = await fetch(`http://localhost:3000/deletecourse/${id}/${course_id}`,{
          method: 'DELETE',     
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
    <div>
      { valid ? (
        <div>
          <h1>Welcome, {user} !</h1>
          <p>Details:</p>
            <p> {studentInfo.name}</p>
            <p>{studentInfo.dept_name}</p>
            <p>{studentInfo.tot_cred}</p>

          <p>Course details</p> 

          {Object.keys(courses).length ?  (
               <ul>
               {Object.values(courses).map(item => (<li>{item.course_id} {item.sec_id} {item.title} {item.credits}   <button onClick={()=> delete_course(item.course_id)}>Drop</button></li>))}
           </ul>
                  ) : (
                    <p> No course detail available</p>
                  )}
             <p>Previous Course details</p>
            {Object.keys(prevcourses).length ? (
             <ul>
             {Object.values(prevcourses).map(item => (<li>{item.course_id} {item.title} {item.credits} {item.grade}</li>))}
         </ul>
              ) : (
                ( <p> No course detail available</p>))
               } 
            
            
            
           
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );
};

export default Home;