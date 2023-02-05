import React,{useState,useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
const Department = () => {

  const valid=sessionStorage.getItem('valid')
  const [dept,setDept]=useState("")

  useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3001/activedept`,{
          method: 'GET',     
        });
        //onsole.log("what")
        const data = await response.json();
        if (data) {
          //console.log(data[0])
          //console.log(data)
          setDept(data)
          
  
        } else {
            setDept("Could not retrieve information")
        }
      }catch(error){
        console.log(error.message)
      }
  })();
},[]);


  return (

    <div>
      {valid ? (
        <div id='cod-body' >
           <div class="justify-content-center align-items-sm-right text-light bg-dark">
        <h2 class="font-monospace ">Departments Offering Courses in the Current Semester </h2></div>
         
         <div id="cod-inner"> 
          
          {Object.keys(dept).length ? ( <ListGroup>
                    {Object.values(dept).map(item => (<ListGroupItem>
                        <Link to={`/course/running/${item.dept_name}`}>{ item.dept_name} </Link>
                        </ListGroupItem>))}
                </ListGroup>
                ):( <p>  No Department offering a course right now.</p>)}
        </div>
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );
};

export default Department;