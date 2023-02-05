import React, { useState, useEffect } from 'react';
import CoursePanel from "./coursepanel.js"
const Registration = () => {
  const valid=sessionStorage.getItem('valid')
  const [courseIds, setCourseIds] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/current_courses')
      .then((response) => response.json())
      .then((data) => {
        setCourseIds(data.map((course) => course.course_id));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSuggestions(
      courseIds.filter((courseId) =>
        courseId.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (

    <div>
      {valid ? (
        <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for a course ID"
        />
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