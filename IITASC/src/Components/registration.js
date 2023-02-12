import React, { useState, useEffect } from 'react';
import CoursePanel from "./coursepanel.js"
const Registration = () => {
  const valid=sessionStorage.getItem('valid')
  const [courseIds, setCourseIds] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/current_courses',{credentials:'include'})
      .then((response) => response.json())
      .then((data) => {
        setCourseIds(data.map((course) => course.course_id));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  //   console.log(inputValue)
  //   if(!inputValue){
  //     setSuggestions([])
  //   }
  //   else{
  //   setSuggestions(
  //     courseIds.filter((courseId) =>
  //       courseId.toLowerCase().includes(event.target.value.toLowerCase())
  //     )
  //   );
  //   }
  // };
  const handleInputChange = (event) => {
    
    setInputValue(() => {
      // console.log(event.target.value)
      if(event.target.value===""){
        setSuggestions([])
      }
      else{
      setSuggestions(
            courseIds.filter((courseId) =>
              courseId.toLowerCase().includes(event.target.value.toLowerCase())
            )
          );
      }
        return event.target.value
    });
    
  }
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

<div class="form-group has-search">
<i class="fa fa-search"></i>
    <input type="text" class="form-control" value={inputValue}
          onChange={handleInputChange} placeholder="Search"/>
  </div>

        
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <CoursePanel course_id={suggestion}/>
                </li>
            ))}
          </ul>
        )}
      </div>
      ) : (
        window.location.href='/'
      )}
    </div>

    
  );
};

export default Registration;