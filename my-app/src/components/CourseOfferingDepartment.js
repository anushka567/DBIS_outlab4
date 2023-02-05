import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
const Department = () => {

  const valid=sessionStorage.getItem('valid')
  const [dept,setDept]=useState("")

  useEffect(()=>{ 
 
    (async () =>{
    try {
        const response = await fetch(`http://localhost:3000/activedept`,{
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
        <div>
          <h1>List of Departments Offering a Course this sem (year)</h1>

          {Object.keys(dept).length ? ( <ul>
                    {Object.values(dept).map(item => (<li>
                        <Link to={`/course/running/${item.dept_name}`}>{ item.dept_name} </Link>
                        </li>))}
                </ul>
                ):( <p>  No Department offering a course right now.</p>)}
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );
};

export default Department;