import React, { useState, useEffect } from 'react';

const Toast = ({ message, setShowToast }) => {
  setTimeout(() => {
    setShowToast(false);
  }, 500);
  return (
    <div style={{ background: "lightgrey", padding: "1rem" }}>
      {message}
    </div>
  );
};

// course panel
const CoursePanel =({course_id})=> {
    const valid=sessionStorage.getItem('valid')
    const id=sessionStorage.getItem('user')
    const [c_details,setc_details]=useState("")
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    
     
    async function  register_course(course_id,sec_id){
        //console.log(course_id)
        try {          
           
            const response = await fetch(`http://localhost:3001/registercourse/${id}/${course_id}/${sec_id}`,{
              method: 'PUT',  
              credentials:'include',     
            });
            console.log(response)
            const data = await response.json();
            console.log('bi')
            console.log(data)
            if(data.message){
            console.log(data.message)
            setMessage(data.message);
            setShowToast(true);
            }else{
              setMessage("what");
            setShowToast(true);
            }
           
            sessionStorage.setItem('reg-trigger',!sessionStorage.getItem('reg-trigger'))
          }catch(error){
            console.log(error.message)
          }
    
    
    }



    useEffect(()=>{ 
   
      (async () =>{
      try {
          
   
          const response = await fetch(`http://localhost:3001/courseExtraInfo/${course_id}`,{
            method: 'GET',
            credentials:'include',       
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
                 {Object.values(c_details).map(item => (<li class="list-group-item">
                  <div class="d-flex">
                    <div>  {item.course_id}</div>
                    <div>  {item.title}</div>
                    <div> SECTION:{item.sec_id}  </div>
                    <button onClick={()=> register_course(item.course_id,item.sec_id)}>Register</button>
                  </div>
                 
                 {showToast && <Toast message={message} setShowToast={setShowToast} />}</li>))}
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